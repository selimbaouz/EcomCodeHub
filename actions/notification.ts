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
  if (!session?.user?.id) return { error: "userNotConnected" };

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) return { error: "userNotFound" };

  await db.user.update({
    where: { id: session.user.id },
    data: { emailNotifications: emailNotifications },
  });

  return { success: `emailNotifications ? "notificationsEnabled" : "notificationsDisabled"` };
});

export const notifyNewCodes = action
.schema(notificationCodeSchema) 
.action(async ({ parsedInput: { newCodes } }) => {
  const users = await db.user.findMany({
    where: { emailNotifications: true },
    select: { email: true },
  });

  if (!users.length) return { error: "noUsersSubscribedNotification" };

  const recipientEmails = users.map(user => user.email);

  try {
    await sendNotificationNewCodes(newCodes, recipientEmails)

    return { success: `notificationEmailSent` };
  } catch (error) {
    return { error: "notificationEmailSendFailed" };
  }
});
