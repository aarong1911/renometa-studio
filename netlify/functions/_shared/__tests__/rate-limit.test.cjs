const test = require("node:test");
const assert = require("node:assert/strict");
const { formatRateLimitResponse } = require("../rate-limit.cjs");

test("formatRateLimitResponse maps known limit types to distinct, non-leaky messages", () => {
  const email = formatRateLimitResponse("email", null);
  const global = formatRateLimitResponse("global", null);
  assert.equal(email.error, "limit_reached");
  assert.notEqual(email.message, global.message);
  assert.equal(email.retryAt, null);
});

test("formatRateLimitResponse serializes retryAt as an ISO string", () => {
  const retryAt = new Date("2026-01-01T00:00:00.000Z");
  const result = formatRateLimitResponse("ip", retryAt);
  assert.equal(result.retryAt, "2026-01-01T00:00:00.000Z");
});

test("formatRateLimitResponse falls back to a generic message for an unknown limit type", () => {
  const result = formatRateLimitResponse("something_new", null);
  assert.equal(result.error, "limit_reached");
  assert.match(result.message, /limit reached/i);
});
