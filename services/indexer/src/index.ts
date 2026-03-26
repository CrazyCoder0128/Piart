import { Worker } from "bullmq";
import IORedis from "ioredis";

const redisUrl = process.env["REDIS_URL"] ?? "redis://localhost:6379";
const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });

const QUEUE_NAME = "pi-chain-events";

const worker = new Worker(
  QUEUE_NAME,
  async (job) => {
    const { type, payload } = job.data as {
      type: string;
      payload: Record<string, unknown>;
    };

    switch (type) {
      case "payment:confirmed":
        console.log("Processing confirmed payment:", payload);
        break;
      case "payment:cancelled":
        console.log("Processing cancelled payment:", payload);
        break;
      default:
        console.warn(`Unknown event type: ${type}`);
    }
  },
  { connection, concurrency: 5 },
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err.message);
});

console.log(`Indexer worker started on queue "${QUEUE_NAME}"`);
