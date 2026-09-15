// netlify/functions/_shared/json.cjs
// Consistent JSON responses + CORS + security headers for Netlify functions.

const PROD_ORIGIN = "https://renometa.com";

function resolveAllowedOrigin(event) {
  const requestOrigin = event?.headers?.origin || event?.headers?.Origin;
  const allowed = new Set(
    [PROD_ORIGIN, "https://www.renometa.com", process.env.URL, process.env.DEPLOY_PRIME_URL].filter(
      Boolean,
    ),
  );

  if (process.env.NETLIFY_DEV === "true" || process.env.CONTEXT === "dev") {
    allowed.add("http://localhost:8888");
    allowed.add("http://localhost:5173");
  }

  if (requestOrigin && allowed.has(requestOrigin)) return requestOrigin;
  // Same-origin requests (no Origin header, e.g. server-rendered nav) don't need CORS at all.
  return null;
}

function baseHeaders(event, { noStore = false } = {}) {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    Vary: "Origin",
  };

  const allowedOrigin = resolveAllowedOrigin(event);
  if (allowedOrigin) {
    headers["Access-Control-Allow-Origin"] = allowedOrigin;
    headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS";
    headers["Access-Control-Allow-Headers"] = "Content-Type, X-Agent-Token";
    headers["Access-Control-Allow-Credentials"] = "true";
  }

  if (noStore) {
    headers["Cache-Control"] = "no-store, no-cache, must-revalidate";
    headers["Pragma"] = "no-cache";
  }

  return headers;
}

function jsonResponse(event, statusCode, body, opts = {}) {
  return {
    statusCode,
    headers: { ...baseHeaders(event, opts), ...(opts.headers || {}) },
    body: JSON.stringify(body ?? {}),
  };
}

function preflightResponse(event) {
  return { statusCode: 204, headers: baseHeaders(event), body: "" };
}

module.exports = {
  jsonResponse,
  preflightResponse,
  baseHeaders,
  resolveAllowedOrigin,
  PROD_ORIGIN,
};
