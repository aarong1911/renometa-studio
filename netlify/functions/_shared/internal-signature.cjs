// netlify/functions/_shared/internal-signature.cjs
// HMAC signing/verification for the internal setup-agent -> crawl-and-index
// handoff, so the background crawler can't be invoked directly by the public.

const { hmacSha256Hex, timingSafeEqualHex } = require("./crypto.cjs");

const MAX_CLOCK_SKEW_MS = 5 * 60 * 1000; // 5 minutes

function signInternalRequest(secret, requestId, timestamp) {
  return hmacSha256Hex(secret, `${requestId}.${timestamp}`);
}

function verifyInternalRequest(secret, { requestId, timestamp, signature }) {
  if (!requestId || !timestamp || !signature) {
    return { ok: false, reason: "missing_fields" };
  }
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return { ok: false, reason: "invalid_timestamp" };
  if (Math.abs(Date.now() - ts) > MAX_CLOCK_SKEW_MS) {
    return { ok: false, reason: "stale_timestamp" };
  }
  const expected = signInternalRequest(secret, requestId, timestamp);
  if (!timingSafeEqualHex(signature, expected)) {
    return { ok: false, reason: "bad_signature" };
  }
  return { ok: true };
}

module.exports = { signInternalRequest, verifyInternalRequest, MAX_CLOCK_SKEW_MS };
