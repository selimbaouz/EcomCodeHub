"use server";

import { stripe } from "@/lib/stripe";
import {
  createCheckoutSessionSchema,
  customerIdSchema,
  oneTimePurchaseIdSchema,
  subscriptionIdSchema,
  upgradeSchema,
} from "@/schemas";
import { action } from "@/lib/safe-action";

export const createCheckoutSessionCart = action
  .schema(createCheckoutSessionSchema)
  .action(async ({ parsedInput: data }) => {
    const priceId = [process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_BEGINNER!];

    const lineItems = priceId.map((id, index) => ({
      price: id,
      quantity: data.quantities[index] ?? 1, // On prend la quantité associée
    }));

    const getsession = async () => {
      return await stripe.checkout.sessions.create({
        invoice_creation: { enabled: true },
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: data.successUrl,
        cancel_url: data.cancelUrl,
        metadata: {
          variantId: data.variantId,
        },
        allow_promotion_codes: true,
      });
    };

    try {
      const session = await getsession();
      if (typeof session.invoice === "string") {
        await stripe.invoices.finalizeInvoice(session.invoice);
      } else {
        console.error(
          "L'ID de la facture n'est pas une chaîne valide :",
          session.invoice
        );
      }

      return { url: session.url };
    } catch (error) {
      console.error("Erreur lors de la création de la session :", error);
      return { error: "stripeSessionFailed" };
    }
  });

export const createCustomerInStripe = async ({
  email,
  name,
}: {
  email: string;
  name?: string;
}) => {
  try {
    const stripeCustomer = await stripe.customers.create({
      email,
      name,
    });
    return stripeCustomer;
  } catch {
    return null;
  }
};
