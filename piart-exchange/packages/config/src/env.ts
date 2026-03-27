import { z } from "zod";

const nodeEnvSchema = z.enum(["development", "test", "production"]).default("development");

const envSchema = z.object({
  NODE_ENV: nodeEnvSchema,
  DATABASE_URL: z.string().min(1),
  DATABASE_READ_URL: z.string().min(1),
  REDIS_URL: z.string().min(1),
  MEILISEARCH_URL: z.string().min(1),
  MEILISEARCH_KEY: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  PI_API_KEY: z.string().min(1),
  PI_PLATFORM_API_URL: z.string().url(),
  AWS_S3_BUCKET: z.string().min(1),
  AWS_S3_REGION: z.string().min(1),
  AWS_ACCESS_KEY_ID: z.string().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().min(1),
  IPFS_PINATA_JWT: z.string().min(1),
  PLATFORM_FEE_RATE: z.coerce.number(),
  SUBSCRIPTION_PRICE_PI: z.coerce.number(),
  SUBSCRIPTION_DURATION_DAYS: z.coerce.number().int().positive(),
  POSTGRES_REPLICATION_USER: z.string().min(1),
  POSTGRES_REPLICATION_PASSWORD: z.string().min(1)
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  DATABASE_READ_URL: process.env.DATABASE_READ_URL,
  REDIS_URL: process.env.REDIS_URL,
  MEILISEARCH_URL: process.env.MEILISEARCH_URL,
  MEILISEARCH_KEY: process.env.MEILISEARCH_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  PI_API_KEY: process.env.PI_API_KEY,
  PI_PLATFORM_API_URL: process.env.PI_PLATFORM_API_URL,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  IPFS_PINATA_JWT: process.env.IPFS_PINATA_JWT,
  PLATFORM_FEE_RATE: process.env.PLATFORM_FEE_RATE,
  SUBSCRIPTION_PRICE_PI: process.env.SUBSCRIPTION_PRICE_PI,
  SUBSCRIPTION_DURATION_DAYS: process.env.SUBSCRIPTION_DURATION_DAYS,
  POSTGRES_REPLICATION_USER: process.env.POSTGRES_REPLICATION_USER,
  POSTGRES_REPLICATION_PASSWORD: process.env.POSTGRES_REPLICATION_PASSWORD
});

export const isProd = env.NODE_ENV === "production";
