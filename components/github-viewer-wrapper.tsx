import GithubFileViewer from "./github-file-viewer";
import GithubFileTreeViewer from "./github-file-tree-viewer";

function GithubViewerWrapper() {
  return (
    <div className="grid grid-cols-[220px_1fr]">
      <div className="flex flex-col bg-slate-50 border border-slate-300 p-1 overflow-y-auto max-w-[250px] scrollbar">
        <GithubFileTreeViewer key={"#root"} />
      </div>
      <GithubFileViewer />
    </div>
  );
}

export default GithubViewerWrapper;
