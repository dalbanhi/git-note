"use client";
import Markdown from "react-markdown";
import Image from "next/image";
import { handleCopyClick } from "./CopyPasteFunctions";
// import our markdown and prism css
import "@/components/shared/Post/CodeBlock/prism.css";

export const CopyIcon = () => (
  <Image
    src="/icons/copy.svg"
    alt="Copy code"
    width={16}
    height={16}
    className="my-0 cursor-pointer"
    onClick={handleCopyClick}
  />
);

export default function RenderMarkdown({ content }: any) {
  return (
    <Markdown
      components={{
        pre(props) {
          const { children, className, ...rest } = props;
          return (
            <pre
              {...rest}
              className={className + " flex justify-between relative"}
            >
              {children}
              <div className="absolute right-0 top-1 flex size-12 items-center">
                <CopyIcon />
              </div>
            </pre>
          );
        },
      }}
    >
      {content}
    </Markdown>
  );
}
