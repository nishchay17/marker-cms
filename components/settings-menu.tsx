"use client";

import { useTheme } from "next-themes";
import { signOut } from "next-auth/react";

import { Icons } from "@/components/icons";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";

export default function SettingsMenu() {
  const { setTheme, theme } = useTheme();
  const SettingIcon = Icons["setting"];
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger aria-label="setting">
          <SettingIcon />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() =>
              theme == "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            Toggle Light Mode
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => signOut()}>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
