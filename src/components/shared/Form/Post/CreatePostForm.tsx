"use client";
import React from "react";
import Input from "@/components/interface/Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema } from "~/lib/validators/note.schema";
import SelectPostType from "./SelectPostType";
import TagsSelector from "./TagsSelector";
import { Textarea } from "@/components/ui/textarea";
import DynamicChecklist from "./DynamicChecklist";
import MarkdownEditPreview from "./MarkdownEditPreview/MarkdownEditPreview";
import CodeEditor from "./CodeEditor/CodeEditor";

interface CreatePostFormProps {
  tagsString: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ tagsString }) => {
  const PostSpecial = ({ type }: { type: string }) => {
    switch (type) {
      case "component":
        return <CodeEditor control={control} />;
      case "workflow":
        return (
          <DynamicChecklist
            register={register}
            control={control}
            fieldStringLabel="Steps to follow"
            fieldArrayName="stepsToFollow"
            placeholderText="Enter a step to follow"
          />
        );
      case "knowledge":
        return (
          <DynamicChecklist
            register={register}
            control={control}
            fieldStringLabel="What you learned"
            fieldArrayName="whatYouLearned"
            placeholderText="Enter a what your learned"
          />
        );
      default:
        return null;
    }
  };

  const {
    register,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NoteSchema),
  });

  const watchType = watch("type");

  const onSubmit = async (data: any) => {
    //still in development
    // console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-p3Med uppercase text-myWhite-500">
          Basic Information
        </p>
        <Input
          label="title"
          type={"text"}
          placeholder="Enter the title of your post"
          register={register}
        />
        <SelectPostType control={control} />
        <TagsSelector tagsString={tagsString} control={control} />
        <label
          className="text-p3Med capitalize text-myWhite-300"
          htmlFor={"description"}
        >
          Description
        </label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              className="w-full border-none bg-myBlack-700 p-2 text-p4Reg text-myWhite-100 outline-none focus:ring-0"
              placeholder="Enter a short description here"
            />
          )}
        />
      </div>
      <PostSpecial type={watchType} />
      <div className="flex flex-col gap-2">
        <p className="text-p3Med uppercase text-myWhite-500">Content</p>
        <MarkdownEditPreview control={control} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-p3Med uppercase text-myWhite-500">
          Resources & Links
        </p>
      </div>

      <button
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary-500 p-2  text-p4Med text-myBlack-900`}
        type="submit"
        disabled={false}
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;
