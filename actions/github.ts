"use server";

import { getServerSession } from "next-auth";
import { desc, eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth/auth-options";
import { db } from "@/lib/db";
import { accounts, repo } from "@/lib/db/schema";
import { repoInsertSchema, repoInsertType } from "@/lib/db/schema/repo";
import { getId } from "@/lib/utils";
import GithubService from "@/service/github";

async function getCurrentUserId() {
  const userId = (await getServerSession(authOptions))?.user.id;
  if (!userId) {
    throw new Error("No user found");
  }
  return userId;
}

export async function getCurrentUserAuthToken() {
  const userId = await getCurrentUserId();
  const account = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));
  return account[0].access_token;
}

export async function getRepo() {
  const userId = await getCurrentUserId();
  const repos = await db
    .select()
    .from(repo)
    .where(eq(repo.userId, userId))
    .orderBy(desc(repo.created_at));
  return repos;
}

export async function createRepo(values: repoInsertType) {
  const { name } = repoInsertSchema.parse(values);
  const id = await getId();
  const userId = await getCurrentUserId();
  const isRepoExist = await db.select().from(repo).where(eq(repo.name, name));
  if (isRepoExist.length !== 0) {
    throw new Error("Repository already exists");
  }
  await db.insert(repo).values({ name, id, userId });
  return { id, name };
}

export async function getRepoFromGithub() {
  const githubToken = await getCurrentUserAuthToken();
  if (!githubToken) {
    throw new Error("User not found");
  }
  const allRepos = await GithubService.fetchAll(githubToken);
  return allRepos.map((i: { name: string }) => i.name);
}
