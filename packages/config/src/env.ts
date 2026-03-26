import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DATABASE_READ_URL: z.string().url().optional(),
  REDIS_URL: z.string().url(),
  MEILISEARCH_URL: z.string().url(),
  MEILISEARCH_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  PI_API_KEY: z.string().min(1),
  PI_PLATFORM_API_URL: z.string().url().default("https://api.minepi.com/v2"),
  AWS_S3_BUCKET: z.string().min(1),
  AWS_S3_REGION: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  IPFS_PINATA_JWT: z.string().min(1),
  PLATFORM_FEE_RATE: z.coerce.number().default(0.075),
  SUBSCRIPTION_PRICE_PI: z.coerce.number().default(5),
  SUBSCRIPTION_DURATION_DAYS: z.coerce.number().int().default(30),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
