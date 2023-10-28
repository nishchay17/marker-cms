"use server";

import githubLinks from "@/config/github-api-links";

class GithubService {
  static header = (token: string) =>
    new Headers({
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    });
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
}

export default GithubService;
