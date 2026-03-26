import { z } from "zod";

export const piAuthSchema = z.object({
  accessToken: z.string().min(1),
});
export type PiAuthInput = z.infer<typeof piAuthSchema>;

export const createArtworkSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  medium: z.string().max(100).optional(),
  dimensions: z.string().max(100).optional(),
  year: z.number().int().min(1000).max(new Date().getFullYear()).optional(),
  imageUrl: z.string().url(),
});
export type CreateArtworkInput = z.infer<typeof createArtworkSchema>;

export const createListingSchema = z.object({
  artworkId: z.string().uuid(),
  pricePi: z.number().positive().max(1_000_000),
});
export type CreateListingInput = z.infer<typeof createListingSchema>;

export const updateListingSchema = z.object({
  pricePi: z.number().positive().max(1_000_000).optional(),
  status: z.enum(["active", "cancelled"]).optional(),
});
export type UpdateListingInput = z.infer<typeof updateListingSchema>;

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});
export type PaginationInput = z.infer<typeof paginationSchema>;
