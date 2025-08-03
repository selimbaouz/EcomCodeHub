'use server';

import { stripe } from "@/lib/stripe";
import { createCheckoutSessionSchema, customerIdSchema, oneTimePurchaseIdSchema, subscriptionIdSchema, upgradeSchema } from "@/schemas";
import { action } from "@/lib/safe-action";
import { auth } from "@/auth";
import { getUserByEmail } from "@/data/auth/user";
import { db } from "@/lib/db";

const getVariantWithPacks = (type: string, level: string) => {
  switch (level) {
  case "Débutant":
    return {
      priceId: type === "bundle" ? 
        [
          process.env.NEXT_PUBLIC_LIVE_PRICE_ID_BUNDLE_STORE!,
          process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_BEGINNER!,
        ] 
        : type === "subscription" ? [process.env.NEXT_PUBLIC_LIVE_PRICE_ID_SUBSCRIPTION_BEGINNER!] 
        : [process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_BEGINNER!],
    };
  case "Avancé":
    return {
      priceId: type === "bundle" ? 
      [
        process.env.NEXT_PUBLIC_LIVE_PRICE_ID_BUNDLE_STORE!,
        process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_ADVANCED!,
      ] 
      : type === "subscription" ? [process.env.NEXT_PUBLIC_LIVE_PRICE_ID_SUBSCRIPTION_ADVANCED!] 
      : [process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_ADVANCED!]
    };
  case "Pro":
    return {
      priceId: type === "bundle" ? 
      [
        process.env.NEXT_PUBLIC_LIVE_PRICE_ID_BUNDLE_STORE!,
        process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_PRO!,
      ] 
      : type === "subscription" ? [process.env.NEXT_PUBLIC_LIVE_PRICE_ID_SUBSCRIPTION_PRO!] 
      : [process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_PRO!]
    };
  default:
    return {
      priceId: type === "bundle" ? 
      [
        process.env.NEXT_PUBLIC_LIVE_PRICE_ID_BUNDLE_STORE!,
        process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_BEGINNER!,
      ] 
      : type === "subscription" ? [process.env.NEXT_PUBLIC_LIVE_PRICE_ID_SUBSCRIPTION_BEGINNER!] 
      : [process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_BEGINNER!]
    };
  }
};


  export const createCheckoutSessionCart = action
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
        throw new Error("stripeRecurringPriceRequired");
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
          metadata: { variantId: data.variantId, packName: data.packNameWithBundle },
          allow_promotion_codes: true,
        });
      } else {
        return await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: data.type === "subscription" ? "subscription" : "payment",
          success_url: data.successUrl,
          cancel_url: data.cancelUrl,
          metadata: { variantId: data.variantId, packName: data.packNameWithBundle },
          allow_promotion_codes: true,
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
      return { error: "stripeSessionFailed" };
    }
  });

export const getSubscriptions =  action
.schema(subscriptionIdSchema) 
.action(async ({ parsedInput: { subscriptionId } }) => {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
});


export const checkPurchaseStatus = action
.schema(customerIdSchema) 
.action(async ({ parsedInput: { customerId } }) => {
  try {
    const charges = await stripe.charges.list({ customer: customerId });
    const paidCharges = charges.data.filter(charge => charge.status === "succeeded");
    
    return paidCharges.length > 0;
  } catch (error) {
    return { error: "" };
  }
});

export const cancelSubscription = action
.schema(subscriptionIdSchema) 
.action(async ({ parsedInput: { subscriptionId } }) => {
  try {
    await stripe.subscriptions.cancel(subscriptionId);
    return { success: `subscriptionCanceled` };
  } catch (error) {
    return { error: "stripeCancelFailed" };
  }
});

export const cancelAtPeriodEnd = action
.schema(subscriptionIdSchema) 
.action(async ({ parsedInput: { subscriptionId } }) => {
  try {
    await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
    return { success: `subscriptionCancelAtPeriodEnd` };
  } catch (error) {
    return { error: "stripeCancelFailed" };
  }
});

export const upgradeSubscription = action
.schema(upgradeSchema)
  .action(async ({ parsedInput: { newPriceId } }) => {
    const session = await auth();

    try {
      const user = await getUserByEmail(session?.user?.email ?? "");
      if (!user) {
        return { error: "stripeUserNotFound" };
      }

      if (user.subscriptionId) {
        // 🔄 L'utilisateur a déjà un abonnement → Mise à jour
        const subscription = await stripe.subscriptions.retrieve(user.subscriptionId);
        await stripe.subscriptions.update(user.subscriptionId, {
          items: [
            {
              id: subscription.items.data[0].id,
              price: newPriceId,
            },
          ],
          proration_behavior: "create_prorations",
        });

        return { success: `subscriptionUpgraded` };
      } else {
        // 🆕 L'utilisateur n'a PAS d'abonnement → Création
        if (!user.stripeCustomerId) {
          return { error: "stripeNoAccount" };
        }

        // Création d'un abonnement sur Stripe
        const subscription = await stripe.subscriptions.create({
          customer: user.stripeCustomerId,
          items: [{ price: newPriceId }],
          payment_behavior: "default_incomplete",
          expand: ["latest_invoice.payment_intent"],
        });

        if (!subscription.id) {
          return { error: "stripeSubscriptionCreateFailed" };
        }

        // ✅ Mise à jour en BDD via Prisma
        await db.user.update({
          where: { id: user.id },
          data: {
            plan: "SUBSCRIPTION",
            subscriptionId: subscription.id,
          },
        });

        return { success: `subscriptionCreated` };
      }
    } catch (error) {
      console.error("Erreur Stripe :", error);
      return { error: "stripeUpgradeFailed" };
    }
  });


export const buyOneTimePlan = action
.schema(oneTimePurchaseIdSchema) 
.action(async ({ parsedInput: { priceId, nameOfPack } }) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_LOCAL_URL!}/`,
    cancel_url: `${process.env.NEXT_PUBLIC_LOCAL_URL!}/plans?echec=true`,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { packName: nameOfPack },
    allow_promotion_codes: true,
  });

  return { url: session.url };
});

export const createCustomerInStripe = async ({
  email,
  name
}: {
  email: string;
  name?: string;
}) => {
  try {
    const stripeCustomer = await stripe.customers.create({
      email,
      name
    });
    return stripeCustomer;
  } catch {
    return null;
  }
}