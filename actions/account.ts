"use server";

import { auth } from "@/auth"; // Exemple avec NextAuth.js
import bcrypt from "bcryptjs";
import { deleteAccountSchema, NewVerificationEmailSchema, updateEmailSchema, updatePasswordSchema } from "@/schemas";
import { db } from "@/lib/db";
import { action } from "@/lib/safe-action";
import { sendEmailChangeConfirmation, sendSuccessAccountDeleted, sendSuccessEmailChanged } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { getVerificationTokenByToken } from "@/data/auth/verificiation-token";

export const updatePassword = action
.schema(updatePasswordSchema) 
.action(async ({ parsedInput: { newPassword, confirmPassword } }) => {
    const session = await auth(); 
    if (!session?.user?.id) throw new Error("Utilisateur non authentifié");

    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user || !user.password) return { error: "Utilisateur non trouvé" };

    const isMatch = await bcrypt.compare(newPassword, user.password);
    if (!isMatch) return { error: "Mot de passe actuel incorrect" };

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.user.update({ where: { id: user.id }, data: { password: hashedPassword } });

    return { success: "Mot de passe mis à jour avec succès" };
});

export const confirmChangeEmail = action
.schema(updateEmailSchema) 
.action(async ({ parsedInput: { newEmail } }) => {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Utilisateur non authentifié");

    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user || !user.password) return { error: "Utilisateur non trouvé" };

    if (user.email === newEmail) return { error: "Email déjà utilisé" };

    const verificationToken = await generateVerificationToken(
        user.email ?? "",
        );

    await sendEmailChangeConfirmation(verificationToken.email, verificationToken.token);

    return { success: "E-mail de confirmation envoyé.", mailsend: true, user: user };
});

export const updateEmail = action
.schema(NewVerificationEmailSchema) 
.action(async ({ parsedInput: { newEmail, token } }) => {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Utilisateur non authentifié");

    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user || !user.password) return { error: "Utilisateur non trouvé" };

    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return { error: "Le mail a déjà été vérifé" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
        return { error: "Le token a expiré" };
    }

    await db.user.update({ 
        where: { id: session.user.id }, 
        data: { email: newEmail } 
    });

      await db.verificationToken.delete({
        where: { id: existingToken.id }
      });


    await sendSuccessEmailChanged(session.user.email ?? "");
    
    await db.user.update({
        where: { id: session.user.id },
        data: { emailVerified: null },
      });

    return { success: "Email mis à jour avec succès et e-mail de confirmation envoyé." };
});

export const deleteAccount = action
.schema(deleteAccountSchema) 
.action(async ({ parsedInput: { password } }) => {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Utilisateur non authentifié");

    const user = await db.user.findUnique({ where: { id: session.user.id } });
    if (!user || !user.password) return { error: "Utilisateur non trouvé" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: "Mot de passe incorrect" };
    
    await db.user.delete({ where: { id: user.id } });
    
    await sendSuccessAccountDeleted(session.user.email ?? "");

    return { success: "Compte supprimé avec succès" };
});