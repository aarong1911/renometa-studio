// netlify/functions/_shared/capability.cjs
// Per-request capability tokens: the plain token is returned to the browser
// once; only its SHA-256 hash is ever stored in Supabase.

const { sha256Hex, timingSafeEqualHex, randomToken } = require("./crypto.cjs");

function issueCapabilityToken() {
  const token = randomToken(32);
  return { token, hash: sha256Hex(token) };
}

// storedHash may be null for legacy rows created before capability tokens
// existed — callers decide whether that's acceptable for the given route.
function verifyCapabilityToken(token, storedHash) {
  if (!storedHash) return false;
  if (typeof token !== "string" || token.length === 0) return false;
  return timingSafeEqualHex(sha256Hex(token), storedHash);
}

module.exports = { issueCapabilityToken, verifyCapabilityToken };
