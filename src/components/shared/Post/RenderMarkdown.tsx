"use client";

import { useEffect, useRef } from "react";

import Markdown from "react-markdown";
import Image from "next/image";
import ReactDOM from "react-dom/client";
import { toast, Flip } from "react-toastify";
// import our markdown and prism
import Prism from "prismjs";
import "@/components/shared/Post/CodeBlock/prism.css";

export default function RenderMarkdown({ content }: any) {
  //use ref to only make this happen once
  const ref = useRef(0);

  const showError = (message: string) => {
    toast(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      progress: undefined,
      transition: Flip,
    });
  };

  useEffect(() => {
    ref.current++;
    Prism.highlightAll();
    console.log("rendering markdown");

    const handleCopyClick = async (
      event: React.MouseEvent<HTMLImageElement>
    ) => {
      console.log("copying code");
      const codeBlock = (event.target as HTMLElement)
        .closest("pre")
        ?.querySelector("code");
      if (codeBlock) {
        try {
          await navigator.clipboard.writeText(codeBlock.textContent || "");
          showError("Code copied to clipboard!");
        } catch (err) {
          console.error("Failed to copy: ", err);
        }
      }
    };
    if (ref.current === 1) {
      const preElements = document.querySelectorAll("pre");
      preElements.forEach((pre) => {
        console.log("pre element: ", pre);
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("relative", "cursor-pointer", "size-6");
        const CopyIcon = () => (
          <Image
            src="/icons/copy.svg"
            alt="Copy code"
            width={12}
            height={12}
            className="absolute left-0 top-0 my-0 size-full rounded-md object-contain"
            onClick={handleCopyClick}
          />
        );
        pre.appendChild(imageWrapper);
        const root = ReactDOM.createRoot(imageWrapper);
        root.render(<CopyIcon />);
        pre.classList.add("flex", "justify-between");
      });
    }
  }, []);

  // render the markdown normally
  return <Markdown>{content}</Markdown>;
}
