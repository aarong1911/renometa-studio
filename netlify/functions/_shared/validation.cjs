// netlify/functions/_shared/validation.cjs
// Input length/shape validation shared by setup-agent and query-agent.

const LIMITS = {
  name: 100,
  company: 150,
  question: 800,
  website: 300,
  chatMessage: 4000,
  chatHistoryItems: 20,
};

const MAX_BODY_BYTES = 32 * 1024; // 32 KB is generous for this form/chat payload.

function isNonEmptyString(value, maxLength) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

function assertBodySize(rawBody) {
  const bytes = typeof rawBody === "string" ? Buffer.byteLength(rawBody, "utf8") : 0;
  return bytes <= MAX_BODY_BYTES;
}

function validateSetupFields({ name, email, company, website }) {
  const errors = [];
  if (!isNonEmptyString(name, LIMITS.name)) errors.push("name");
  if (!isNonEmptyString(email, 254)) errors.push("email");
  if (!isNonEmptyString(company, LIMITS.company)) errors.push("company");
  if (!isNonEmptyString(website, LIMITS.website)) errors.push("website");
  return errors;
}

function validateQueryFields({ question, chat_history }) {
  const errors = [];
  if (!isNonEmptyString(question, LIMITS.question)) errors.push("question");
  if (chat_history !== undefined) {
    if (!Array.isArray(chat_history) || chat_history.length > LIMITS.chatHistoryItems) {
      errors.push("chat_history");
    } else {
      for (const item of chat_history) {
        if (!item || typeof item.content !== "string" || item.content.length > LIMITS.chatMessage) {
          errors.push("chat_history");
          break;
        }
      }
    }
  }
  return errors;
}

module.exports = {
  LIMITS,
  MAX_BODY_BYTES,
  isNonEmptyString,
  assertBodySize,
  validateSetupFields,
  validateQueryFields,
};
