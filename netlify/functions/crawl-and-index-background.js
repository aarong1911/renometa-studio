// netlify/functions/crawl-and-index-background.js
//
// Netlify Background Function — runs up to 15 minutes.
// Invoked only by setup-agent with an HMAC-signed, timestamped payload; the
// public cannot trigger this directly (see verifyInternalRequest below).

const { createClient } = require("@supabase/supabase-js");
const OpenAI = require("openai");
const crypto = require("crypto");
const { verifyInternalRequest } = require("./_shared/internal-signature.cjs");
const { STAGES, createProgressTracker } = require("./_shared/progress.cjs");

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const MAX_PAGES_PER_SITE = 10;
const CHUNK_SIZE = 1000;
const CHUNK_OVERLAP = 200;

// Throttle embedding progress writes: at most one write per this many ms,
// unless the percentage moved by at least MIN_PROGRESS_DELTA.
const MIN_PROGRESS_WRITE_INTERVAL_MS = 1500;
const MIN_PROGRESS_DELTA = 0.02;

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return;

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (err) {
    console.error("crawl-and-index-background: invalid JSON body:", err.message);
    return;
  }

  const { user_request_id: requestId, timestamp, signature } = body;

  const verification = verifyInternalRequest(process.env.TRY_AGENT_INTERNAL_SECRET, {
    requestId,
    timestamp,
    signature,
  });
  if (!verification.ok) {
    console.error(
      "crawl-and-index-background: rejected internal request",
      JSON.stringify({ requestId, reason: verification.reason }),
    );
    return;
  }

  // Load the accepted row ourselves — never trust company/site/email from the
  // wire payload, since only the request id + signature are authenticated.
  const { data: row, error: loadError } = await supabase
    .from("agent_requests")
    .select("id, status, company_site, company_name, email")
    .eq("id", requestId)
    .single();

  if (loadError || !row) {
    console.error(
      "crawl-and-index-background: request row not found",
      JSON.stringify({ requestId, supabaseError: loadError ? loadError.message : null }),
    );
    return;
  }

  if (row.status !== "pending") {
    console.log(
      `crawl-and-index-background: ignoring duplicate delivery for ${requestId} (status=${row.status})`,
    );
    return;
  }

  // Idempotency guard: only proceed if we are the delivery that flips the row
  // out of "pending". If a duplicate delivery races us here, its conditional
  // update below will affect zero rows and it will bail out instead of
  // starting a second crawl.
  const { data: claimed, error: claimError } = await supabase
    .from("agent_requests")
    .update({
      status: "crawling",
      progress: STAGES.CRAWL_START,
      updated_at: new Date().toISOString(),
    })
    .eq("id", requestId)
    .eq("status", "pending")
    .select("id");

  if (claimError) {
    console.error(
      "crawl-and-index-background: failed to claim request",
      JSON.stringify({ requestId, supabaseError: claimError.message }),
    );
    return;
  }
  if (!claimed || claimed.length === 0) {
    console.log(`crawl-and-index-background: another delivery already claimed ${requestId}`);
    return;
  }

  await crawlAndIndex({
    requestId,
    companySite: row.company_site,
    companyName: row.company_name,
  });
};

function splitTextIntoChunks(text, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start += chunkSize - overlap;
    if (start >= text.length) break;
  }
  return chunks;
}

async function getEmbedding(text) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text.slice(0, 8000),
  });
  return response.data[0].embedding;
}

async function crawlAndIndex({ requestId, companySite, companyName }) {
  const tracker = createProgressTracker(supabase, requestId);

  try {
    console.log(`Starting Firecrawl for ${companySite} (max ${MAX_PAGES_PER_SITE} pages)`);

    const crawlResponse = await fetch("https://api.firecrawl.dev/v1/crawl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}`,
      },
      body: JSON.stringify({
        url: companySite,
        limit: MAX_PAGES_PER_SITE,
        scrapeOptions: { formats: ["markdown"] },
      }),
    });

    if (!crawlResponse.ok) {
      const errText = await crawlResponse.text();
      throw new Error(`Firecrawl API error: ${crawlResponse.status} - ${errText}`);
    }

    const crawlData = await crawlResponse.json();
    const crawlId = crawlData.id;
    if (!crawlId) throw new Error("Firecrawl did not return a crawl ID");

    console.log(`Firecrawl job started: ${crawlId}`);

    let pages = [];
    const maxWaitMs = 720000;
    const pollIntervalMs = 5000;
    const startTime = Date.now();

    while (Date.now() - startTime < maxWaitMs) {
      await new Promise((res) => setTimeout(res, pollIntervalMs));

      const statusResponse = await fetch(`https://api.firecrawl.dev/v1/crawl/${crawlId}`, {
        headers: { Authorization: `Bearer ${process.env.FIRECRAWL_API_KEY}` },
      });

      if (!statusResponse.ok) {
        console.error(`Failed to check crawl status: ${statusResponse.status}`);
        continue;
      }

      const statusData = await statusResponse.json();
      console.log(`Crawl status: ${statusData.status}, pages: ${statusData.completed || 0}`);

      // When Firecrawl doesn't report a usable total yet, keep reporting the
      // "crawling started" stage instead of leaving progress at zero.
      const hasUsableTotal = Number(statusData.total) > 0;
      const crawlProgress = hasUsableTotal
        ? STAGES.CRAWL_MIN +
          (statusData.completed / statusData.total) * (STAGES.CRAWL_MAX - STAGES.CRAWL_MIN)
        : STAGES.CRAWL_START;

      await tracker.update("crawling", crawlProgress);

      if (statusData.status === "completed") {
        pages = statusData.data || [];
        break;
      }

      if (statusData.status === "failed") {
        throw new Error("Firecrawl job failed");
      }
    }

    if (pages.length === 0) {
      throw new Error("No pages returned from Firecrawl");
    }

    console.log(`Got ${pages.length} pages from Firecrawl`);

    await tracker.update("indexing", STAGES.PREP);

    const chunks = [];
    for (const page of pages) {
      const content = page.markdown || page.content || "";
      const sourceUrl = page.metadata?.sourceURL || companySite;
      if (!content || content.length < 50) continue;

      const textChunks = splitTextIntoChunks(content);
      for (const chunkText of textChunks) {
        chunks.push({
          id: crypto.randomUUID(),
          user_request_id: requestId,
          content: chunkText,
          source_url: sourceUrl,
        });
      }
    }

    if (chunks.length === 0) {
      await tracker.update("no_content", tracker.highWater, {
        error_message: "No indexable content found on site.",
      });
      return;
    }

    console.log(`Generated ${chunks.length} chunks, embedding...`);

    let lastWriteAt = 0;
    let lastWrittenProgress = STAGES.PREP;

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      try {
        const embedding = await getEmbedding(chunk.content);
        const { error: insertError } = await supabase.from("agent_knowledge_base").insert({
          id: chunk.id,
          user_request_id: chunk.user_request_id,
          content: chunk.content,
          embedding,
          source_url: chunk.source_url,
          created_at: new Date().toISOString(),
        });

        if (insertError) {
          console.error(
            "agent_knowledge_base insert failed",
            JSON.stringify({ requestId, chunkId: chunk.id, supabaseError: insertError.message }),
          );
          continue;
        }
      } catch (err) {
        console.error(
          "embedding/insert failed for chunk",
          JSON.stringify({ requestId, chunkId: chunk.id, error: err.message }),
        );
        continue;
      }

      // Throttle writes so we don't do one DB update per chunk on large
      // sites, but still stay visibly responsive.
      const nextProgress =
        STAGES.INDEX_MIN + ((i + 1) / chunks.length) * (STAGES.INDEX_MAX - STAGES.INDEX_MIN);
      const isLast = i === chunks.length - 1;
      const enoughDelta = nextProgress - lastWrittenProgress >= MIN_PROGRESS_DELTA;
      const enoughTime = Date.now() - lastWriteAt >= MIN_PROGRESS_WRITE_INTERVAL_MS;

      if (isLast || enoughDelta || enoughTime) {
        await tracker.update("indexing", nextProgress);
        lastWrittenProgress = nextProgress;
        lastWriteAt = Date.now();
      }
    }

    await tracker.update("ready", 1, { error_message: null });
    console.log(`Complete for ${requestId}. ${chunks.length} chunks stored.`);
  } catch (error) {
    console.error(
      "FATAL ERROR in crawlAndIndex",
      JSON.stringify({ requestId, error: error.message || String(error) }),
    );
    // Preserve the highest progress reached — never reset to 0 on failure.
    await tracker.update("failed", tracker.highWater, {
      error_message: error.message || "An unexpected error occurred.",
    });
  }
}
