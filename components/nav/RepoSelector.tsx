"use client";

import { useQuery } from "react-query";

import { getRepo } from "@/actions/github";
import Select from "../ui/Select";

export const ALL_REPO_KEY = "all-repos";
const FIVE_MIN = 5 * 60 * 1000;

function RepoSelector() {
  const allRepos = useQuery({
    queryFn: getRepo,
    queryKey: ALL_REPO_KEY,
    staleTime: FIVE_MIN,
    refetchOnWindowFocus: false,
  });
  return (
    <div className="min-w-[12rem]">
      <Select
        isLoading={allRepos.isLoading}
        placeholder="Repositority"
        options={allRepos.data?.map((r) => ({
          value: r.id,
          label: r.name,
        }))}
      />
    </div>
  );
}

export default RepoSelector;
