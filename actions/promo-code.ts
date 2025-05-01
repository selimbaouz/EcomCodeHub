"use server";

import { db } from "@/lib/db";
import { CodePromoSchema, SignUserWithCodeSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { action } from "@/lib/safe-action";
import { headers } from "next/headers";
import { createHash } from "crypto";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/auth/user";
import { createCustomerInStripe } from "./stripe";

export const validateCodeWithIP = action
.schema(CodePromoSchema) 
.action(async ({ parsedInput: { code } }) => {
  const ipCheck = await checkIPTrust()
  if (!ipCheck.isTrusted) {
    return { error: 'Votre réseau semble utiliser un VPN ou est bloqué. Veuillez recommencer' }
  }

  if (ipCheck.alreadyUsed) {
    return {
      error: 'Cette IP a déjà été utilisée pour un autre code.',
    }
  }

  if (!ipCheck.success) {
    return { error: ipCheck.reason || 'Vérification IP échouée.' }
  }

  const promo = await db.promoCode.findUnique({
    where: { code },
    include: { usedBy: true },
  })

  if (!promo) {
    return { error: 'Code invalide.' }
  }
  
  return {
    promoId: promo.id
  }
})

export async function checkIPTrust() {
  try {
    const headersList = headers()
    const ip =
      headersList.get('x-forwarded-for') ||
      headersList.get('cf-connecting-ip') ||
      '0.0.0.0'

    const hashedIp = createHash('sha256').update(ip).digest('hex')

    // Vérifie si l'IP est déjà utilisée pour un autre code
    const alreadyUsed = await db.promoCode.findFirst({
      where: {
        ipUsed: hashedIp,
      },
    })

    // Vérifie la fiabilité de l'IP
    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; IP Check)',
      },
    })
    const data = await response.json()

    const isVPN = data?.security?.vpn || false
    const isProxy = data?.security?.proxy || false
    const isTor = data?.security?.tor || false

    const isTrusted = !(isVPN || isProxy || isTor)

    if (!isTrusted) {
      return {
        success: false,
        reason: 'Votre IP semble provenir d’un VPN, proxy ou réseau TOR.',
      }
    }

    return {
      success: true,
      isTrusted: true,
      alreadyUsed,
      
    }
  } catch (err) {
    console.error(err)
    return {
      success: false,
      reason: 'Erreur lors de la vérification de votre IP.',
    }
  }
}

export const createUserWithPromo = action
.schema(SignUserWithCodeSchema) 
.action(async ({ parsedInput: { 
  email, 
  password,
  promoId,
  name
 } }) => {
  const headersList = headers()
  const ip =
    headersList.get('x-forwarded-for') ||
    headersList.get('cf-connecting-ip') ||
    '0.0.0.0'

  const hashedIp = createHash('sha256').update(ip).digest('hex')
  const hashedPassword = await bcrypt.hash(password ?? "", 10)

  const existingUser = await getUserByEmail(email?.toLocaleLowerCase() ?? "")

  if (existingUser) {
    return { error: 'Un compte existe déjà avec cet email.' }
  }

  const user = await db.user.create({
    data: {
      email,
      password: hashedPassword ?? "",
      credits: 15,
      name
    },
  })

  const promoCode = await db.promoCode.update({
    where: { id: promoId },
    data: {
      ipUsed: hashedIp,
      usedBy: {
        connect: { id: user.id },
      },
    },
  });
  
  if(!promoCode || !user) {
    return { error: 'La création de compte a échouée' }
  }
  const stripeCustomer = await createCustomerInStripe({email: email, name: name ?? ""})
  
  if (!stripeCustomer) {
    return { error: "Erreur dans la création de compte sur stripe" };
  }

  await db.user.create({
    data: {
      email: stripeCustomer.email,
      name: stripeCustomer.name,
      stripeCustomerId: stripeCustomer.id,
      credits: 15,
      plan: "ONE_TIME",
    },
  });

  return { success: true, userId: user.id }
});
