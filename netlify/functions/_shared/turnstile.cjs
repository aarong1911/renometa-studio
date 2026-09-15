// netlify/functions/_shared/turnstile.cjs
// Cloudflare Turnstile server-side verification (siteverify).

const SITEVERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

async function verifyTurnstileToken({ token, remoteIp, secret, expectedHostname }) {
  if (!secret) return { ok: false, reason: "not_configured" };
  if (!token || typeof token !== "string") return { ok: false, reason: "missing_token" };

  let payload;
  try {
    const params = new URLSearchParams();
    params.set("secret", secret);
    params.set("response", token);
    if (remoteIp) params.set("remoteip", remoteIp);

    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    payload = await res.json();
  } catch (err) {
    return { ok: false, reason: "network_error", detail: err.message };
  }

  if (!payload.success) {
    const codes = Array.isArray(payload["error-codes"]) ? payload["error-codes"] : [];
    if (codes.includes("timeout-or-duplicate")) return { ok: false, reason: "expired_or_reused" };
    return { ok: false, reason: "verification_failed", codes };
  }

  if (expectedHostname && payload.hostname) {
    const allowed = Array.isArray(expectedHostname) ? expectedHostname : [expectedHostname];
    if (!allowed.includes(payload.hostname)) {
      return { ok: false, reason: "hostname_mismatch" };
    }
  }

  return { ok: true };
}

module.exports = { verifyTurnstileToken };
