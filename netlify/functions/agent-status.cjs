const { createClient } = require("@supabase/supabase-js");

const headers = { "Content-Type": "application/json", "Cache-Control": "no-store" };

exports.handler = async (event) => {
  if (event.httpMethod !== "GET")
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method Not Allowed" }) };
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Agent storage is not configured." }),
    };
  }

  const id = event.queryStringParameters?.id;
  if (!id)
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing request id." }) };

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data, error } = await supabase
    .from("agent_requests")
    .select("status, progress, error_message")
    .eq("id", id)
    .single();

  if (error || !data)
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: "Agent request not found." }),
    };
  return { statusCode: 200, headers, body: JSON.stringify(data) };
};
