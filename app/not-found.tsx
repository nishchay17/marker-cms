"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import LandingNav from "@/components/landing/landing-nav";
import { Button } from "@/components/ui/button";
import { Links } from "@/config/links";

export default function NotFound() {
  const router = useRouter();
  const session = useSession();
  const isAuth = session.status === "authenticated";

  return (
    <>
      <LandingNav />
      <div className="h-screen flex justify-center items-center flex-col">
        <h1 className="text-center px-4 text-2xl md:text-4xl font-semibold">
          404 <br /> Page not found!
        </h1>
        <Button
          className="mt-5"
          onClick={() =>
            router.push(isAuth ? Links.dashboard.href : Links.landing.href)
          }
        >
          Click here to go back
        </Button>
      </div>
    </>
  );
}
