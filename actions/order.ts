"use server";

import { auth } from "@/auth";
import { action } from "@/lib/safe-action";
import { stripe } from "@/lib/stripe";
import { userInvoicesSchema } from "@/schemas";

export const getUserInvoices = action
  .schema(userInvoicesSchema) 
  .action(async ({ parsedInput: { subscriptionId, limit = 20, lastInvoiceId } }) => {
  const session = await auth();
  if (!session || !session.user) return [];

  try {
    // Récupérer le customer Stripe de l'utilisateur
    const customers = await stripe.customers.list({ email: session.user.email ?? "" });
    if (customers.data.length === 0) return [];

    const customerId = customers.data[0].id;
    
    const subscriptions = await stripe.invoices.list(
      lastInvoiceId ? {
        subscription: subscriptionId,
        limit,
        starting_after: lastInvoiceId,
      } : {
        subscription: subscriptionId,
        limit,
    })

    // Récupérer les paiements effectués par ce customer
    const payments = await stripe.invoices.list(
      lastInvoiceId ? {
      customer: customerId,
        limit,
        starting_after: lastInvoiceId, // Permet d'obtenir la suite des résultats
      } : {
        customer: customerId,
        limit,
    });

    return subscriptionId ? subscriptions.data ?? [] : payments.data ?? [];
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    return [];
  }
});
