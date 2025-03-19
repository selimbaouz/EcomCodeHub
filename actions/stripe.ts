'use server';

import { stripe } from "@/lib/stripe";
import { createCheckoutSessionSchema, customerIdSchema, subscriptionIdSchema, upgradeSchema } from "@/schemas";
import { action } from "@/lib/safe-action";
import Stripe from "stripe";

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

  export const createCheckoutSession = action
  .schema(createCheckoutSessionSchema) 
  .action(async ({ parsedInput: data }) => {
    const { priceId } = getVariantWithPacks(data.type, data.packNameWithBundle);

    const lineItems = priceId.map((id, index) => ({
      price: id,
      quantity: data.quantities[index] ?? 1,  // On prend la quantité associée
    }));

    // Définition du mode
    const mode: Stripe.Checkout.SessionCreateParams.Mode =
    data.type === "subscription" ? "subscription" : "payment";

    const payment_method_types: Stripe.Checkout.SessionCreateParams.PaymentMethodType[] = ["card"]

    // Construction de l'objet sessionData sans `invoice_creation` par défaut
    const sessionData = {
      invoice_creation: {enabled: false},
      payment_method_types,
      line_items: lineItems,
      mode,
      success_url: data.successUrl,
      cancel_url: data.cancelUrl,
      metadata: { variantId: data.variantId, packName: data.packNameWithBundle },
    };

    // Ajouter invoice_creation uniquement si le mode est "payment"
    if (mode === "payment") {
      sessionData.invoice_creation = { enabled: true };
    }
  
    try {
      // Créer une session de paiement Stripe
      const session = await stripe.checkout.sessions.create(sessionData);
  
      return { url: session.url };
    } catch (error) {
      console.error("Erreur lors de la création de la session :", error);
      throw new Error("Impossible de créer la session de paiement.");
    }
  });

export const checkPurchaseStatus = action
.schema(customerIdSchema) 
.action(async ({ parsedInput: { customerId } }) => {
  const charges = await stripe.charges.list({ customer: customerId });
  const paidCharges = charges.data.filter(charge => charge.status === "succeeded");
  
  return paidCharges.length > 0;
});

export const cancelSubscription = action
.schema(subscriptionIdSchema) 
.action(async ({ parsedInput: { subscriptionId } }) => {
  await stripe.subscriptions.cancel(subscriptionId);
  return { success: `Subscription ${subscriptionId} canceled` };
});

export const cancelAtPeriodEnd = action
.schema(subscriptionIdSchema) 
.action(async ({ parsedInput: { subscriptionId } }) => {
  await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
  return { success: `Subscription ${subscriptionId} will be canceled at the end of the period` };
});

export const upgradeSubscription = action
.schema(upgradeSchema) 
.action(async ({ parsedInput: { subscriptionId, newPriceId } }) => {
  await stripe.subscriptions.update(subscriptionId, {
      items: [{ price: newPriceId }],
      proration_behavior: "create_prorations", // Facultatif, voir ci-dessous
  });
  return { success: `Subscription ${subscriptionId} upgraded to ${newPriceId}` };
});
