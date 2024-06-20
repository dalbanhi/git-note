"use client";
import React from "react";
import { Control, Controller } from "react-hook-form";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

import "./CodeEditor.css";

interface CodeEditorProps {
  control?: Control;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ control }) => {
  return (
    <div className="h-56 w-full">
      <Controller
        name="code"
        control={control}
        render={({ field }) => {
          return (
            <AceEditor
              mode="javascript"
              theme="twilight"
              name="code_editor"
              height="100%"
              width="100%"
              fontSize={12}
              wrapEnabled={true}
              lineHeight={14}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              setOptions={{
                useWorker: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          );
        }}
      />
    </div>
  );
};

export default CodeEditor;
