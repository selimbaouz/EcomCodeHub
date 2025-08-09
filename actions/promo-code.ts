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
    return { error: 'promoNetworkBlocked' }
  }

  if (ipCheck.alreadyUsed) {
    return {
      error: 'promoIpAlreadyUse.',
    }
  }

  if (!ipCheck.success) {
    return { error: ipCheck.reason || 'promoIpCheckFailed' }
  }

  const promo = await db.promoCode.findUnique({
    where: { code: code?.toUpperCase() },
    include: { usedBy: true },
  })

  if (!promo) {
    return { error: 'promoInvalid' }
  } else if (promo?.usedBy && promo?.ipUsed) {
    return { error: "promoAlreadyUsed" };
  }
  
  return {
    promoId: promo.id
  }
})

export async function checkIPTrust() {
  try {
    const headersList = headers();
    let ip = headersList.get('x-forwarded-for') || headersList.get('cf-connecting-ip') || '0.0.0.0';
    
    // Si x-forwarded-for contient plusieurs IPs, prends la première publique
    if (ip.includes(',')) {
      ip = ip.split(',').map(i => i.trim())[0];
    }

    const hashedIp = createHash('sha256').update(ip).digest('hex');

    const alreadyUsed = await db.promoCode.findFirst({ where: { ipUsed: hashedIp } });

    const response = await fetch(`https://ipapi.co/${ip}/json/`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; IP Check)' },
    });
    const data = await response.json();

    const isVPN = data?.security?.vpn || false;
    const isProxy = data?.security?.proxy || false;
    const isTor = data?.security?.tor || false;
    const isTrusted = !(isVPN || isProxy || isTor);

    if (!isTrusted) {
      return {
        success: false,
        reason: 'promoNetworkBlocked',
      };
    }

    return {
      success: true,
      isTrusted: true,
      alreadyUsed,
    };
  } catch (err) {
    console.error(err);
    return {
      success: false,
      reason: 'promoIpCheckFailed',
    };
  }
}


export const createUserWithPromo = action
  .schema(SignUserWithCodeSchema)
  .action(async ({ parsedInput: { email, password, promoId, name } }) => {
    const headersList = headers();
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("cf-connecting-ip") ||
      "0.0.0.0";

    const hashedIp = createHash("sha256").update(ip).digest("hex");
    const hashedPassword = await bcrypt.hash(password ?? "", 10);

    const existingUser = await getUserByEmail(email?.toLocaleLowerCase() ?? "");

    if (existingUser) {
      return { error: "promoAccountExists" };
    }

    const stripeCustomer = await createCustomerInStripe({
      email,
      name: name ?? "",
    });

    if (!stripeCustomer) {
      return { error: "promoStripeError" };
    }

    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword ?? "",
        credits: 5,
        name,
        plan: "ONE_TIME",
        stripeCustomerId: stripeCustomer.id,
        promoCodeId: promoId
      },
    });

    const promoCode = await db.promoCode.update({
      where: { id: promoId },
      data: {
        ipUsed: hashedIp,
        usedBy: {
          connect: { id: user.id },
        },
      },
    });

    if (!promoCode || !user) {
      return { error: "promoAccountCreationFailed" };
    }

    return { success: true, userId: user.id };
});

export const verifyEmail = action
.schema(SignUserWithCodeSchema) 
.action(async ({ parsedInput: { email } }) => {
  const existingUser = await getUserByEmail(email?.toLocaleLowerCase() ?? "");

  if (!existingUser?.email) {
    return { error: "promoUserNotFound" };
  }

  if(existingUser.emailVerified) {
    return { error: "promoAlreadyVerified" };
  }

    const verificationToken = await generateVerificationToken(
      existingUser.email ?? "",
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
      false
    );

    return { success: "promoVerificationSent", mailsend: true, user: existingUser };
});