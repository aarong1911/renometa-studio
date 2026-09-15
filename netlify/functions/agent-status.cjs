// netlify/functions/agent-status.cjs

const { createClient } = require("@supabase/supabase-js");
const { jsonResponse, preflightResponse } = require("./_shared/json.cjs");
const { clampProgress } = require("./_shared/progress.cjs");
const { verifyCapabilityToken } = require("./_shared/capability.cjs");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return preflightResponse(event);
  if (event.httpMethod !== "GET") {
    return jsonResponse(event, 405, { error: "Method Not Allowed" });
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return jsonResponse(
      event,
      500,
      { error: "Agent storage is not configured." },
      { noStore: true },
    );
  }

  const id = event.queryStringParameters?.id;
  const token = event.headers?.["x-agent-token"] || event.headers?.["X-Agent-Token"];
  if (!id) {
    return jsonResponse(event, 400, { error: "Missing request id." }, { noStore: true });
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data, error } = await supabase
    .from("agent_requests")
    .select("status, progress, error_message, updated_at, access_token_hash")
    .eq("id", id)
    .single();

  // Same non-revealing 404 whether the id doesn't exist or the token is wrong,
  // so an attacker can't distinguish "bad id" from "bad token".
  if (error || !data) {
    return jsonResponse(event, 404, { error: "Agent request not found." }, { noStore: true });
  }

  // Legacy rows created before capability tokens existed have no hash and
  // remain accessible without one; every new row always sets a hash.
  if (data.access_token_hash && !verifyCapabilityToken(token, data.access_token_hash)) {
    return jsonResponse(event, 404, { error: "Agent request not found." }, { noStore: true });
  }

  return jsonResponse(
    event,
    200,
    {
      status: data.status,
      progress: clampProgress(data.progress),
      error_message: data.error_message || null,
      updated_at: data.updated_at || null,
    },
    { noStore: true },
  );
};

exports.config = { timeout: 10 };
