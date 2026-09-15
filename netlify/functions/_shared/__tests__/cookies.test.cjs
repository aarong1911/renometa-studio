const test = require("node:test");
const assert = require("node:assert/strict");
const {
  createBrowserIdCookie,
  verifyBrowserIdCookie,
  parseCookies,
  COOKIE_NAME,
} = require("../cookies.cjs");

const SECRET = "test-secret";

test("createBrowserIdCookie round-trips through verifyBrowserIdCookie", () => {
  const { id, cookieHeader } = createBrowserIdCookie(SECRET);
  const cookieValue = cookieHeader.split(";")[0];
  const verified = verifyBrowserIdCookie(cookieValue, SECRET);
  assert.equal(verified, id);
});

test("verifyBrowserIdCookie rejects a tampered signature", () => {
  const { cookieHeader } = createBrowserIdCookie(SECRET);
  const cookieValue = cookieHeader.split(";")[0];
  const [name, value] = cookieValue.split("=");
  const [payload] = decodeURIComponent(value).split(".");
  const tampered = `${name}=${encodeURIComponent(`${payload}.deadbeef`)}`;
  assert.equal(verifyBrowserIdCookie(tampered, SECRET), null);
});

test("verifyBrowserIdCookie rejects a value signed with a different secret", () => {
  const { cookieHeader } = createBrowserIdCookie("secret-a");
  const cookieValue = cookieHeader.split(";")[0];
  assert.equal(verifyBrowserIdCookie(cookieValue, "secret-b"), null);
});

test("verifyBrowserIdCookie returns null when the cookie is missing", () => {
  assert.equal(verifyBrowserIdCookie("", SECRET), null);
  assert.equal(verifyBrowserIdCookie(`other=value`, SECRET), null);
});

test("parseCookies handles multiple cookies", () => {
  const parsed = parseCookies(`a=1; ${COOKIE_NAME}=abc.def; b=2`);
  assert.equal(parsed[COOKIE_NAME], "abc.def");
  assert.equal(parsed.a, "1");
});

test("createBrowserIdCookie includes Secure by default (production)", () => {
  const { cookieHeader } = createBrowserIdCookie(SECRET);
  assert.match(cookieHeader, /(^|; )Secure(;|$)/);
});

test("createBrowserIdCookie omits Secure when explicitly disabled (local dev over http)", () => {
  const { cookieHeader } = createBrowserIdCookie(SECRET, { secure: false });
  assert.doesNotMatch(cookieHeader, /(^|; )Secure(;|$)/);
});

test("createBrowserIdCookie always keeps HttpOnly, SameSite=Lax, Path=/, and Max-Age regardless of secure flag", () => {
  const { cookieHeader } = createBrowserIdCookie(SECRET, { secure: false });
  assert.match(cookieHeader, /(^|; )HttpOnly(;|$)/);
  assert.match(cookieHeader, /(^|; )SameSite=Lax(;|$)/);
  assert.match(cookieHeader, /(^|; )Path=\/(;|$)/);
  assert.match(cookieHeader, /(^|; )Max-Age=\d+(;|$)/);
});
