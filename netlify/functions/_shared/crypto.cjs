// netlify/functions/_shared/crypto.cjs
// Small HMAC/hash helpers built on Node's built-in crypto module only.

const crypto = require("crypto");

function hmacSha256Hex(secret, payload) {
  if (!secret) throw new Error("hmacSha256Hex: missing secret");
  return crypto.createHmac("sha256", secret).update(String(payload)).digest("hex");
}

function sha256Hex(payload) {
  return crypto.createHash("sha256").update(String(payload)).digest("hex");
}

// Constant-time hex comparison. Returns false (never throws) for malformed input.
function timingSafeEqualHex(a, b) {
  if (typeof a !== "string" || typeof b !== "string" || a.length === 0 || b.length === 0) {
    return false;
  }
  try {
    const bufA = Buffer.from(a, "hex");
    const bufB = Buffer.from(b, "hex");
    if (bufA.length !== bufB.length || bufA.length === 0) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  } catch {
    return false;
  }
}

function randomToken(byteLength = 32) {
  return crypto.randomBytes(byteLength).toString("base64url");
}

module.exports = { hmacSha256Hex, sha256Hex, timingSafeEqualHex, randomToken };
