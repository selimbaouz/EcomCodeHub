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
  try {

    const existingToken = await getVerificationTokenByToken(token);
  
    if (!existingToken) {
      return { error: "emailAlreadyVerified" };
    }
  
    const hasExpired = new Date(existingToken.expires) < new Date();
  
    if (hasExpired) {
      return { error: "tokenExpired" };
    }
  
    const existingUser = await getUserByEmail(existingToken.email);
  
    if (!existingUser) {
      return { error: "tokenInvalid" };
    }
  
    await db.user.update({
      where: { id: existingUser.id },
      data: { 
        emailVerified: new Date(),
        email: existingToken.email,
      }
    });
  
    await db.verificationToken.delete({
      where: { id: existingToken.id }
    });
  
    await sendSuccessEmailVerified(existingToken.email);
  
    return { success: "emailVerified" };
  } catch (error) {
    return { error: "somethingWentWrong" }
    }
});
