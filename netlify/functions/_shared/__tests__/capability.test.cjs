const test = require("node:test");
const assert = require("node:assert/strict");
const { issueCapabilityToken, verifyCapabilityToken } = require("../capability.cjs");

test("issueCapabilityToken produces a token whose hash matches storage", () => {
  const { token, hash } = issueCapabilityToken();
  assert.equal(verifyCapabilityToken(token, hash), true);
});

test("verifyCapabilityToken rejects a wrong token", () => {
  const { hash } = issueCapabilityToken();
  assert.equal(verifyCapabilityToken("wrong-token", hash), false);
});

test("verifyCapabilityToken rejects when there is no stored hash (legacy row semantics live in the caller)", () => {
  const { token } = issueCapabilityToken();
  assert.equal(verifyCapabilityToken(token, null), false);
});

test("verifyCapabilityToken rejects empty/undefined tokens", () => {
  const { hash } = issueCapabilityToken();
  assert.equal(verifyCapabilityToken("", hash), false);
  assert.equal(verifyCapabilityToken(undefined, hash), false);
});
