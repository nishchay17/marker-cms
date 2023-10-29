"use server";

import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { apiKey } from "@/lib/db/schema/api-key";
import { getId } from "@/lib/utils";
import { getCurrentUserId } from "./github";

export async function createApiKey(name: string) {
  if (!name) {
    throw new Error("Name can't be empty");
  }
  const userId = await getCurrentUserId();
  const id = getId() + "-" + getId();
  try {
    await db.insert(apiKey).values({
      id,
      userId,
      name,
    });
  } catch (error: any) {
    if (error?.body?.message?.includes("Duplicate")) {
      throw new Error("API key with this name already exists");
    } else {
      throw new Error("Something went wrong, please try again later");
    }
  }
  return { id, name, createdAt: new Date() };
}

export async function getApiKeys() {
  const userId = await getCurrentUserId();
  return await db
    .select({ id: apiKey.id, name: apiKey.name, createdAt: apiKey.created_at })
    .from(apiKey)
    .where(eq(apiKey.userId, userId));
}
