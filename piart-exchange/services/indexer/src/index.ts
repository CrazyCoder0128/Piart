import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import postgres from "postgres";

const redis = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379");
const db = postgres(process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/piart");
const indexQueue = new Queue("pi-chain-index", { connection: redis });
const worker = new Worker(
  "pi-chain-index",
  async (job) => {
    await db`select 1`;
    console.log(`Processed indexing job ${job.id}`, job.data);
  },
  { connection: redis }
);

let shuttingDown = false;

async function shutdown(signal: string, exitCode = 0) {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  console.log(`Received ${signal}, shutting down indexer...`);
  await worker.close();
  await indexQueue.close();
  await redis.quit();
  await db.end({ timeout: 5 });
  process.exit(exitCode);
}

async function main() {
  await db`select 1`;
  worker.on("ready", () => {
    console.log("Indexer worker ready");
  });
  worker.on("failed", (job, error) => {
    console.error(`Indexer job ${job?.id} failed`, error);
  });
  await indexQueue.add("index-latest-block", { startedAt: new Date().toISOString() });
  console.log("Indexer worker enqueued initial indexing job and is waiting for more jobs");

  process.on("SIGINT", () => {
    void shutdown("SIGINT", 0);
  });
  process.on("SIGTERM", () => {
    void shutdown("SIGTERM", 0);
  });
}

main().catch(async (error) => {
  console.error(error);
  await shutdown("startup failure", 1);
});
