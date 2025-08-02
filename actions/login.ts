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
  .action(async ({ parsedInput: { email, isChange } }) => {
    const existingUser = await getUserByEmail(email?.toLocaleLowerCase() ?? "");

    if (!existingUser) {
      return {
        error: "emailNotExistError",
        emailVerified: false,
      };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(existingUser.email ?? "");

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
        isChange ?? false
      );

      return {
        success: "emailConfirmationSent",
        mailsend: true,
        emailVerified: false,
        user: existingUser,
      };
    }

    return {
      success: "emailAlreadyVerified",
      emailVerified: true,
      user: existingUser,
    };
  });

export const updateOrLogin = action
.schema(LoginSchema) 
.action(async ({ parsedInput: { email, password, twoFactorCode, locale } }) => {
    const existingUser = await getUserByEmail(email?.toLocaleLowerCase() ?? "");

    if (!existingUser || !existingUser.email) {
      return { error: "userNotFoundError" };
    }

    if (existingUser?.email !== email || !password) {
      return { error: "invalidFieldsError" };
    }

    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (twoFactorCode) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );
  
        if (!twoFactorToken || twoFactorToken.token !== twoFactorCode) {
          return { error: "invalidVerificationCodeError" };
        }
  
        const hasExpired = new Date(twoFactorToken.expires) < new Date();
  
        if (hasExpired) {
          return { error: "expiredVerificationCodeError" };
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
      try {
      // L'utilisateur a un mot de passe -> Connexion
      const isMatch = await bcrypt.compare(password ?? "", existingUser.password);
      if (!isMatch) return { error: "incorrectPasswordError" };

      await signIn("credentials", { email, password, redirectTo: `/${locale}` });
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return { error: "loginInvalidCredentialsError" }
            default:
              return { error: "genericError" }
          }
        }
    
        throw error;
      }
    } else {
      try {
      // L'utilisateur n'a pas encore de mot de passe -> Mise à jour
      const hashedPassword = await bcrypt.hash(password ?? "", 10);
      await db.user.update({
        where: { email },
        data: { password: hashedPassword ?? "" },
      });

      await signIn("credentials", { email, password, redirectTo: `/${locale}` });
      return { success: true };
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "loginInvalidCredentialsError" }
          default:
            return { error: "genericError" }
        }
      }
      throw error;
    }
    }
});
