"use server";

import { auth } from "@/auth";
import { getUserByEmail } from "@/data/auth/user";
import { stripe } from "@/lib/stripe";

export async function getUserInvoices(limit = 20, lastInvoiceId?: string) {
  const session = await auth();
  if (!session || !session.user) return [];

  try {
    // Récupérer le customer Stripe de l'utilisateur
    const customers = await stripe.customers.list({ email: session.user.email ?? "" });
    if (customers.data.length === 0) return [];

    const customerId = customers.data[0].id;

    // Récupérer les paiements effectués par ce customer
    const payments = await stripe.invoices.list({
      customer: customerId,
      limit,
      starting_after: lastInvoiceId, // Permet d'obtenir la suite des résultats
    });

    return payments.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    return [];
  }
}
