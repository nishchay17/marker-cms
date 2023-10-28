"use client";

import { getFileFromGithub } from "@/actions/github";
import { useApplication } from "@/context/application.context";
import { useQuery } from "react-query";
import Editor from "./editor";

function GithubFileViewer() {
  const {
    state: { currentFile },
  } = useApplication();
  const file = useQuery({
    queryFn: () => getFileFromGithub(currentFile?.url ?? ""),
    queryKey: [currentFile?.url],
    enabled: !!currentFile,
    refetchOnWindowFocus: false,
  });

  if (file.isLoading) {
    return <p>loading</p>;
  }
  if (file.isError) {
    return <p>error</p>;
  }
  console.log("file.data", file.data);
  if (!file?.data?.content) {
    return <p>loading</p>;
  }
  return (
    <Editor content={atob(file?.data?.content ?? "")} onChange={() => {}} />
  );
}

export default GithubFileViewer;
