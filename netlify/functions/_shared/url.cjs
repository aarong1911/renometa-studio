// netlify/functions/_shared/url.cjs
// Email + website normalization and SSRF-guard host checks.

const net = require("net");

function normalizeEmail(email) {
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmailFormat(email) {
  return typeof email === "string" && email.length <= 254 && EMAIL_RE.test(email);
}

// IPv4 private / loopback / link-local ranges.
function isPrivateIpv4(ip) {
  const parts = ip.split(".").map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return true; // malformed -> treat as unsafe
  const [a, b] = parts;
  if (a === 10) return true; // 10.0.0.0/8
  if (a === 127) return true; // loopback
  if (a === 169 && b === 254) return true; // link-local
  if (a === 172 && b >= 16 && b <= 31) return true; // 172.16.0.0/12
  if (a === 192 && b === 168) return true; // 192.168.0.0/16
  if (a === 0) return true; // "this network"
  return false;
}

function isPrivateIpv6(ip) {
  const lower = ip.toLowerCase();
  if (lower === "::1") return true; // loopback
  if (lower.startsWith("fe80:")) return true; // link-local
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true; // unique local (fc00::/7)
  if (lower.startsWith("::ffff:")) {
    // IPv4-mapped IPv6 address — validate the embedded IPv4.
    const embedded = lower.slice("::ffff:".length);
    return isPrivateIpv4(embedded);
  }
  return false;
}

function isDisallowedHostname(hostname) {
  // URL hostnames for IPv6 literals are bracketed, e.g. "[::1]".
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h === "0.0.0.0") return true;

  const ipVersion = net.isIP(h);
  if (ipVersion === 4) return isPrivateIpv4(h);
  if (ipVersion === 6) return isPrivateIpv6(h);

  // Not an IP literal — allow (DNS could still resolve privately, but Firecrawl
  // performs the actual fetch server-side and applies its own SSRF protections).
  return false;
}

/**
 * Normalizes a user-provided website URL for storage and hostname-based rate limiting.
 * Returns { ok: true, url, hostname } or { ok: false, reason }.
 */
function normalizeWebsiteUrl(raw) {
  if (typeof raw !== "string" || raw.trim().length === 0) {
    return { ok: false, reason: "empty" };
  }

  let parsed;
  try {
    parsed = new URL(raw.trim());
  } catch {
    return { ok: false, reason: "invalid_url" };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return { ok: false, reason: "invalid_protocol" };
  }

  let hostname = parsed.hostname.toLowerCase();
  if (hostname.startsWith("www.")) hostname = hostname.slice(4);

  if (!hostname || isDisallowedHostname(hostname)) {
    return { ok: false, reason: "disallowed_host" };
  }

  parsed.hash = "";
  parsed.hostname = hostname;

  return { ok: true, url: parsed.toString(), hostname };
}

module.exports = {
  normalizeEmail,
  isValidEmailFormat,
  normalizeWebsiteUrl,
  isDisallowedHostname,
};
