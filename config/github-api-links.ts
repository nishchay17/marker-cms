const GITHUB_API = "https://api.github.com";
const GITHUB_CDN = "https://cdn.jsdelivr.net/gh";

const githubLinks = {
  createRepo: `${GITHUB_API}/user/repos`,
  fetchAllRepo: `${GITHUB_API}/user/repos`,
  fetchUser: `${GITHUB_API}/user`,
  fetchRepo: (user: string, repo: string, path: string = "") =>
    `${GITHUB_API}/repos/${user}/${repo}/contents/${path}`,
  fetchPublicGithubFile: (
    user: string,
    repo: string,
    branch: string,
    path: string
  ) => `${GITHUB_CDN}/${user}/${repo}@${branch}/${path}`,
};

export default githubLinks;
