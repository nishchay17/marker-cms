export const Links = {
  signin: {
    href: "/signin",
    name: "signin",
    title: "Sign in",
  },
  signup: {
    href: "/signup",
    name: "signup",
    title: "Sign up",
  },
  dashboard: {
    title: "Dashboard",
    href: "/dashboard",
    icon: "profile",
    name: "dashboard",
  },
  landing: {
    title: "Landing",
    href: "/",
    icon: "",
    name: "landing",
  },
  gitSetting: {
    title: "Github Setting",
    href: "/dashboard/github",
    icon: "github",
    name: "gitSetting",
  },
  editor: {
    title: "Editor",
    href: "/dashboard/editor",
    icon: "add",
    name: "editor",
  },
  apiKey: {
    title: "API key",
    href: "/dashboard/api-key",
    icon: "key",
    name: "apiKey",
  },
} as const;
