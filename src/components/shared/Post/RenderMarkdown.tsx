"use client";

import { useEffect } from "react";

import Markdown from "react-markdown";
// import our markdown and prism
import Prism from "prismjs";
import "@/components/shared/Post/CodeBlock/prism.css";

export default function RenderMarkdown({ content }: any) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  // render the markdown normally
  return <Markdown>{content}</Markdown>;
}
