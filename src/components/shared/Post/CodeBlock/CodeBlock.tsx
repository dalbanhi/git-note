/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

import Prism from "prismjs";
import "./prism.css";
import { Code } from "~/types";

import "react-toastify/dist/ReactToastify.css";
// import { toast, Flip } from "react-toastify";
import { handleCopyClick, showToast } from "../CopyPasteFunctions";

interface CodeBlockProps {
  code: Code | undefined;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [activeTab, setActiveTab] = useState("preview");
  useEffect(() => {
    Prism.highlightAll();
  }, [activeTab]);

  // const showToast = (message: string) => {
  //   toast.info(message, {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     theme: "colored",
  //     progress: undefined,
  //     transition: Flip,
  //   });
  // };

  // const handleCopyClick = async (event: React.MouseEvent<HTMLImageElement>) => {
  //   const codeBlock = (event.target as HTMLElement)
  //     .closest("pre")
  //     ?.querySelector("code");
  //   if (codeBlock) {
  //     try {
  //       await navigator.clipboard.writeText(codeBlock.textContent || "");
  //       showToast("Code copied to clipboard!");
  //     } catch (err) {
  //       console.error("Failed to copy: ", err);
  //     }
  //   }
  // };

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
        <pre className="flex justify-between">
          <code className="language-javascript">{code?.code}</code>
          <div className="relative size-6 cursor-pointer">
            <Image
              src="/icons/copy.svg"
              alt="Copy code"
              width={12}
              height={12}
              className="absolute left-0 top-0 my-0 size-full rounded-md object-contain"
              onClick={handleCopyClick}
            />
          </div>
        </pre>
      </TabsContent>
    </Tabs>
  );
};

export default CodeBlock;
