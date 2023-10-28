const GITHUB_API = "https://api.github.com";

const githubLinks = {
  createRepo: `${GITHUB_API}/user/repos`,
  fetchAllRepo: `${GITHUB_API}/user/repos`,
  fetchRepo: (user: string, repo: string) =>
    `${GITHUB_API}/user/repos/${user}/${repo}`,
  fetchUser: `${GITHUB_API}/user`,
};
export default githubLinks;
