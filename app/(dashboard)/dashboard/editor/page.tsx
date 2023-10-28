"use client";

import { useState } from "react";

import Editor from "@/components/editor";

function Page() {
  const [text, setText] = useState<string>("");
  return (
    <>
      <h2 className="text-2xl font-medium">Editor</h2>
      <p className="opacity-75 mb-10">Add and edit content</p>
      <Editor content={text} onChange={(t: string) => setText(t)} />
    </>
  );
}

export default Page;
