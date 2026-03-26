import { sql } from "drizzle-orm";
import { db } from "./client";
import { indexerState } from "./schema";

export async function seed(): Promise<void> {
  await db
    .insert(indexerState)
    .values({
      key: "latest_indexed_block",
      value: "0"
    })
    .onConflictDoNothing({ target: indexerState.key });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => {
      console.log("Seed complete");
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
