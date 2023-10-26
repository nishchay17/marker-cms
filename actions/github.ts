"use server";

import { getServerSession } from "next-auth";
import { eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth/auth-options";
import { db } from "@/lib/db";
import { accounts, repo } from "@/lib/db/schema";

async function getCurrentUserId() {
  const userId = (await getServerSession(authOptions))?.user.id;
  if (!userId) {
    throw new Error("No user found");
  }
  return userId;
}

async function getCurrentUserAuthToken() {
  const userId = await getCurrentUserId();
  const account = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));
  return account[0].access_token;
}

export async function getRepo() {
  const userId = await getCurrentUserId();
  const repos = await db.select().from(repo).where(eq(repo.userId, userId));
  return repos;
}
