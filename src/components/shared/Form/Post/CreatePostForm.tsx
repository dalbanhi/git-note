"use client";
import React from "react";
import Input from "@/components/interface/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema } from "~/lib/validators/note.schema";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CreatePostForm = () => {
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
        <label
          className="text-p3Med capitalize text-myWhite-300"
          htmlFor={"type"}
        >
          Create type
        </label>
        <Select>
          <SelectTrigger className="w-full bg-myBlack-700 text-myWhite-300">
            <SelectValue placeholder="Choose a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="component">Component</SelectItem>
            <SelectItem value="workflow">Workflow</SelectItem>
            <SelectItem value="knowledge">Knowledge</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-p3Med uppercase text-myWhite-500">Content</p>
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
