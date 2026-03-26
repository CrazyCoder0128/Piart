export type AppEnv = {
  DATABASE_URL: string;
  REDIS_URL: string;
  MEILISEARCH_URL: string;
  JWT_SECRET: string;
  PI_API_KEY: string;
};

export const DEFAULT_PI_PLATFORM_API_URL = "https://api.minepi.com/v2";
export const PLATFORM_FEE_RATE = 0.075;
