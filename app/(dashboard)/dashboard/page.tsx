import { getRepoFromGithub } from "@/actions/github";

type Props = {};

export default async function Dashboard({}: Props) {
  await getRepoFromGithub("teams-frontend-v2");
  return <div>Dashboard</div>;
}
