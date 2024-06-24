import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import rehypeSanitize from "rehype-sanitize";

import React from "react";

import "./MarkdownEditPreview.css";
import { Control, Controller } from "react-hook-form";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditPreviewProps {
  control: Control<any>;
}

const MarkdownEditPreview: React.FC<MarkdownEditPreviewProps> = ({
  control,
}) => {
  return (
    <div>
      <Controller
        name="content"
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
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
              className:
                "border-transparent focus:border-transparent focus:ring-0 ",
            }}
          />
        )}
      />
    </div>
  );
};

export default MarkdownEditPreview;
