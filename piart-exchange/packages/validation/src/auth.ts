import { z } from "zod";

export const PiAuthRequestSchema = z.object({
  accessToken: z.string().min(1)
});

export const RefreshRequestSchema = z.object({});
