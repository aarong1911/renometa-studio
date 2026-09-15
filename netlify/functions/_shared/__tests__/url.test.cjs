const test = require("node:test");
const assert = require("node:assert/strict");
const { normalizeEmail, isValidEmailFormat, normalizeWebsiteUrl } = require("../url.cjs");

test("normalizeEmail trims and lowercases", () => {
  assert.equal(normalizeEmail("  Foo@Example.COM  "), "foo@example.com");
});

test("isValidEmailFormat rejects obviously malformed addresses", () => {
  assert.equal(isValidEmailFormat("not-an-email"), false);
  assert.equal(isValidEmailFormat("a@b.co"), true);
});

test("normalizeWebsiteUrl strips www, fragment, and lowercases host", () => {
  const result = normalizeWebsiteUrl("HTTPS://WWW.Example.com/path#section");
  assert.equal(result.ok, true);
  assert.equal(result.hostname, "example.com");
  assert.equal(result.url.includes("#"), false);
});

test("normalizeWebsiteUrl rejects non-http protocols", () => {
  const result = normalizeWebsiteUrl("ftp://example.com");
  assert.equal(result.ok, false);
  assert.equal(result.reason, "invalid_protocol");
});

test("normalizeWebsiteUrl rejects localhost and loopback", () => {
  assert.equal(normalizeWebsiteUrl("http://localhost:3000").ok, false);
  assert.equal(normalizeWebsiteUrl("http://127.0.0.1").ok, false);
  assert.equal(normalizeWebsiteUrl("http://[::1]").ok, false);
});

test("normalizeWebsiteUrl rejects private network and link-local IPv4", () => {
  assert.equal(normalizeWebsiteUrl("http://10.0.0.5").ok, false);
  assert.equal(normalizeWebsiteUrl("http://192.168.1.1").ok, false);
  assert.equal(normalizeWebsiteUrl("http://172.16.0.1").ok, false);
  assert.equal(normalizeWebsiteUrl("http://169.254.1.1").ok, false);
});

test("normalizeWebsiteUrl accepts a normal public host", () => {
  const result = normalizeWebsiteUrl("http://example.com");
  assert.equal(result.ok, true);
});
