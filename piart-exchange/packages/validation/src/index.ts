import { z } from "zod";

export const listingSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(3).max(120),
  pricePi: z.number().positive(),
  isActive: z.boolean().default(true)
});

export type Listing = z.infer<typeof listingSchema>;
