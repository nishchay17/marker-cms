import React from "react";
import GithubViewer from "./github-viewer";

type Props = {};

function GithubViewerWrapper({}: Props) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col bg-slate-50 border border-slate-300 p-1 overflow-y-auto max-w-[250px] scrollbar">
        <GithubViewer key={"#root"} />
      </div>
    </div>
  );
}

export default GithubViewerWrapper;
