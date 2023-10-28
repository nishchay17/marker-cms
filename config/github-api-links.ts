const GITHUB_API = "https://api.github.com";

const githubLinks = {
  createRepo: `${GITHUB_API}/user/repos`,
  fetchAllRepo: `${GITHUB_API}/user/repos`,
  fetchUser: `${GITHUB_API}/user`,
  fetchRepo: (user: string, repo: string, path: string = "") =>
    `${GITHUB_API}/repos/${user}/${repo}/contents/${path}`,
};
export default githubLinks;
