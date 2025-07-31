"use server";

import { getUserByEmail } from "@/data/auth/user";
import { getVerificationTokenByToken } from "@/data/auth/verificiation-token";
import { db } from "@/lib/db";
import { sendSuccessEmailVerified } from "@/lib/mail";
import { action } from "@/lib/safe-action";
import { NewVerificationSchema } from "@/schemas";

export const newVerification = action
  .schema(NewVerificationSchema)
  .action(async ({ parsedInput: { token } }) => {
    const existingToken = await getVerificationTokenByToken(token);

    // Si le token est invalide ou déjà supprimé
    if (!existingToken) {
      return { error: "tokenInvalidOrUsed" }; // ex : lien expiré ou déjà utilisé
    }

    // Si le token est expiré
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired) {
      return { error: "tokenExpired" };
    }

    const existingUser = await getUserByEmail(existingToken.email);
    
    if (!existingUser) {
      return { error: "emailNotExist" };
    }

    if (existingUser.emailVerified) {
      return { error: "emailVerified" };
    }

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

/*     await db.verificationToken.delete({
      where: { id: existingToken.id },
    }); */

    // Envoyer email de confirmation
    await sendSuccessEmailVerified(existingToken.email);

    return { success: "emailVerified" };
  });
