exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const body = JSON.parse(event.body || "{}");

    if (!body.name || !body.email) {
      return { statusCode: 400, body: JSON.stringify({ error: "Name and email are required" }) };
    }

    if (!process.env.MAKE_APPOINTMENT_WEBHOOK_URL) {
      throw new Error("Missing MAKE_APPOINTMENT_WEBHOOK_URL in environment");
    }

    // Forward the appointment to Make webhook
    const response = await fetch(process.env.MAKE_APPOINTMENT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, submittedAt: new Date().toISOString() }),
    });
    if (!response.ok) throw new Error(`Make webhook failed with status ${response.status}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Appointment request forwarded to Make" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || "Booking failed" }),
    };
  }
};
