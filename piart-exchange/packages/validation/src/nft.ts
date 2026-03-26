import { z } from "zod";

export const CreateNftSchema = z.object({
  title: z.string().min(3).max(500),
  description: z.string().max(5000).optional(),
  price_pi: z.number().positive().finite().max(1_000_000),
  physical_cert: z.string().min(1).max(1000)
});

export const UpdateNftSchema = CreateNftSchema.partial();

export const BuyInitiateSchema = z.object({
  paymentId: z.string().min(1)
});
