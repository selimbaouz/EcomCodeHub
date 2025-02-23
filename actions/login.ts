"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { LoginSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/auth/user";
import { generateTwoFactorToken, generateVerificationToken } from "@/lib/tokens";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/lib/mail";
import { getTwoFactorConfirmationByUserId } from "@/data/auth/two-factor-confirmation";
import { getTwoFactorTokenByEmail } from "@/data/auth/two-factor-token";
import { AuthError } from "next-auth";
import { action } from "@/lib/safe-action";

export const verifyEmail = action
.schema(LoginSchema) 
.action(async ({ parsedInput: { email } }) => {
  const existingUser = await getUserByEmail(email.toLocaleLowerCase());
  
  if (!existingUser) {
    return { error: "Cet e-mail n'existe pas. Veuillez vérifier l'adresse e-mail saisie." };
  }

  /* if (email !== existingUser?.email) {
    return { error: "L'adresse e-mail est invalide. Veuillez entrer une adresse valide." };
  } */

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email ?? "",
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return { success: "E-mail de confirmation envoyé.", mailsend: true, user: existingUser };
  }

  return { success: true, user: existingUser };
});

export const updateOrLogin = action
.schema(LoginSchema) 
.action(async ({ parsedInput: { email, password, code } }) => {
  try {
    const existingUser = await getUserByEmail(email.toLocaleLowerCase());

    if (!existingUser || !existingUser.email) {
      return { error: "Utilisateur non trouvé. Veuillez vérifier les informations saisies." };
    }

    if (existingUser?.email !== email || !password) {
      return { error: "Certains champs sont invalides. Veuillez vérifier et réessayer." };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
  
        if (!twoFactorToken) {
          return { error: "Le code de vérification est invalide. Veuillez vérifier et réessayer." };
        }
  
        if (twoFactorToken.token !== code) {
          return { error: "Le code de vérification est invalide. Veuillez vérifier et réessayer." };
        }
  
        const hasExpired = new Date(twoFactorToken.expires) < new Date();
  
        if (hasExpired) {
          return { error: "Le code de vérification a expiré. Veuillez en demander un nouveau." };
        }
  
        await db.twoFactorToken.delete({
          where: { id: twoFactorToken.id }
        });
  
        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );
  
        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id }
          });
        }
  
        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          }
        });
      } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token,
        );
  
        return { twoFactor: true };
      }
    }

    if (existingUser.password) {
      // L'utilisateur a un mot de passe -> Connexion
      const isMatch = await bcrypt.compare(password ?? "", existingUser.password);
      if (!isMatch) return { error: "Le mot de passe est incorrect. Veuillez réessayer." };

      await signIn("credentials", { email, password, redirect: false, callbackUrl: "/docs" });
      return { success: "Connexion réussie !" };
    } else {
      // L'utilisateur n'a pas encore de mot de passe -> Mise à jour
      const hashedPassword = await bcrypt.hash(password ?? "", 10);
      await db.user.update({
        where: { email },
        data: { password: hashedPassword ?? "" },
      });

      await signIn("credentials", { email, password, redirect: false, callbackUrl: "/docs" });

      return { success: "Mot de passe enregistré, vous pouvez vous connecter !" };
    }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Informations d'identification non valides !" }
        default:
          return { error: "Une erreur est survenue." }
      }
    }
  }
});