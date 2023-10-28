import GithubViewerWrapper from "@/components/github-viewer-wrapper";

export default async function Dashboard() {
  return (
    <>
      <h2 className="text-2xl font-medium mb-10">Dashboard</h2>
      <GithubViewerWrapper />
    </>
  );
}
