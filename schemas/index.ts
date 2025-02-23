import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email({
      message: "L'email est obligatoire"
    }),
    password: z.string().optional(),
    code: z.string().optional()
  });

export const checkoutSessionSchema = z.object({
  packNameWithBundle: z.string(),
  quantities: z.array(z.number()),
  variantId: z.string(),
  type: z.enum(["one_time", "bundle", "subscription"]), // Type de paiement
  successUrl: z.string().url(), // URL de succès après paiement
  cancelUrl: z.string().url(), // URL d'annulation
});

export const NewPasswordSchema = z.object({
  token: z.string().optional(),
  password: z.string().min(6, {
    message: "Minimum de 6 caractères requis",
  }),
  confirmPassword: z.optional(z.string().min(6, {
    message: "Minimum de 6 caractères requis",
  })),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe doivent correspondre",
  path: ["confirmPassword"],
});

export const NewVerificationSchema = z.object({
  token: z.string(),
});

export const NewPasswordTokenSchema = z.object({
  token: z.string(),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "L'email est obligatoire",
  }),
  locale: z.optional(z.string().max(2)),
});