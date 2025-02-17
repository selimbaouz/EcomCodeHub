'use server';

import { stripe } from "@/lib/stripe";
import { z } from "zod";
  
  // Schéma Zod pour valider les données d'entrée
  const checkoutSessionSchema = z.object({
    variantId: z.string(),
    type: z.enum(["one_time", "bundle", "subscription"]), // Type de paiement
    successUrl: z.string().url(), // URL de succès après paiement
    cancelUrl: z.string().url(), // URL d'annulation
  });
  
  // Server Action sécurisée
  export const createCheckoutSession = (async (data: unknown) => {
    // Validation des données d'entrée avec Zod
    const validatedData = checkoutSessionSchema.parse(data);
  
    try {
      // Créer une session de paiement Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: validatedData.type === "bundle"
      ? [
          {
            price: process.env.NEXT_PUBLIC_TEST_PRICE_ID_ONE_TIME,
            quantity: 1,
          },
          {
            price: process.env.NEXT_PUBLIC_TEST_PRICE_ID_STORE,
            quantity: 1,
          },
        ]
      : [
          {
            price:
              validatedData.type === "subscription"
                ? process.env.NEXT_PUBLIC_TEST_PRICE_ID_SUBSCRIPTION
                : process.env.NEXT_PUBLIC_TEST_PRICE_ID_ONE_TIME,
            quantity: 1,
          },
        ],
        mode: validatedData.type === "subscription" ? "subscription" : "payment",
        success_url: validatedData.successUrl,
        cancel_url: validatedData.cancelUrl,
        metadata: { variantId: validatedData.variantId }
      });
  
      return { url: session.url };
    } catch (error) {
      console.error("Erreur lors de la création de la session :", error);
      throw new Error("Impossible de créer la session de paiement.");
    }
  });