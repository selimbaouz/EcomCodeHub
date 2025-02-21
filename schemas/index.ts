import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().optional(),
    code: z.optional(z.string()),
  });

export const checkoutSessionSchema = z.object({
  packNameWithBundle: z.string(),
  quantities: z.array(z.number()),
  variantId: z.string(),
  type: z.enum(["one_time", "bundle", "subscription"]), // Type de paiement
  successUrl: z.string().url(), // URL de succès après paiement
  cancelUrl: z.string().url(), // URL d'annulation
});