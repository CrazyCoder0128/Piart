import { z } from "zod";

export const UpdateUserSchema = z.object({
  display_name: z.string().max(200).optional(),
  bio: z.string().max(1000).optional(),
  ads_enabled: z.boolean().optional()
});
