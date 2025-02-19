import { createShopifyOrder } from "@/data/shopify/customer";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

// Correspondance prix -> crédits
/**const creditMapping: { [key: number]: number } = {
  1990: 20, // Débutant - Achat ponctuel (19,90€ en cents)
  990: 20, // Débutant - Abonnement (9,90€ en cents)
  3290: 60, // Avancé - Achat ponctuel (-19%)
  1990: 60, // Avancé - Abonnement
  4490: 90, // Pro - Achat ponctuel (-25%)
  2490: 90, // Pro - Abonnement
};*/

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
      process.env.STRIPE_WEBHOOK_TEST_SECRET!
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
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      const amountPaid = session.amount_total; // Montant payé en cents
      const subscription = session.subscription ? true : false; // Si c'est un abonnement

      if(!customerEmail) {
        return NextResponse.json({ error: `Aucun email fourni` }, { status: 400 });
      }

      if(!variantId) {
        return NextResponse.json({ error: `Aucune VariantId fourni` }, { status: 400 });
      }

      if(!amountPaid) {
        return NextResponse.json({ error: `Aucun montant fourni` }, { status: 400 });
      }

      // Vérifier si le montant correspond à un pack
      /**const credits = creditMapping[amountPaid];
      if (!credits) {
        return NextResponse.json({ error: "Montant invalide" }, { status: 400 });
      }*/
      
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
            credits: 60,
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
              credits: user.credits + 60,
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
