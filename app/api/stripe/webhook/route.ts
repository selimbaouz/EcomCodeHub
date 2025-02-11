import { createShopifyOrder } from "@/data/shopify/customer";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      sig,
      process.env.STRIPE_WEBHOOK_TEST_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: `Webhook Error: ${err}` }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);

      if(!session) {
      return NextResponse.json({ error: `Aucune session` }, { status: 400 });
      }

      if(!customerEmail) {
        return NextResponse.json({ error: `Aucun email` }, { status: 400 });
      }

      if(!lineItems) {
        return NextResponse.json({ error: `Aucune line Items` }, { status: 400 });
      }
  
      // ➜ Créer une commande sur Shopify
      const createOrder = await createShopifyOrder(customerEmail, lineItems);
      if(!createOrder) {
        return NextResponse.json({ error: `Erreur Creation de la commande, ${createOrder}` }, { status: 400 });
      }

    }
    return NextResponse.json({ received: true, message: "Le Webhook a bien été envoyé !" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: `Webhook Catch Error: ${JSON.stringify(err, null, 2)}` }, { status: 500 });
  }

}
