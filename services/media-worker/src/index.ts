import { Worker } from "bullmq";
import IORedis from "ioredis";

const redisUrl = process.env["REDIS_URL"] ?? "redis://localhost:6379";
const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });

const QUEUE_NAME = "media-processing";

interface MediaJob {
  artworkId: string;
  originalUrl: string;
  sizes: Array<{ width: number; height: number; suffix: string }>;
}

const worker = new Worker<MediaJob>(
  QUEUE_NAME,
  async (job) => {
    const { artworkId, originalUrl, sizes } = job.data;
    console.log(`Processing media for artwork ${artworkId}: ${originalUrl}`);

    for (const size of sizes) {
      console.log(`  Generating ${size.suffix} (${size.width}x${size.height})`);
      // sharp resize + S3 upload will go here
    }
  },
  { connection, concurrency: 3 },
);

worker.on("completed", (job) => {
  console.log(`Media job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`Media job ${job?.id} failed:`, err.message);
});

console.log(`Media worker started on queue "${QUEUE_NAME}"`);
