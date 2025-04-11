import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { stripe } from "./lib/stripe";
 
const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

const checkStripePayment = async (email: string) => {
  try {
    const sessions = await stripe.checkout.sessions.list({
      customer_details: {
        email
      },
      limit: 1,
    });

    if (sessions.data.length === 0) {
      return false;
    }

    const session = sessions.data[0];

    if (session.payment_status === "paid") {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Erreur Stripe:", error);
    return false;
  }
};

const LoginSchema = z.object({
  email: z.string().email()
})

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email } = validatedFields.data;
          
          const user = await getUserByEmail(email);
          if (!user) return null;

          /* const hasPaid = await checkStripePayment(email);
          if (!hasPaid) {
            return null;
          } */

          return user;
        }

        return null;
      }
    })
  ],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;