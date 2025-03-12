"use server";

import { getUserByEmail, getUserById } from "@/data/auth/user";


export async function fetchUserByEmail(email: string) {
  if (!email) return null;

  try {
    const user = await getUserByEmail(email);
    return user;
  } catch {
    return null;
  }
}


export async function fetchUserById(userId: string) {
  if (!userId) return null;

  try {
    const user = await getUserById(userId);
    return user;
  } catch {
    return null;
  }
}
