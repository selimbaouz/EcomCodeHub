"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { sendNotificationNewCodes } from "@/lib/mail";
import { action } from "@/lib/safe-action";
import { notificationCodeSchema, notificationSchema } from "@/schemas";

export const toggleEmailNotifications = action
.schema(notificationSchema) 
.action(async ({ parsedInput: { emailNotifications } }) => {
  const session = await auth();
  if (!session?.user?.id) return { error: "Utilisateur non authentifié" };

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) return { error: "Utilisateur introuvable" };

  await db.user.update({
    where: { id: session.user.id },
    data: { emailNotifications: emailNotifications },
  });

  return { success: `Notifications ${user.emailNotifications ? "désactivées" : "activées"}` };
});

export const notifyNewCodes = action
.schema(notificationCodeSchema) 
.action(async ({ parsedInput: { newCodes } }) => {
  const users = await db.user.findMany({
    where: { emailNotifications: true },
    select: { email: true },
  });

  if (!users.length) return { error: "Aucun utilisateur inscrit aux notifications" };

  const recipientEmails = users.map(user => user.email);

  try {
    await sendNotificationNewCodes(newCodes, recipientEmails)

    return { success: `Email de notification envoyé` };
  } catch (error) {
    return { error: "Erreur lors de l'envoi des emails" };
  }
});
