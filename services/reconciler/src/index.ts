const INTERVAL_MS = 60_000;

async function cleanupStaleIntents() {
  console.log("[reconciler] Cleaning up stale payment intents...");
  // Query orders with status='pending' older than 30 min, cancel them
}

async function checkForReorgs() {
  console.log("[reconciler] Checking for chain reorgs...");
  // Verify recent completed orders still have valid txids on-chain
}

async function runCycle() {
  try {
    await cleanupStaleIntents();
    await checkForReorgs();
  } catch (err) {
    console.error("[reconciler] Cycle failed:", err);
  }
}

console.log(`[reconciler] Starting with interval ${INTERVAL_MS}ms`);
runCycle();
setInterval(runCycle, INTERVAL_MS);
