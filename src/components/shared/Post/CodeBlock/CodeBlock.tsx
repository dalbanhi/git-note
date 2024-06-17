/* eslint-disable tailwindcss/no-custom-classname */
"use client";
import React, { useEffect } from "react";
import Prism from "prismjs";
import "./prism.css";

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <pre>
      <code className="language-javascript">{code}</code>
    </pre>
  );
};

export default CodeBlock;
