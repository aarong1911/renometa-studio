// netlify/functions/_shared/ip.cjs
// Client IP extraction (Netlify's trusted header) + one-way hashing.
// Raw IPs are never stored — only the HMAC hash is persisted.

const { hmacSha256Hex } = require("./crypto.cjs");

function getClientIp(event) {
  const headers = event?.headers || {};
  // Netlify sets this header itself from the edge connection; it cannot be
  // spoofed by the client the way x-forwarded-for can.
  const trusted = headers["x-nf-client-connection-ip"] || headers["X-NF-Client-Connection-IP"];
  if (trusted) return trusted.trim();

  // Fallback for local `netlify dev` / non-Netlify runtimes only.
  const forwarded = headers["x-forwarded-for"] || headers["X-Forwarded-For"];
  if (forwarded) return forwarded.split(",")[0].trim();

  return "";
}

function hashIp(ip, secret) {
  if (!ip) return null;
  return hmacSha256Hex(secret, ip);
}

module.exports = { getClientIp, hashIp };
