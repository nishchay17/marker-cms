"use client";

import { getApiKeys } from "@/actions/api-key";
import { useQuery } from "react-query";

import { Card } from "../ui/card";
import { ALL_API_KEY } from "./add-api-key";

const FIVE_MIN = 5 * 60 * 1000;

function ViewApiKey() {
  const allApi = useQuery({
    queryFn: getApiKeys,
    queryKey: ALL_API_KEY,
    staleTime: FIVE_MIN,
    refetchOnWindowFocus: false,
  });
  return (
    <Card className="p-5">
      <h3 className="text-xl mb-5 font-medium">Your API keys</h3>
      {allApi.isLoading ? (
        <p>Loading</p>
      ) : allApi.data?.length === 0 ? (
        <p>No API key, please add new key</p>
      ) : (
        allApi.data?.map(({ name, id, createdAt }) => (
          <p key={id}>
            {name}: {createdAt?.toLocaleDateString()}
          </p>
        ))
      )}
    </Card>
  );
}

export default ViewApiKey;
