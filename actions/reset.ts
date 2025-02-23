"use server";

import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/data/auth/user";
import { action } from "@/lib/safe-action";

export const reset = action
.schema(ResetSchema) 
.action(async ({ parsedInput: { email } }) => {
  try {
    const existingUser = await getUserByEmail(email);
  
    if (!existingUser) {
      return { error: "Adresse e-mail introuvable. Veuillez vérifier l'adresse saisie." };
    }
  
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );
  
    return { success: "E-mail de réinitialisation du mot de passe envoyé." };
  } catch (error) {
    return { error: "Une erreur est survenue, veuillez réessayer." };
  }
});