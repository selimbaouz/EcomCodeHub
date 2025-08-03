"use server";

import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/auth/user";
import { action } from "@/lib/safe-action";

export const reset = action
.schema(ResetSchema) 
.action(async ({ parsedInput: { email } }) => {
  const existingUser = await getUserByEmail(email);
  
  if (!existingUser) {
    return { error: "emailNotExistError" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "emailResetPasswordSuccess" };
});