"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { Links } from "@/config/links";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";

export default function LandingNav() {
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const session = useSession();
  const path = usePathname();

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
    } else {
      setVisible(true);
    }
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const isAuth = session.status === "authenticated";
  const authLink = isAuth
    ? Links.dashboard
    : path === Links.signin.href
    ? Links.signup
    : Links.signin;

  return (
    <nav
      className={` px-4 md:px-12 w-full shadow-sm bg-background fixed top-0 transition-all delay-150 duration-500 ease-in-out z-10 ${
        visible ? "translate-y-0" : "-translate-y-14"
      }`}
    >
      <div className="flex items-center justify-between h-14 w-full 2xl:max-w-[1600px] mx-auto">
        <Link href={Links.landing.href}>
          <div className="flex items-center">
            <Icons.hero height={16} width={16} />
            <h2 className="text-sm ml-2">{siteConfig.name}</h2>
          </div>
        </Link>
        <Link href={authLink.href} prefetch>
          <Button size="sm" variant="outline">
            {authLink.title}
          </Button>
        </Link>
      </div>
    </nav>
  );
}
