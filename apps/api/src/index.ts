import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";

const port = Number(process.env["PORT"] ?? 4000);
const host = process.env["HOST"] ?? "0.0.0.0";

async function main() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: true,
    credentials: true,
  });

  await app.register(jwt, {
    secret: process.env["JWT_SECRET"] ?? "dev-secret-change-me",
  });

  await app.register(cookie);

  app.get("/health", async () => ({ status: "ok" }));

  await app.listen({ port, host });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
