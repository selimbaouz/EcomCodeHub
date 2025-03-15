'use server';

import { stripe } from "@/lib/stripe";
import { checkoutSessionSchema } from "@/schemas";
import { z } from "zod";

const getVariantWithPacks = (type: string, level: string) => {
  switch (level) {
  case "Débutant":
    return {
      priceId: type === "bundle" ? 
        [
          process.env.NEXT_PUBLIC_TEST_PRICE_ID_BUNDLE_STORE!,
          process.env.NEXT_PUBLIC_TEST_PRICE_ID_ONE_TIME_BEGINNER!,
        ] 
        : type === "subscription" ? [process.env.NEXT_PUBLIC_TEST_PRICE_ID_SUBSCRIPTION_BEGINNER!] 
        : [process.env.NEXT_PUBLIC_TEST_PRICE_ID_ONE_TIME_BEGINNER!],
    };
  case "Avancé":
    return {
      priceId: type === "bundle" ? 
      [
        process.env.NEXT_PUBLIC_TEST_PRICE_ID_BUNDLE_STORE!,
        process.env.NEXT_PUBLIC_TEST_PRICE_ID_ONE_TIME_ADVANCED!,
      ] 
      : type === "subscription" ? [process.env.NEXT_PUBLIC_TEST_PRICE_ID_SUBSCRIPTION_ADVANCED!] 
      : [process.env.NEXT_PUBLIC_TEST_PRICE_ID_ONE_TIME_ADVANCED!]
    };
  case "Pro":
    return {
      priceId: type === "bundle" ? 
      [
        process.env.NEXT_PUBLIC_TEST_PRICE_ID_BUNDLE_STORE!,
        process.env.NEXT_PUBLIC_TEST_PRICE_ID_ONE_TIME_PRO!,
      ] 
      : type === "subscription" ? [process.env.NEXT_PUBLIC_TEST_PRICE_ID_SUBSCRIPTION_PRO!] 
      : [process.env.NEXT_PUBLIC_TEST_PRICE_ID_ONE_TIME_PRO!]
    };
  default:
    return {
      priceId: type === "bundle" ? 
      [
        process.env.NEXT_PUBLIC_TEST_PRICE_ID_BUNDLE_STORE!,
        process.env.NEXT_PUBLIC_TEST_PRICE_ID_ONE_TIME_BEGINNER!,
      ] 
      : type === "subscription" ? [process.env.NEXT_PUBLIC_TEST_PRICE_ID_SUBSCRIPTION_BEGINNER!] 
      : [process.env.NEXT_PUBLIC_TEST_PRICE_ID_ONE_TIME_BEGINNER!]
    };
  }
};

  export const createCheckoutSession = (async (data: unknown) => {
    const validatedData = checkoutSessionSchema.parse(data);
    const { priceId } = getVariantWithPacks(validatedData.type, validatedData.packNameWithBundle);

    const lineItems = priceId.map((id, index) => ({
      price: id,
      quantity: validatedData.quantities[index] ?? 1,  // On prend la quantité associée
    }));
  
    try {
      // Créer une session de paiement Stripe
      const session = await stripe.checkout.sessions.create({
        invoice_creation: {
          enabled: true,
        },
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: validatedData.type === "subscription" ? "subscription" : "payment",
        success_url: validatedData.successUrl,
        cancel_url: validatedData.cancelUrl,
        metadata: { variantId: validatedData.variantId, packName: validatedData.packNameWithBundle }
      });
  
      return { url: session.url };
    } catch (error) {
      console.error("Erreur lors de la création de la session :", error);
      throw new Error("Impossible de créer la session de paiement.");
    }
  });

  export const checkPurchaseStatus = async (customerId: string) => {
    const charges = await stripe.charges.list({ customer: customerId });
    const paidCharges = charges.data.filter(charge => charge.status === "succeeded");
    
    return paidCharges.length > 0;
  };