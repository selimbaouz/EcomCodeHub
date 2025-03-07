"use server";

import { getUserByEmail } from "@/data/auth/user";


export async function fetchUserByEmail(email: string) {
  if (!email) return null;

  try {
    const user = await getUserByEmail(email);
    return user;
  } catch {
    return null;
  }
}
