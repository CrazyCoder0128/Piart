import { Worker } from "bullmq";
import IORedis from "ioredis";

const redis = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379");

const worker = new Worker(
  "media-processing",
  async (job) => {
    console.log(`Processing media job ${job.id}`, job.data);
  },
  { connection: redis }
);

worker.on("ready", () => {
  console.log("Media worker ready");
});

worker.on("failed", (job, error) => {
  console.error(`Job ${job?.id} failed`, error);
});
