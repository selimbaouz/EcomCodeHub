"use server";

import { signIn } from "@/auth";
import { db } from "@/lib/db";
import { LoginSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import bcrypt from "bcryptjs";

export const verifyEmail = async (values: z.infer<typeof LoginSchema>) => {
  try {
    // Validation des données du formulaire
    const loginValidate = LoginSchema.parse(values);

    // Vérification de l'existence de l'utilisateur
    const existingUser = await db.user.findUnique({
      where: { email: loginValidate.email.toLowerCase() },
    });

    if (!existingUser) {
      return { error: "Email non trouvé !" };
    }


    return { success: true, user: existingUser };
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return { error: "Une erreur est survenue, veuillez réessayer." };
  }
};

export const updateOrLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    const existingUser = await db.user.findUnique({ where: { email } });

    if (!existingUser) {
      return { error: "Utilisateur introuvable." };
    }

    if (existingUser.password) {
      // L'utilisateur a un mot de passe -> Connexion
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (!isMatch) return { error: "Mot de passe incorrect." };

      await signIn("credentials", { email, password, redirect: false });
      revalidatePath("/docs"); // Redirection après connexion
      return { success: "Connexion réussie !" };
    } else {
      // L'utilisateur n'a pas encore de mot de passe -> Mise à jour
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.user.update({
        where: { email },
        data: { password: hashedPassword },
      });

      return { success: "Mot de passe enregistré, vous pouvez vous connecter !" };
    }
  } catch (error) {
    return { error: "Une erreur est survenue." };
  }
};