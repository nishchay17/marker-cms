"use client";

import { useQuery } from "react-query";

import { getRepos } from "@/actions/github";
import Select from "../ui/Select";
import { useApplication } from "@/context/application.context";

export const ALL_REPO_KEY = "all-repos";
const FIVE_MIN = 5 * 60 * 1000;

function RepoSelector() {
  const { dispatch, state } = useApplication();
  const allRepos = useQuery({
    queryFn: getRepos,
    queryKey: ALL_REPO_KEY,
    staleTime: FIVE_MIN,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="min-w-[12rem]">
      <Select
        isLoading={allRepos.isLoading}
        placeholder="Repositority"
        onChange={({ value, label }: { value: string; label: string }) =>
          dispatch({
            type: "add-current-repo",
            payload: { id: value, name: label },
          })
        }
        value={{ label: state.currentRepo?.name, value: state.currentRepo?.id }}
        options={allRepos.data?.map((r) => ({
          value: r.id,
          label: r.name,
        }))}
      />
    </div>
  );
}

export default RepoSelector;
