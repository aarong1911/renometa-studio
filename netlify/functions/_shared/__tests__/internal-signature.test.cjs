const test = require("node:test");
const assert = require("node:assert/strict");
const { signInternalRequest, verifyInternalRequest } = require("../internal-signature.cjs");

const SECRET = "internal-secret";

test("verifyInternalRequest accepts a freshly signed request", () => {
  const requestId = "req-1";
  const timestamp = Date.now();
  const signature = signInternalRequest(SECRET, requestId, timestamp);
  const result = verifyInternalRequest(SECRET, { requestId, timestamp, signature });
  assert.equal(result.ok, true);
});

test("verifyInternalRequest rejects a stale timestamp", () => {
  const requestId = "req-1";
  const timestamp = Date.now() - 10 * 60 * 1000; // 10 minutes old
  const signature = signInternalRequest(SECRET, requestId, timestamp);
  const result = verifyInternalRequest(SECRET, { requestId, timestamp, signature });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "stale_timestamp");
});

test("verifyInternalRequest rejects a tampered signature", () => {
  const requestId = "req-1";
  const timestamp = Date.now();
  const result = verifyInternalRequest(SECRET, { requestId, timestamp, signature: "not-valid" });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "bad_signature");
});

test("verifyInternalRequest rejects a signature minted for a different request id", () => {
  const timestamp = Date.now();
  const signature = signInternalRequest(SECRET, "req-a", timestamp);
  const result = verifyInternalRequest(SECRET, { requestId: "req-b", timestamp, signature });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "bad_signature");
});

test("verifyInternalRequest rejects missing fields", () => {
  const result = verifyInternalRequest(SECRET, { requestId: "req-1" });
  assert.equal(result.ok, false);
  assert.equal(result.reason, "missing_fields");
});
