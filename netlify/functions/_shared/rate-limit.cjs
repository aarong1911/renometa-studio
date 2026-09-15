// netlify/functions/_shared/rate-limit.cjs
// Maps the atomic-quota RPC result into a safe, user-facing 429 payload.
// Never leaks which internal identifier (email/browser/hostname/ip/global)
// tripped the limit beyond a generic category, and never leaks hashes.

const LIMIT_MESSAGES = {
  email: "You've reached the limit of agent builds for this email in the last 24 hours.",
  browser: "You've reached the limit of agent builds from this browser in the last 24 hours.",
  domain: "This website has already reached its agent-build limit for the last 24 hours.",
  ip: "You've reached the limit of agent builds from this network in the last 24 hours.",
  global: "We're at capacity for new agent builds right now — please try again later.",
  query: "You've reached the question limit for this agent in the last 24 hours.",
  cooldown: "Please wait a moment before sending another message.",
};

function formatRateLimitResponse(limitType, retryAt) {
  const message = LIMIT_MESSAGES[limitType] || "Request limit reached. Please try again later.";
  return {
    error: "limit_reached",
    message,
    retryAt: retryAt ? new Date(retryAt).toISOString() : null,
  };
}

module.exports = { formatRateLimitResponse, LIMIT_MESSAGES };
