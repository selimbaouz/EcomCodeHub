"use server";

import { stripe } from "@/lib/stripe";
import { createCheckoutSessionSchema } from "@/schemas";
import { action } from "@/lib/safe-action";

export const createCheckoutSessionCart = action
  .schema(createCheckoutSessionSchema)
  .action(async ({ parsedInput: data }) => {
    const priceId = [process.env.NEXT_PUBLIC_LIVE_PRICE_ID_ONE_TIME_BEGINNER!];

    const lineItems = priceId.map((id, index) => ({
      price: id,
      quantity: data.quantities[index] ?? 1,
    }));

    try {
      const session = await stripe.checkout.sessions.create({
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

      // Finaliser la facture si elle existe
      if (session.invoice && typeof session.invoice === "string") {
        try {
          await stripe.invoices.finalizeInvoice(session.invoice);
        } catch (invoiceError) {
          // On log l'erreur mais on ne bloque pas le paiement
          console.error("Erreur lors de la finalisation de la facture:", {
            message:
              invoiceError instanceof Error
                ? invoiceError.message
                : "Erreur inconnue",
            invoiceId: session.invoice,
          });
        }
      }

      return { url: session.url };
    } catch (error) {
      // ✅ Protection contre les erreurs null/undefined
      console.error("Erreur lors de la création de la session Stripe:", {
        message: error instanceof Error ? error.message : "Erreur inconnue",
        type: error instanceof Error ? error.constructor.name : typeof error,
        // Évite d'accéder à .stack si error est null
        stack: error instanceof Error ? error.stack : undefined,
      });

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
  } catch (error) {
    console.error("Erreur lors de la création du customer Stripe:", {
      message: error instanceof Error ? error.message : "Erreur inconnue",
      email,
    });
    return null;
  }
};
