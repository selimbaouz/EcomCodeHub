"use server";
import { action } from "@/lib/safe-action";
import { getUserByEmail, getUserById } from "@/data/auth/user";
import { emailSchema, userIdSchema } from "@/schemas";


export const fetchUserByEmail = action
  .schema(emailSchema) 
  .action(async ({ parsedInput: { email } }) => {
  if (!email) return null;

  try {
    const user = await getUserByEmail(email);
    return user;
  } catch {
    return null;
  }
})


export const fetchUserById = action
.schema(userIdSchema) 
.action(async ({ parsedInput: { userId } }) => {
  if (!userId) return null;

  try {
    const user = await getUserById(userId);
    return user;
  } catch {
    return null;
  }
});
