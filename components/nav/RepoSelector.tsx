"use client";

import { useQuery } from "react-query";

import { getRepo } from "@/actions/github";
import Select from "../ui/Select";

function RepoSelector() {
  const allRepos = useQuery({
    queryFn: () => getRepo(),
    queryKey: "all-repos",
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
