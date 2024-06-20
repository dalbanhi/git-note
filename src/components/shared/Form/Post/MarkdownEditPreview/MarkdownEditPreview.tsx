import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

import React from "react";

import "./MarkdownEditPreview.css";
import { Control, Controller } from "react-hook-form";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditPreviewProps {
  control: Control;
}

const MarkdownEditPreview: React.FC<MarkdownEditPreviewProps> = ({
  control,
}) => {
  return (
    <div>
      <Controller
        name="markdown"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <MDEditor
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
            className="bg-myBlack-700"
            value={value}
            onChange={(value) => onChange(value || "")}
            textareaProps={{
              placeholder: "Please enter Markdown text",
              onBlur,
              // ref,
            }}
          />
        )}
      />
    </div>
  );
};

export default MarkdownEditPreview;
