"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

function Profile() {
  const session = useSession();
  return (
    <>
      {session.status === "loading" ? (
        <>
          <Skeleton>Loading.........</Skeleton>
          <Skeleton className="h-[30px] w-[30px]" />
        </>
      ) : (
        <>
          <p>Hi {session?.data?.user.name?.split(" ")[0]}</p>
          <Image
            className="rounded-lg"
            src={session?.data?.user.image ?? ""}
            alt="profile"
            width={30}
            height={30}
          />
        </>
      )}
    </>
  );
}

export default Profile;
