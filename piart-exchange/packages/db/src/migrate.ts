import { spawn } from "node:child_process";

export async function runMigrations(): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required");
  }

  await new Promise<void>((resolve, reject) => {
    const child = spawn(
      "pnpm",
      ["exec", "drizzle-kit", "migrate", "--config=drizzle.config.ts"],
      {
        stdio: "inherit",
        env: {
          ...process.env,
          DATABASE_URL: databaseUrl
        }
      }
    );

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`drizzle-kit migrate failed with exit code ${code}`));
    });
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  runMigrations()
    .then(() => {
      console.log("Migrations complete");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Migration failed", error);
      process.exit(1);
    });
}
