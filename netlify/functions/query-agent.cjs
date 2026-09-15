// netlify/functions/query-agent.cjs

const { createClient } = require("@supabase/supabase-js");
const OpenAI = require("openai");
const { jsonResponse, preflightResponse } = require("./_shared/json.cjs");
const { assertBodySize, validateQueryFields } = require("./_shared/validation.cjs");
const { verifyCapabilityToken } = require("./_shared/capability.cjs");
const { formatRateLimitResponse } = require("./_shared/rate-limit.cjs");

const QUERY_COOLDOWN_MS = 2000;

const MAX_LIMIT_VALUE = 100000;

function readIntEnv(name, fallback, max = MAX_LIMIT_VALUE) {
  const n = Number.parseInt(process.env[name], 10);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return Math.min(n, max);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function buildSystemPrompt(companyName) {
  return `You are an expert customer service agent for ${companyName}. You are knowledgeable, warm, and proactive. Your goal is to understand the customer's needs and guide them toward the right solution or booking.

STRICT RULES:
1. NEVER say "links", "context", "website", "knowledge base", or any tech terms. Speak like a human.
2. NEVER repeat the same vague answer. Each response must move the conversation forward.
3. ALWAYS use "${companyName}" as the company name — never substitute a generic name.
4. Use "we", "our team", "I can help with that" naturally.
5. NEVER make up services or prices not in the context. If unsure, offer to connect them with the team.
6. If the context contains URLs or page links, you MAY include them as markdown links like [View our portfolio](https://example.com/portfolio). Only use URLs that actually appear in the context — never make them up.

CONVERSATION STYLE:
- Be specific and helpful. Don't give vague answers like "we offer many services".
- When a customer is unsure, help them figure out what they need by asking targeted questions.
- Offer 2-3 concrete options whenever possible so the customer can easily choose.
- After understanding their need, always guide them toward booking a free consultation or estimate.
- Maximum 3 sentences of explanation before asking a follow-up or offering options.

QUICK REPLIES — always include at the end of EVERY response in this exact format:
<quick_replies>
Option 1 | Option 2 | Option 3
</quick_replies>

Quick reply rules:
- For broad questions: offer specific service options from the context
- For "not sure" / "I don't know" responses: offer helpful options like "Show me examples" | "What's popular?" | "Book a free consult"
- After 2 exchanges: always include "Get a free estimate" or "Schedule a consultation" as one option
- Maximum 4 options, minimum 2

WHEN CUSTOMER IS UNSURE (e.g. "not sure", "don't know", "maybe"):
Do NOT repeat the same question. Instead:
1. Acknowledge them warmly
2. Suggest the most popular or common options
3. Offer to help them figure it out with a free consultation

APPOINTMENT BOOKING:
When customer mentions quote, estimate, book, schedule, consultation, or cost — include:
<book_appointment>true</book_appointment>

EXAMPLE of a good response to "services?":
"We help homeowners with kitchen remodels, bathroom renovations, full home makeovers, and custom projects. Most of our clients start with a free in-home consultation where we walk through options together.

What area of your home are you looking to improve?

<quick_replies>
Kitchen | Bathroom | Multiple rooms | Not sure yet
</quick_replies>"

EXAMPLE of a good response to "not sure":
"No worries at all — that's exactly what our free consultation is for! We'll walk through your home, understand your vision, and recommend the best approach together.

What's the main thing you'd like to improve?

<quick_replies>
More space | Better look & feel | Fix something broken | Book free consult
</quick_replies>"`;
}

function formatResponseToHTML(rawAnswer) {
  const quickRepliesMatch = rawAnswer.match(/<quick_replies>([\s\S]*?)<\/quick_replies>/);
  const bookAppointment = rawAnswer.includes("<book_appointment>true</book_appointment>");

  let answer = rawAnswer
    .replace(/<quick_replies>[\s\S]*?<\/quick_replies>/g, "")
    .replace(/<book_appointment>[\s\S]*?<\/book_appointment>/g, "")
    .trim();

  answer = answer.replace(
    /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">$1</a>',
  );
  answer = answer.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  if (answer.match(/^\d+\.\s/m)) {
    answer = answer.replace(/\d+\.\s(.+)/g, "<li>$1</li>");
    answer = `<ol>${answer}</ol>`;
  } else if (answer.match(/^[-*•]\s/m)) {
    answer = answer.replace(/[-*•]\s(.+)/g, "<li>$1</li>");
    answer = `<ul>${answer}</ul>`;
  } else {
    answer = answer
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
      .join("");
  }

  let quickReplies = [];
  if (quickRepliesMatch) {
    quickReplies = quickRepliesMatch[1]
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
  }

  return {
    html: `<div class="ai-reply">${answer}</div>`,
    quickReplies,
    bookAppointment,
  };
}

async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text.slice(0, 8000),
  });
  return response.data[0].embedding;
}

async function markConversationFailed(conversationId) {
  if (!conversationId) return;
  const { error } = await supabase
    .from("agent_conversations")
    .update({ status: "failed", answer: null })
    .eq("id", conversationId);
  if (error) {
    console.error("query-agent: failed to mark conversation as failed", error.message);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return preflightResponse(event);
  if (event.httpMethod !== "POST") {
    return jsonResponse(event, 405, { error: "Method Not Allowed" });
  }

  if (!assertBodySize(event.body)) {
    return jsonResponse(event, 413, { error: "Request body too large." });
  }

  let parsedBody;
  try {
    parsedBody = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(event, 400, { error: "Invalid JSON body provided." });
  }

  const {
    user_request_id: userRequestId,
    question,
    chat_history: chatHistory = [],
    token,
  } = parsedBody;

  if (!userRequestId || !question) {
    return jsonResponse(event, 400, { error: "Missing user_request_id or question" });
  }

  const fieldErrors = validateQueryFields({ question, chat_history: chatHistory });
  if (fieldErrors.length > 0) {
    return jsonResponse(event, 400, { error: "invalid_fields", fields: fieldErrors });
  }

  const { data: requestRow, error: requestError } = await supabase
    .from("agent_requests")
    .select("company_name, status, access_token_hash, updated_at")
    .eq("id", userRequestId)
    .single();

  // Same non-revealing response for "doesn't exist" and "bad token" so
  // arbitrary/guessed request ids can't be used to probe or spend quota.
  if (requestError || !requestRow) {
    return jsonResponse(event, 404, { error: "Agent request not found." });
  }
  if (requestRow.access_token_hash && !verifyCapabilityToken(token, requestRow.access_token_hash)) {
    return jsonResponse(event, 404, { error: "Agent request not found." });
  }
  if (requestRow.status !== "ready") {
    return jsonResponse(event, 409, { error: "Agent is not ready to answer questions yet." });
  }

  // Lightweight per-request cooldown to slow down rapid repeated submissions;
  // the real 10/24h quota is enforced atomically by the RPC below.
  const { data: lastConversation } = await supabase
    .from("agent_conversations")
    .select("created_at")
    .eq("user_request_id", userRequestId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (
    lastConversation &&
    Date.now() - new Date(lastConversation.created_at).getTime() < QUERY_COOLDOWN_MS
  ) {
    return jsonResponse(event, 429, formatRateLimitResponse("cooldown", null));
  }

  const { data: reservation, error: reserveError } = await supabase.rpc(
    "try_agent_reserve_question",
    {
      p_request_id: userRequestId,
      p_question: question,
      p_query_limit: readIntEnv("TRY_AGENT_QUERY_LIMIT", 10),
      p_window_hours: readIntEnv("TRY_AGENT_WINDOW_HOURS", 24),
    },
  );

  if (reserveError) {
    console.error("query-agent: try_agent_reserve_question RPC failed", reserveError.message);
    return jsonResponse(event, 500, { error: "Failed to verify usage limits" });
  }

  if (!reservation?.accepted) {
    return jsonResponse(
      event,
      429,
      formatRateLimitResponse(reservation?.limit_type, reservation?.retry_at),
    );
  }

  const conversationId = reservation.conversation_id;
  const queryLimit = readIntEnv("TRY_AGENT_QUERY_LIMIT", 10);
  const queriesRemaining = Math.max(0, queryLimit - (reservation.used_count ?? 0) - 1);
  const companyName = requestRow.company_name || "our company";
  const systemPrompt = buildSystemPrompt(companyName);

  try {
    let searchQuestion = question;
    if (question.split(" ").length <= 3 && !question.includes("?")) {
      try {
        const expansionResponse = await openai.chat.completions.create({
          model: "gpt-4o",
          temperature: 0,
          messages: [
            {
              role: "user",
              content: `Expand this short query into a detailed search query. Return only the expanded query, nothing else.
"services" → "What services does this company provide?"
"pricing" → "What is the pricing for services offered?"
"contact" → "How can I contact the company?"
"bathroom" → "What bathroom renovation services does this company offer?"
"not sure" → "I am not sure what I need help with, can you guide me?"
Query: "${question}"
Expanded:`,
            },
          ],
        });
        const expandedQuery = expansionResponse.choices[0]?.message?.content?.trim();
        if (expandedQuery && expandedQuery.length > question.length && expandedQuery.length < 200) {
          searchQuestion = expandedQuery;
        }
      } catch (e) {
        console.error("query-agent: query expansion failed", e.message);
      }
    }

    const queryEmbedding = await getEmbedding(searchQuestion);
    const { data: retrievedDocs, error: matchError } = await supabase.rpc("match_documents", {
      query_embedding: queryEmbedding,
      match_threshold: 0.01,
      match_count: 8,
      filter_user_request_id: userRequestId,
    });

    if (matchError) {
      await markConversationFailed(conversationId);
      console.error("query-agent: vector search failed", matchError.message);
      return jsonResponse(event, 500, { error: "The agent couldn't answer right now." });
    }

    const relevantDocs = (retrievedDocs || []).filter(
      (doc) => doc.user_request_id === userRequestId,
    );
    const context =
      relevantDocs.length > 0 ? relevantDocs.map((doc) => doc.content).join("\n\n---\n\n") : null;

    const historyMessages = (chatHistory || []).slice(-6).map((msg) => ({
      role: msg.role === "agent" ? "assistant" : "user",
      content: typeof msg.content === "string" ? msg.content.replace(/<[^>]*>/g, "") : msg.content,
    }));

    const userContent = context
      ? `Company website context (use this to answer, but never reference it directly):\n---\n${context}\n---\n\nCustomer message: ${question}`
      : `Customer message: ${question}\n\n(No specific context found — guide them toward booking a consultation and ask what they need help with.)`;

    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      messages: [
        { role: "system", content: systemPrompt },
        ...historyMessages,
        { role: "user", content: userContent },
      ],
    });

    const rawAnswer =
      chatResponse.choices[0]?.message?.content || "I'm not sure how to respond to that.";
    const { html, quickReplies, bookAppointment } = formatResponseToHTML(rawAnswer);

    const { error: updateError } = await supabase
      .from("agent_conversations")
      .update({ answer: rawAnswer, status: "answered" })
      .eq("id", conversationId);
    if (updateError) {
      console.error("query-agent: failed to store answer", updateError.message);
    }

    return jsonResponse(event, 200, {
      answer: html,
      quickReplies,
      bookAppointment,
      queriesRemaining,
    });
  } catch (error) {
    await markConversationFailed(conversationId);
    console.error("query-agent: unhandled error", error.message);
    return jsonResponse(event, 500, { error: "The agent couldn't answer right now." });
  }
};

exports.config = { timeout: 26 };
