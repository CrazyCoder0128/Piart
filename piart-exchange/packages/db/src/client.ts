import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

const databaseReadUrl = process.env.DATABASE_READ_URL ?? databaseUrl;

const writeClient = postgres(databaseUrl, { max: 10, prepare: false });
const readClient = postgres(databaseReadUrl, { max: 10, prepare: false });

export const db = drizzle(writeClient);
export const dbRead = drizzle(readClient);

export { writeClient, readClient };
