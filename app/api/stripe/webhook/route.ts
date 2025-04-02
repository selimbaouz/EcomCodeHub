import { createShopifyOrder } from "@/data/shopify/customer";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

const getCredits = (pack: string) => {
  switch (pack) {
  case "Débutant":
    return {
      credits: 30
    };
  case "Avancé":
    return {
      credits: 60
    };
  case "Pro":
    return {
      credits: 90
    };
  default:
    return {
      credits: 30
    };
  }
};

const createCustomerInStripe = async ({
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
    return NextResponse.json({ error: `Webhook Error: ${err}` }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const customerEmail = session.customer_details?.email;
      const customerName = session.customer_details?.name;
      const variantId = session.metadata?.variantId;
      const packName = session.metadata?.packName;
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const subscription = session.subscription ? true : false; // Si c'est un abonnement

      if(!customerEmail) {
        return NextResponse.json({ error: `Aucun email fourni` }, { status: 400 });
      }

      if(!variantId) {
        return NextResponse.json({ error: `Aucune VariantId fourni` }, { status: 400 });
      }

      if(!packName) {
        return NextResponse.json({ error: `Aucun montant fourni` }, { status: 400 });
      }

      // Obtenir le bon nombre de crédits en fonction du pack acheté
      const credits = getCredits(packName).credits;
      if (!credits) {
        return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
      }
      
      let user = await db.user.findUnique({ where: { email: customerEmail } });

      if (!user) {
        const stripeCustomer = await createCustomerInStripe({email: customerEmail, name: customerName ?? ""})

        if (!stripeCustomer) {
          return NextResponse.json({ error: "Erreur dans la création de compte sur stripe" }, { status: 400 });
        }

        user = await db.user.create({
          data: {
            email: stripeCustomer.email,
            name: stripeCustomer.name,
            stripeCustomerId: stripeCustomer.id,
            subscriptionId: subscription ? session.subscription?.toString() : null,
            credits: credits,
            plan: subscription ? "SUBSCRIPTION" : "ONE_TIME",
          },
        });
      } else {
          const stripeCustomer = await createCustomerInStripe({email: customerEmail, name: customerName ?? ""})

          if (!stripeCustomer) {
            return NextResponse.json({ error: "Erreur dans la création de compte sur stripe" }, { status: 400 });
          }

          await db.user.update({
            where: { email: customerEmail },
            data: {
              email:  stripeCustomer.email,
              name:  stripeCustomer.name,
              stripeCustomerId: stripeCustomer.id,
              subscriptionId: subscription ? session.subscription?.toString() : null,
              credits: user.credits + credits,
              plan: subscription ? "SUBSCRIPTION" : "ONE_TIME",
             }, 
          });
        }

      // ➜ Créer une commande sur Shopify
      const createOrder = await createShopifyOrder(customerEmail, variantId, lineItems);
      if(!createOrder) {
        return NextResponse.json({ error: `Erreur Creation de la commande, ${createOrder}` }, { status: 400 });
      }

    }
    return NextResponse.json({ received: true, message: "Le Webhook a bien été envoyé !" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: `Webhook Catch Error: ${JSON.stringify(err, null, 2)}` }, { status: 500 });
  }

}
