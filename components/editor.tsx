"use client";

import dynamic from "next/dynamic";
import sanitizeHtml from "sanitize-html";
import "md-editor-rt/lib/style.css";
import { useTheme } from "next-themes";
import { Themes } from "md-editor-rt";

import { Skeleton } from "./ui/skeleton";

const MdEditor = dynamic(
  () => import("md-editor-rt").then((mod) => mod.MdEditor),
  {
    loading: () => <Skeleton className="w-full h-full" />,
    ssr: false,
  }
);

const sanitize = (html: string) => sanitizeHtml(html);
type Props = {
  onChange: (text: string) => void;
  content: string;
};

function Editor({ onChange, content }: Props) {
  const themeObj = useTheme();
  return (
    <MdEditor
      style={{ height: "100%" }}
      language="en-US"
      theme={(themeObj.theme ?? "light") as Themes}
      sanitize={sanitize}
      modelValue={content}
      onChange={onChange}
      noUploadImg
      toolbarsExclude={["github", "save", "catalog"]}
    />
  );
}

export default Editor;
