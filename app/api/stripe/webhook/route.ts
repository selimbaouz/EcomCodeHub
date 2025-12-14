import { createCustomerInStripe } from "@/actions/stripe";
import { sendSuccessPurchase } from "@/lib/mail";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      sig,
      process.env.STRIPE_WEBHOOK_LIVE_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 }
    );
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;
      const customerName = session.customer_details?.name;
      const lineItems = await stripe.checkout.sessions.listLineItems(
        session.id
      );

      if (!customerEmail) {
        return NextResponse.json(
          { error: `Aucun email fourni` },
          { status: 400 }
        );
      }

      const stripeCustomer = await createCustomerInStripe({
        email: customerEmail,
        name: customerName ?? "",
      });

      if (!stripeCustomer) {
        return NextResponse.json(
          { error: "Erreur dans la création de compte sur Stripe" },
          { status: 400 }
        );
      }

      await sendSuccessPurchase(customerEmail, customerName ?? "");

      await fetch(
        `${process.env.NEXT_PUBLIC_LOCAL_URL || "https://ecomcodehub.com"}/api/pixels-purchase`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventTime: Math.floor(Date.now() / 1000),
            eventSourceUrl: `${window.location.origin}/en/products/shopify-pro-codes-bundle?success=true`,
            fbPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
            tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID,
            value: (session?.amount_total ?? 0) / 100, // Stripe retourne en centimes
            currency: session.currency?.toUpperCase() || "EUR",
            content_ids: lineItems.data.map((item) => item.price?.product),
            email: customerEmail,
            fbp: session.metadata?.fbp,
          }),
        }
      );
    }
    return NextResponse.json(
      { received: true, message: "Le Webhook a bien été envoyé !" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Catch Error: ${JSON.stringify(err, null, 2)}` },
      { status: 500 }
    );
  }
}
