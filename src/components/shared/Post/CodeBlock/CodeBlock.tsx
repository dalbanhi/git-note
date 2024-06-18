/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

import Prism from "prismjs";
import "./prism.css";
import { Code } from "~/types";

interface CodeBlockProps {
  code: Code;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [activeTab, setActiveTab] = useState("preview");
  useEffect(() => {
    console.log("useEffect is running");
    Prism.highlightAll();
  }, [activeTab]);

  return (
    <Tabs defaultValue="preview" onValueChange={(value) => setActiveTab(value)}>
      <TabsList className="bg-myBlack-900">
        <TabsTrigger value="preview" className="flex gap-1">
          <Image
            className="text-myWhite-100"
            src="/icons/eye.svg"
            alt="eye icon"
            width={16}
            height={16}
          />
          <span>Preview</span>
        </TabsTrigger>
        <TabsTrigger value="code" className="flex gap-1">
          <Image
            className="text-myWhite-100"
            src="/icons/code.svg"
            alt="code icon"
            width={16}
            height={16}
          />
          <span>Code</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        {code.codePreviewImage ? (
          <Image
            src={code.codePreviewImage}
            alt="code preview"
            width={500}
            height={500}
          />
        ) : (
          <p>Enter your text here</p>
        )}
      </TabsContent>
      <TabsContent value="code">
        <pre>
          <code className="language-javascript">{code.code}</code>
        </pre>
      </TabsContent>
    </Tabs>
  );
};

export default CodeBlock;
