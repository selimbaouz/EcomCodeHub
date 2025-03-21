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

    // ⚠ Vérifier si le prix est bien récurrent en mode subscription
    if (data.type === "subscription") {
      const prices = await Promise.all(
        priceId.map(async (id) => await stripe.prices.retrieve(id))
      );

      const recurringPrices = prices.filter((price) => price.recurring);

      if (recurringPrices.length === 0) {
        throw new Error("Le mode 'subscription' nécessite au moins un prix récurrent.");
      }
    }
    
    const lineItems = priceId.map((id, index) => ({
      price: id,
      quantity: data.quantities[index] ?? 1,  // On prend la quantité associée
    }));

    const getsession = async (type: string) => {
      if(type === "payment") {
        return await stripe.checkout.sessions.create({
          invoice_creation: { enabled: true },
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: data.type === "subscription" ? "subscription" : "payment",
          success_url: data.successUrl,
          cancel_url: data.cancelUrl,
          metadata: { variantId: data.variantId, packName: data.packNameWithBundle }
        });
      } else {
        return await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: data.type === "subscription" ? "subscription" : "payment",
          success_url: data.successUrl,
          cancel_url: data.cancelUrl,
          metadata: { variantId: data.variantId, packName: data.packNameWithBundle }
        });
      }
    } 
  
    try {
      const session = await getsession(data.type);
      if (typeof session.invoice === "string") {
        await stripe.invoices.finalizeInvoice(session.invoice);
      } else {
        console.error("L'ID de la facture n'est pas une chaîne valide :", session.invoice);
      }
  
      return { url: session.url };
    } catch (error) {
      console.error("Erreur lors de la création de la session :", error);
      throw new Error("Impossible de créer la session de paiement.");
    }
  });

export const getSubscriptionStatus =  action
.schema(subscriptionIdSchema) 
.action(async ({ parsedInput: { subscriptionId } }) => {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
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
