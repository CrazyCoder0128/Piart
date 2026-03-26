import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const databaseUrl = process.env["DATABASE_URL"];
const databaseReadUrl = process.env["DATABASE_READ_URL"];

if (!databaseUrl) throw new Error("DATABASE_URL is required");

const writeConnection = postgres(databaseUrl);
const readConnection = postgres(databaseReadUrl ?? databaseUrl);

export const db = drizzle(writeConnection, { schema });
export const readDb = drizzle(readConnection, { schema });
