// netlify/functions/_shared/progress.cjs
// Shared progress-stage constants and a monotonic, error-checked status
// updater used by the background crawl/index job and (for clamping only)
// by agent-status.

const STAGES = {
  PENDING: 0.05,
  CRAWL_START: 0.1,
  CRAWL_MIN: 0.1,
  CRAWL_MAX: 0.5,
  PREP: 0.6,
  INDEX_MIN: 0.6,
  INDEX_MAX: 0.95,
  READY: 1.0,
};

function clampProgress(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

/**
 * Sanitizes a Supabase error for logs: keeps code/message, drops anything
 * that could contain request payloads or credentials.
 */
function sanitizeSupabaseError(error) {
  if (!error) return null;
  return { code: error.code || null, message: error.message || String(error) };
}

/**
 * Creates a status/progress updater bound to one request id. Enforces:
 *  - progress is clamped to [0,1]
 *  - progress never moves backward (unless explicitly overridden, used only
 *    for the terminal "failed" transition which preserves the prior high-water mark)
 *  - status is only ever "ready" together with progress === 1
 *  - every Supabase error is logged with request id / attempted values, never swallowed
 */
function createProgressTracker(supabase, requestId) {
  let highWater = 0;

  async function update(status, progress, extra = {}) {
    let nextProgress = clampProgress(progress);

    if (status === "ready") {
      nextProgress = 1;
    } else if (nextProgress >= 1) {
      // Never report 100% unless the status is actually "ready".
      nextProgress = STAGES.INDEX_MAX;
    }

    if (nextProgress < highWater && status !== "failed") {
      nextProgress = highWater;
    }
    if (status !== "failed") highWater = Math.max(highWater, nextProgress);
    else nextProgress = highWater; // preserve furthest progress reached on failure

    const patch = {
      status,
      progress: nextProgress,
      updated_at: new Date().toISOString(),
      ...extra,
    };

    const { error } = await supabase.from("agent_requests").update(patch).eq("id", requestId);

    if (error) {
      console.error(
        "agent_requests update failed",
        JSON.stringify({
          requestId,
          attemptedStatus: status,
          attemptedProgress: nextProgress,
          supabaseError: sanitizeSupabaseError(error),
        }),
      );
      return { ok: false, error };
    }

    return { ok: true, progress: nextProgress };
  }

  return {
    update,
    get highWater() {
      return highWater;
    },
  };
}

module.exports = { STAGES, clampProgress, sanitizeSupabaseError, createProgressTracker };
