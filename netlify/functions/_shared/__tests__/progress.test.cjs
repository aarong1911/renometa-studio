const test = require("node:test");
const assert = require("node:assert/strict");
const { clampProgress, createProgressTracker, STAGES } = require("../progress.cjs");

test("clampProgress handles NaN, null, undefined, and out-of-range values", () => {
  assert.equal(clampProgress(NaN), 0);
  assert.equal(clampProgress(null), 0);
  assert.equal(clampProgress(undefined), 0);
  assert.equal(clampProgress(-5), 0);
  assert.equal(clampProgress(5), 1);
  assert.equal(clampProgress(0.42), 0.42);
});

function fakeSupabase(onUpdate) {
  return {
    from() {
      return {
        update(patch) {
          return {
            eq(_col, id) {
              onUpdate(patch, id);
              return Promise.resolve({ error: null });
            },
          };
        },
      };
    },
  };
}

test("createProgressTracker never reports 100 unless status is ready", async () => {
  const writes = [];
  const supabase = fakeSupabase((patch) => writes.push(patch));
  const tracker = createProgressTracker(supabase, "req-1");

  await tracker.update("indexing", 1.5); // caller tries to report >100%
  assert.equal(writes.at(-1).status, "indexing");
  assert.ok(writes.at(-1).progress < 1);
});

test("createProgressTracker is monotonic across calls", async () => {
  const writes = [];
  const supabase = fakeSupabase((patch) => writes.push(patch));
  const tracker = createProgressTracker(supabase, "req-1");

  await tracker.update("crawling", 0.4);
  await tracker.update("crawling", 0.2); // a lower value arrives out of order
  assert.equal(writes.at(-1).progress, 0.4);
});

test("createProgressTracker preserves the high-water mark on failure instead of resetting to 0", async () => {
  const writes = [];
  const supabase = fakeSupabase((patch) => writes.push(patch));
  const tracker = createProgressTracker(supabase, "req-1");

  await tracker.update("indexing", STAGES.PREP);
  await tracker.update("failed", 0, { error_message: "boom" });

  assert.equal(writes.at(-1).status, "failed");
  assert.equal(writes.at(-1).progress, STAGES.PREP);
});

test("createProgressTracker snaps to exactly 1 when status is ready", async () => {
  const writes = [];
  const supabase = fakeSupabase((patch) => writes.push(patch));
  const tracker = createProgressTracker(supabase, "req-1");

  await tracker.update("indexing", 0.8);
  await tracker.update("ready", 0.8);
  assert.equal(writes.at(-1).progress, 1);
});
