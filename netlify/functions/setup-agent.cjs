// netlify/functions/setup-agent.cjs

const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
const { jsonResponse, preflightResponse, PROD_ORIGIN } = require("./_shared/json.cjs");
const { assertBodySize, validateSetupFields } = require("./_shared/validation.cjs");
const { normalizeEmail, isValidEmailFormat, normalizeWebsiteUrl } = require("./_shared/url.cjs");
const { getClientIp, hashIp } = require("./_shared/ip.cjs");
const { verifyBrowserIdCookie, createBrowserIdCookie } = require("./_shared/cookies.cjs");
const { hmacSha256Hex } = require("./_shared/crypto.cjs");
const { issueCapabilityToken } = require("./_shared/capability.cjs");
const { verifyTurnstileToken } = require("./_shared/turnstile.cjs");
const { signInternalRequest } = require("./_shared/internal-signature.cjs");
const { formatRateLimitResponse } = require("./_shared/rate-limit.cjs");

const REQUIRED_ENV = [
  "SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "TRY_AGENT_COOKIE_SECRET",
  "TRY_AGENT_ABUSE_HASH_SECRET",
  "TRY_AGENT_INTERNAL_SECRET",
];

const MAX_LIMIT_VALUE = 100000;

function readIntEnv(name, fallback, max = MAX_LIMIT_VALUE) {
  const n = Number.parseInt(process.env[name], 10);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(n, max);
}

exports.handler = async function (event) {
  if (event.httpMethod === "OPTIONS") return preflightResponse(event);
  if (event.httpMethod !== "POST") {
    return jsonResponse(event, 405, { error: "Method Not Allowed" });
  }

  const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missingEnv.length > 0) {
    console.error("setup-agent: missing required environment variables", missingEnv.join(","));
    return jsonResponse(event, 500, { error: "Agent setup is not configured." });
  }

  if (!assertBodySize(event.body)) {
    return jsonResponse(event, 413, { error: "Request body too large." });
  }

  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(event, 400, { error: "Invalid JSON body provided." });
  }

  const { name, email, company, website, turnstileToken } = parsedBody;

  const fieldErrors = validateSetupFields({ name, email, company, website });
  if (fieldErrors.length > 0) {
    return jsonResponse(event, 400, { error: "invalid_fields", fields: fieldErrors });
  }
  if (!isValidEmailFormat(email)) {
    return jsonResponse(event, 400, { error: "invalid_fields", fields: ["email"] });
  }

  const normalizedSite = normalizeWebsiteUrl(website);
  if (!normalizedSite.ok) {
    return jsonResponse(event, 400, {
      error: "invalid_website",
      message: "Please enter a public http:// or https:// website address.",
    });
  }

  const isProd = process.env.CONTEXT === "production" || process.env.URL === PROD_ORIGIN;
  const clientIp = getClientIp(event);

  if (process.env.TURNSTILE_SECRET_KEY) {
    const verification = await verifyTurnstileToken({
      token: turnstileToken,
      remoteIp: clientIp,
      secret: process.env.TURNSTILE_SECRET_KEY,
      expectedHostname: isProd ? ["renometa.com", "www.renometa.com"] : undefined,
    });
    if (!verification.ok) {
      console.error("setup-agent: turnstile verification failed", verification.reason);
      return jsonResponse(event, 400, {
        error: "verification_failed",
        message: "We couldn't verify your submission. Please try again.",
      });
    }
  } else if (isProd) {
    console.error("setup-agent: TURNSTILE_SECRET_KEY not configured in production");
    return jsonResponse(event, 500, { error: "Agent setup is not configured." });
  }

  const cookieHeader = event.headers?.cookie || event.headers?.Cookie;
  let browserId = verifyBrowserIdCookie(cookieHeader, process.env.TRY_AGENT_COOKIE_SECRET);
  let setCookieHeader = null;
  if (!browserId) {
    // NETLIFY_DEV is set by the Netlify CLI itself, never by the caller, so
    // this can't be spoofed via a Host/Origin header to strip Secure in prod.
    const isLocalDev = process.env.NETLIFY_DEV === "true";
    const minted = createBrowserIdCookie(process.env.TRY_AGENT_COOKIE_SECRET, {
      secure: !isLocalDev,
    });
    browserId = minted.id;
    setCookieHeader = minted.cookieHeader;
  }

  const normalizedEmail = normalizeEmail(email);
  const browserHash = hmacSha256Hex(process.env.TRY_AGENT_ABUSE_HASH_SECRET, browserId);
  const ipHash = clientIp ? hashIp(clientIp, process.env.TRY_AGENT_ABUSE_HASH_SECRET) : null;

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const requestId = crypto.randomUUID();
  const { token: capabilityToken, hash: capabilityHash } = issueCapabilityToken();

  const { data: rpcResult, error: rpcError } = await supabase.rpc("try_agent_create_request", {
    p_id: requestId,
    p_name: name.trim(),
    p_email: email.trim(),
    p_company_name: company.trim(),
    p_company_site: normalizedSite.url,
    p_normalized_email: normalizedEmail,
    p_normalized_hostname: normalizedSite.hostname,
    p_browser_hash: browserHash,
    p_ip_hash: ipHash,
    p_access_token_hash: capabilityHash,
    p_email_limit: readIntEnv("TRY_AGENT_EMAIL_LIMIT", 2),
    p_browser_limit: readIntEnv("TRY_AGENT_BROWSER_LIMIT", 2),
    p_domain_limit: readIntEnv("TRY_AGENT_DOMAIN_LIMIT", 2),
    p_ip_limit: readIntEnv("TRY_AGENT_IP_LIMIT", 6),
    p_global_limit: readIntEnv("TRY_AGENT_GLOBAL_LIMIT", 100),
    p_window_hours: readIntEnv("TRY_AGENT_WINDOW_HOURS", 24),
  });

  if (rpcError) {
    console.error("setup-agent: try_agent_create_request RPC failed", rpcError.message);
    return jsonResponse(event, 500, { error: "Failed to verify usage limits." });
  }

  if (!rpcResult?.accepted) {
    return jsonResponse(
      event,
      429,
      formatRateLimitResponse(rpcResult?.limit_type, rpcResult?.retry_at),
      { headers: setCookieHeader ? { "Set-Cookie": setCookieHeader } : {} },
    );
  }

  // From here the quota row already exists — any failure below must mark the
  // row as failed rather than silently leaving it stuck at "pending" or
  // (worse) trying to delete it and refund the quota slot.
  // Never derive this from the caller-controlled Host header — only from
  // Netlify's own trusted URL env var (always set in real deployments) or a
  // hardcoded production origin as a last-resort fallback.
  const baseUrl =
    process.env.NETLIFY_DEV === "true"
      ? "http://localhost:8888"
      : process.env.URL || PROD_ORIGIN;
  const crawlUrl = `${baseUrl}/.netlify/functions/crawl-and-index-background`;

  const timestamp = Date.now();
  const signature = signInternalRequest(
    process.env.TRY_AGENT_INTERNAL_SECRET,
    requestId,
    timestamp,
  );

  try {
    const crawlResponse = await fetch(crawlUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_request_id: requestId, timestamp, signature }),
    });

    if (crawlResponse.status !== 202 && crawlResponse.status !== 200) {
      const responseText = await crawlResponse.text().catch(() => "");
      console.error(
        "setup-agent: unexpected status from background function",
        crawlResponse.status,
        responseText.slice(0, 500),
      );
      await supabase
        .from("agent_requests")
        .update({
          status: "crawling_initiation_failed",
          error_message: `Failed to start background crawl: HTTP ${crawlResponse.status}`,
        })
        .eq("id", requestId);
    }
  } catch (fetchError) {
    console.error("setup-agent: failed to trigger background crawl", fetchError.message);
    await supabase
      .from("agent_requests")
      .update({
        status: "crawling_initiation_failed",
        error_message: "Failed to start background crawl.",
      })
      .eq("id", requestId);
  }

  return jsonResponse(
    event,
    200,
    {
      message: "Agent setup initiated. Crawling started.",
      requestId,
      capabilityToken,
    },
    { headers: setCookieHeader ? { "Set-Cookie": setCookieHeader } : {} },
  );
};

exports.config = { timeout: 26 };
