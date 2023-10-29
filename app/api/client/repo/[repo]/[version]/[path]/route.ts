import { type NextRequest } from "next/server";

import {
  getCurrentUserId,
  getFileFromGithubPublic,
  getRepo,
  findOneAccount,
} from "@/actions/github";
import { getNotFoundResponse, getSuccessResponse } from "@/lib/responseHelper";

const GET = async (
  request: NextRequest,
  { params }: { params: { repo: string; version: string; path: string } }
) => {
  const repo = await getRepo(params.repo);
  const userId = await getCurrentUserId();
  const { githubUsername } = await findOneAccount(userId);

  if (repo.length === 0) {
    return getNotFoundResponse("this repository is not imported");
  }
  if (!repo[0].isPrivate) {
    const file = await getFileFromGithubPublic(
      githubUsername,
      repo[0].name,
      "main",
      params.path
    );
    return getSuccessResponse({ file });
  }
  return getSuccessResponse({ repo });
};

export { GET };
