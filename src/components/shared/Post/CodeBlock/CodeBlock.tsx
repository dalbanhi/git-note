/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

import Prism from "prismjs";
import "./prism.css";
import { Code } from "~/types";
import { CopyIcon } from "../RenderMarkdown";
import HeadingAnchor from "../HeadingAnchor";

interface CodeBlockProps {
  code: Code | undefined;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [activeTab, setActiveTab] = useState("preview");
  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);

  return (
    <>
      <h6 className="text-p1Bold text-myWhite-100">
        <HeadingAnchor id="code-block" />
        Code
      </h6>
      <Tabs
        defaultValue="preview"
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="bg-myBlack-900">
          <TabsTrigger value="preview" className="flex gap-1">
            <Image
              className="text-myWhite-100"
              src="/icons/eye.svg"
              alt="eye icon"
              width={16}
              height={16}
            />
            <span className="text-p3Med">Preview</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex gap-1 text-myWhite-300">
            <Image
              className=""
              src="/icons/code.svg"
              alt="code icon"
              width={16}
              height={16}
            />
            <span className="text-p3Med">Code</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          {code?.codePreviewImage ? (
            <Image
              src={code?.codePreviewImage}
              alt="code preview"
              width={500}
              height={500}
            />
          ) : (
            <div className="flex h-80 w-full shrink-0 items-center justify-center bg-myBlack-800">
              <Image
                src={"/icons/code-preview-image.svg"}
                alt="code preview"
                width={70}
                height={60}
              />
            </div>
          )}
        </TabsContent>
        <TabsContent value="code">
          <pre className=" relative flex justify-between">
            <code className="language-javascript">{code?.code}</code>
            <div className="absolute right-0 top-1 flex size-12 items-center">
              <CopyIcon />
            </div>
          </pre>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CodeBlock;
