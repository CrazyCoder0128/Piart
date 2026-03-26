import { Queue } from "bullmq";
import IORedis from "ioredis";
import postgres from "postgres";

const redis = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379");
const db = postgres(process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/piart");
const indexQueue = new Queue("pi-chain-index", { connection: redis });

async function main() {
  await db`select 1`;
  await indexQueue.add("index-latest-block", { startedAt: new Date().toISOString() });
  console.log("Indexer worker enqueued initial indexing job");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
