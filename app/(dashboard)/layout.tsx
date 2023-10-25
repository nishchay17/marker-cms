"use client";

import { DashboardNav } from "@/components/nav/dashboard-nav";
import { AdminDashboardNav } from "@/config/dashboard-nav";

import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import SettingsMenu from "@/components/settings-menu";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      <div className="border-b-[1px] mb-6">
        <nav className="mx-auto max-w-[1700px] p-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center select-none">
              <Icons.hero size={24} />
              <h1 className="font-semibold text-lg">{siteConfig.name}</h1>
            </div>
            <div className="flex gap-4 items-center">
              <SettingsMenu />
            </div>
          </div>
        </nav>
      </div>
      <div className="px-4 grid gap-12 md:grid-cols-[200px_1px_1fr] mx-auto max-w-[1700px]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav items={AdminDashboardNav} />
        </aside>
        <div className="w-[1px] bg-border" />
        <main className="flex flex-col">{children}</main>
      </div>
    </>
  );
}
