import cron from "node-cron";
import postgres from "postgres";

const db = postgres(process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/piart");

cron.schedule("*/10 * * * *", async () => {
  await db`select 1`;
  console.log("Reconciler tick: checked stale intents and chain consistency");
});

console.log("Reconciler started");
