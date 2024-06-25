"use client";
import Markdown from "react-markdown";
import React from "react";
import slugify from "slugify";
import Image from "next/image";
import { handleCopyClick } from "./CopyPasteFunctions";
import Link from "next/link";
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

interface HeadingWithAnchorProps {
  level: number;
  children: React.ReactNode;
}

const HeadingWithAnchor: React.FC<HeadingWithAnchorProps> = ({
  level,
  children,
}) => {
  const text = React.Children.toArray(children).join("");
  const slug = slugify(text, { lower: true, strict: true });
  return React.createElement(
    `h${level}`,
    { id: slug },
    <>
      <Link href={`#${slug}`}>#</Link> {text}
    </>
  );
};

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
        h1: ({ children }) => (
          <HeadingWithAnchor level={1}>{children}</HeadingWithAnchor>
        ),
        h2: ({ children }) => (
          <HeadingWithAnchor level={2}>{children}</HeadingWithAnchor>
        ),
        h3: ({ children }) => (
          <HeadingWithAnchor level={3}>{children}</HeadingWithAnchor>
        ),
        h4: ({ children }) => (
          <HeadingWithAnchor level={4}>{children}</HeadingWithAnchor>
        ),
        h5: ({ children }) => (
          <HeadingWithAnchor level={5}>{children}</HeadingWithAnchor>
        ),
        h6: ({ children }) => (
          <HeadingWithAnchor level={6}>{children}</HeadingWithAnchor>
        ),
      }}
    >
      {content}
    </Markdown>
  );
}
