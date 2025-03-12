import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullable(),
  email: z.string().email().nullable(),
  password: z.string().nullable(),
  emailVerified: z.date().nullable(),
  emailNotifications: z.boolean().default(false).nullable(),
  stripeCustomerId: z.string().nullable(),
  credits: z.number(),
  plan: z.enum(["ONE_TIME", "SUBSCRIPTION"]).nullable(),
  isTwoFactorEnabled: z.boolean(),
  created_at: z.date(),
  updatedAt: z.date(),
}).nullable();

export const purchaseSchema = z.object({
  id: z.string(),
  userId: z.string(),
  snippetId: z.string(),
  createdAt: z.date(),
});

export const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
});

export const snippetSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  category: categorySchema.nullable(),
  creditPrice: z.number(),
  componentName: z.string(),
  code: z.string(),
  purchases: z.array(purchaseSchema),
  updatedAt: z.date(),
  createdAt: z.date(),
});

export const snippetsSchema = z.array(snippetSchema);


export const LoginSchema = z.object({
  email: z.string().email({
    message: "L'email est obligatoire"
  }),
  password: z.string().optional(),
  code: z.string().optional(),
  isChange: z.boolean().optional(),
});

export const checkoutSessionSchema = z.object({
  packNameWithBundle: z.string(),
  quantities: z.array(z.number()),
  variantId: z.string(),
  type: z.enum(["one_time", "bundle", "subscription"]), // Type de paiement
  successUrl: z.string().url(), // URL de succès après paiement
  cancelUrl: z.string().url(), // URL d'annulation
});

export const notificationCodeSchema = z.object({
  newCodes: z.number(),
});

export const notificationSchema = z.object({
  emailNotifications: z.boolean(),
});

export const deleteAccountSchema = z.object({
  password: z.string().min(6, "Le mot de passe est requis pour supprimer le compte"),
});

export const updateEmailSchema = z.object({
  newEmail: z.string().email("Email invalide"),
});

export const NewVerificationEmailSchema = z.object({
  newEmail: z.string().email("Email invalide"),
  token: z.string(),
});

export const updatePasswordSchema = z.object({
  newPassword: z.string().min(6, "Le nouveau mot de passe doit contenir au moins 6 caractères"),
  confirmPassword: z.string().min(6, "Confirmez le nouveau mot de passe"),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
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
});