"use server";

import githubLinks from "@/config/github-api-links";
import { repoInsertType } from "@/lib/db/schema/repo";

class GithubService {
  static header = (token: string) =>
    new Headers({
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    });
  public static async fetchUser(token: string) {
    try {
      return await (
        await fetch(githubLinks.fetchUser, {
          headers: this.header(token),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  public static async fetchAll(token: string) {
    try {
      return await (
        await fetch(githubLinks.fetchAll, {
          headers: this.header(token),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
  public static async create(token: string, repo: repoInsertType) {
    try {
      return await (
        await fetch(githubLinks.create, {
          headers: this.header(token),
          method: "POST",
          body: JSON.stringify(repo),
        })
      ).json();
    } catch (error) {
      console.log(error);
    }
  }
}

export default GithubService;
