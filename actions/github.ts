"use server";

import { getServerSession } from "next-auth";
import { desc, eq } from "drizzle-orm";

import { authOptions } from "@/lib/auth/auth-options";
import { db } from "@/lib/db";
import { accounts, repo } from "@/lib/db/schema";
import { repoInsertSchema, repoInsertType } from "@/lib/db/schema/repo";
import { getId } from "@/lib/utils";
import GithubService from "@/service/github";
import { IGithubNode } from "@/types/github";

async function getCurrentUserId() {
  const userId = (await getServerSession(authOptions))?.user.id;
  if (!userId) {
    throw new Error("No user found");
  }
  return userId;
}

async function findOneAccount(userId: string) {
  const account = await db
    .select()
    .from(accounts)
    .where(eq(accounts.userId, userId));
  return account[0];
}

export async function getCurrentUserAuthToken() {
  const userId = await getCurrentUserId();
  const account = await findOneAccount(userId);
  return account.access_token;
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

export async function createRepo(
  values: repoInsertType,
  createInGithub: boolean = false
) {
  const { name } = repoInsertSchema.parse(values);
  const githubToken = await getCurrentUserAuthToken();
  if (!githubToken) {
    throw new Error("User not found");
  }
  const id = await getId();
  const userId = await getCurrentUserId();
  const isRepoExist = await db.select().from(repo).where(eq(repo.name, name));
  if (isRepoExist.length !== 0) {
    throw new Error("Repository already exists");
  }
  if (createInGithub) {
    const created = await GithubService.create(githubToken, values);
    if (created.message) {
      throw new Error(created.message);
    }
  }
  await db.insert(repo).values({ name, id, userId });
  return { id, name };
}

export async function getAllRepoFromGithub() {
  const githubToken = await getCurrentUserAuthToken();
  if (!githubToken) {
    throw new Error("User not found");
  }
  const allRepos = await GithubService.fetchAll(githubToken);
  if (!allRepos) {
    throw new Error("Unable to fetch repository, please re-login");
  }
  if (!Array.isArray(allRepos)) {
    throw new Error(allRepos.message ?? allRepos);
  }
  return allRepos.map((i: { name: string }) => i.name);
}

export async function getUsername(token: string) {
  const user = await GithubService.fetchUser(token);
  return user.login;
}

export async function getRepoFromGithub(
  repo: string,
  path?: string
): Promise<IGithubNode[]> {
  const userId = await getCurrentUserId();
  const { access_token, githubUsername } = await findOneAccount(userId);
  if (!access_token) {
    throw new Error("Token expired, login again");
  }
  const _repos = await GithubService.fetchRepo(
    access_token,
    githubUsername,
    repo,
    path
  );
  if (!Array.isArray(_repos)) {
    console.error(_repos.message);
    return [];
  }
  return _repos
    .map((r: IGithubNode) => ({
      name: r.name,
      path: r.path,
      url: r.url,
      sha: r.sha,
      size: r.size,
      downloadLink: r.downloadLink,
    }))
    .sort((a: IGithubNode, b: IGithubNode) => {
      // if . is present in the name so it will be a file, so
      // placing it in end
      const isBFile = b.name.includes(".");
      const isAFile = a.name.includes(".");
      if (isAFile && !isBFile) {
        return 1;
      }
      if (!isAFile && isBFile) {
        return -1;
      }
      return a.name.localeCompare(b.name);
    });
}

export async function getFileFromGithub(URL: string) {
  const access_token = await getCurrentUserAuthToken();
  if (!access_token) {
    throw new Error("Token expired, login again");
  }
  const file = await GithubService.fetchURL(URL, access_token);
  if (file.message) {
    console.error(file.message);
    return {};
  }
  return file;
}
