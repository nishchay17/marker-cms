"use client";

import { useState } from "react";
import { useQuery } from "react-query";

import { getRepoFromGithub } from "@/actions/github";
import { useApplication } from "@/context/application.context";
import { IGithubNode } from "@/types/github";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";

export default function GithubFileTreeViewer({
  path = "",
  level = 0,
}: {
  path?: string;
  level?: number;
}) {
  const { state, dispatch } = useApplication();
  const [isClicked, setIsClicked] = useState<{ [key: string]: boolean }>({});
  const root = useQuery({
    queryFn: () => getRepoFromGithub(state.currentRepo?.name ?? "", path),
    queryKey: [state.currentRepo?.name ?? "", path],
    enabled: !!state.currentRepo?.id,
    refetchOnWindowFocus: false,
  });

  if (state.currentRepo?.id === "") {
    return <p>Please select repository</p>;
  }
  if (root.isError) {
    <p>Error in fetching repo</p>;
  }
  if (root.isLoading) {
    <p>Loading</p>;
  }

  function handleNodeClick(node: IGithubNode) {
    const isFile = node.name.includes(".");
    if (isFile) {
      dispatch({ type: "set-current-file", payload: node });
    } else {
      const isNodeClicked = isClicked[node.path] ?? false;
      setIsClicked((pre) => ({ ...pre, [node.path]: !isNodeClicked }));
    }
  }

  const style: { [key: string]: number } = {
    marginLeft: level * 8,
  };
  if (level === 0) {
    style.borderLeft = 0;
  }

  return (
    <>
      {root.data?.map((i: IGithubNode) => (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNodeClick(i);
            }}
            className={cn(
              "text-left flex items-center whitespace-nowrap px-2 py-1 border-l border-slate-300  text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none hover:bg-slate-300 hover:text-accent-foreground",
              i.url === state.currentFile?.url ? "bg-slate-300" : ""
            )}
            key={i.url}
            style={style}
          >
            {i.name.includes(".") ? (
              <Icons.file className="mr-1 h-5 w-5" />
            ) : (
              <Icons.folder className="mr-1 h-5 w-5" />
            )}
            {i.name}
          </button>
          {isClicked[i.path] ? (
            <GithubFileTreeViewer
              key={i.path}
              path={i.path}
              level={level + 1}
            />
          ) : null}
        </>
      ))}
    </>
  );
}
