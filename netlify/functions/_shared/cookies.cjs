// netlify/functions/_shared/cookies.cjs
// Signed, HttpOnly browser-identity cookie. The cookie value is
// "<id>.<hmac-hex>" so the server can verify it wasn't forged/tampered with;
// the raw id (never the secret) is what gets hashed for rate-limit lookups.

const { hmacSha256Hex, timingSafeEqualHex, randomToken } = require("./crypto.cjs");

const COOKIE_NAME = "ra_bid";

function parseCookies(header) {
  const out = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) out[key] = decodeURIComponent(value);
  }
  return out;
}

function signBrowserId(id, secret) {
  return `${id}.${hmacSha256Hex(secret, id)}`;
}

function createBrowserIdCookie(secret, { secure = true } = {}) {
  const id = randomToken(24);
  const value = signBrowserId(id, secret);
  return { id, cookieHeader: serializeCookie(COOKIE_NAME, value, { secure }) };
}

// Returns the verified browser id, or null if missing/tampered.
function verifyBrowserIdCookie(cookieHeader, secret) {
  const cookies = parseCookies(cookieHeader);
  const raw = cookies[COOKIE_NAME];
  if (!raw || typeof raw !== "string") return null;
  const dot = raw.lastIndexOf(".");
  if (dot <= 0) return null;
  const id = raw.slice(0, dot);
  const signature = raw.slice(dot + 1);
  const expected = hmacSha256Hex(secret, id);
  if (!timingSafeEqualHex(signature, expected)) return null;
  return id;
}

function serializeCookie(name, value, { maxAgeSeconds = 60 * 60 * 24 * 30, secure = true } = {}) {
  return [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    "HttpOnly",
    ...(secure ? ["Secure"] : []),
    "SameSite=Lax",
    `Max-Age=${maxAgeSeconds}`,
  ].join("; ");
}

module.exports = {
  COOKIE_NAME,
  parseCookies,
  createBrowserIdCookie,
  verifyBrowserIdCookie,
  serializeCookie,
};
