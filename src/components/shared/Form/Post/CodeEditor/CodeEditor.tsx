"use client";
import React from "react";
import { Control, Controller } from "react-hook-form";
import AceEditor from "react-ace";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ImagePreviewUploader from "./ImagePreviewUploader";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/ext-language_tools";

import "./CodeEditor.css";

interface CodeEditorProps {
  control?: Control<any>;
  setSubmitButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  control,
  setSubmitButtonDisabled,
}) => {
  return (
    <>
      <Tabs defaultValue="preview">
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
          <div className="flex flex-col items-center justify-center gap-2">
            <label
              className="text-p3Med capitalize text-myWhite-300"
              htmlFor={"Code Preview"}
            >
              Code Preview Image (optional)
            </label>
            <Controller
              name={"code.codePreviewImage"}
              control={control}
              defaultValue={""}
              render={({ field: { onChange, value } }) => (
                <ImagePreviewUploader
                  image={value}
                  setImage={onChange}
                  setSubmitButtonDisabled={setSubmitButtonDisabled}
                />
              )}
            />
          </div>
        </TabsContent>
        <TabsContent value="code">
          <div className="flex h-56 w-full flex-col gap-2">
            <label
              className="text-p3Med capitalize text-myWhite-300"
              htmlFor={"Code"}
            >
              Code
            </label>
            <Controller
              name="code.code"
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
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
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
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CodeEditor;
