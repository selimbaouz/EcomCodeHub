"use server";

import bcrypt from "bcryptjs";

import { NewPasswordSchema, NewPasswordTokenSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/auth/password-reset-token";
import { getUserByEmail } from "@/data/auth/user";
import { action } from "@/lib/safe-action";
import { sendSuccessPasswordChanged } from "@/lib/mail";

export const newVerificationPasswordtoken = action
.schema(NewPasswordTokenSchema) 
.action(async ({ parsedInput: { token } }) => {
  if (!token) {
    return { error: "tokenMissing" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "tokenInvalid" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "tokenExpired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "emailNotExist" }
  }

  return { success: "emailVerified" };
});


export const newPassword = action
.schema(NewPasswordSchema)
.action(async ({ parsedInput: { token, password } }) => {
  try {
    if (!token) {
      return { error: "tokenMissing" };
    }
  
    const existingToken = await getPasswordResetTokenByToken(token);
  
    if (!existingToken) {
      return { error: "tokenInvalid" };
    }
  
    const hasExpired = new Date(existingToken.expires) < new Date();
  
    if (hasExpired) {
      return { error: "tokenExpired" };
    }
  
    const existingUser = await getUserByEmail(existingToken.email);
  
    if (!existingUser) {
      return { error: "emailNotExist" }
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    await db.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });
  
    await db.passwordResetToken.delete({
      where: { id: existingToken.id }
    });
  
    await sendSuccessPasswordChanged(existingToken.email);
    return { success: "passwordUpdated" };
  } catch (error) {
    return { error: "server" }
  }
});
