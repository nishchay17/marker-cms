"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Links } from "@/config/links";
import { siteConfig } from "@/config/site";

export default function Hero() {
  return (
    <main className="h-screen flex items-center justify-center">
      <div>
        <h1 className="text-4xl sm:text-5xl px-4 md:text-7xl font-semibold text-secondary-foreground text-center w-[700px]">
          Make your content easy with{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 dark:from-yellow-300 to-orange-500 dark:to-orange-400">
            {siteConfig.name}.
          </span>
        </h1>
        <p className="text-center text-lg opacity-75 leading-6 mt-10 px-4 w-[350px] mx-auto">
          {siteConfig.description}
        </p>
        <div className="flex justify-center mt-14">
          <Button
            size="sm"
            variant="outline"
            className="mr-3 shadow"
            onClick={() => signIn("github")}
          >
            {Links.signin.title}
          </Button>
        </div>
      </div>
    </main>
  );
}
