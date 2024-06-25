"use client";
import { Note } from "~/types";
import React, { useEffect, useState } from "react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { NoteSchema } from "~/lib/validators/note.schema";
import Input from "@/components/interface/Input";
import { Separator } from "@/components/ui/separator";
import MarkdownEditPreview from "./MarkdownEditPreview/MarkdownEditPreview";
import SelectPostType from "./SelectPostType";
import TagsSelector from "./TagsSelector";
import PostSpecial from "./PostSpecial";
import { Textarea } from "@/components/ui/textarea";

interface UpdatePostFormProps {
  session: Session | null;
  noteFromServer: Note;
  tagsString: string;
}

const UpdatePostForm: React.FC<UpdatePostFormProps> = ({
  session,
  noteFromServer,
  tagsString,
}) => {
  const router = useRouter();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const onSubmit = async (data: any) => {
    // const newPostID = await createPost(data);
    router.push(`/note/${noteFromServer._id}`);
  };

  const whatYouLearned =
    noteFromServer.whatYouLearned?.map((item) => ({
      value: item,
    })) || [];

  const stepsToFollow =
    noteFromServer.stepsToFollow?.map((item) => ({
      value: item,
    })) || [];
  const code = {
    code: noteFromServer.code?.code || "",
    codePreviewImage: noteFromServer.code?.codePreviewImage || "",
  };

  const {
    register,
    watch,
    handleSubmit,
    control,
    setValue,
    unregister,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: noteFromServer.title,
      type: noteFromServer.type,
      tags: noteFromServer.tags,
      resourcesAndLinks: [],
      stepsToFollow: stepsToFollow,
      whatYouLearned: whatYouLearned,
      code: code,
      description: noteFromServer.description,
      content: noteFromServer.content,
    },
  });

  const watchType = watch("type");
  useEffect(() => {
    if (watchType === "component") {
      register("code");
      setValue("code", { ...code });
      unregister("stepsToFollow");
      unregister("whatYouLearned");
    } else if (watchType === "workflow") {
      register("stepsToFollow");
      setValue("stepsToFollow", [...stepsToFollow]);
      unregister("code");
      unregister("whatYouLearned");
    } else if (watchType === "knowledge") {
      register("whatYouLearned");
      setValue("whatYouLearned", [...whatYouLearned]);
      unregister("code");
      unregister("stepsToFollow");
    }
  }, [watchType, setValue, unregister, register]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-5">
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
              {...field}
            />
          )}
        />
      </div>
      <PostSpecial
        key={"postSpecial"}
        type={watchType}
        control={control}
        register={register}
        setSubmitButtonDisabled={setSubmitButtonDisabled}
      />
      <Separator className="bg-myBlack-700" />
      <div className="flex flex-col gap-2">
        <p className="text-p3Med uppercase text-myWhite-500">Content</p>
        <MarkdownEditPreview control={control} />
      </div>
      <button
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary-500 p-2  text-p4Med text-myBlack-900`}
        type="submit"
        disabled={submitButtonDisabled}
      >
        Update Post
      </button>
    </form>
  );
};

export default UpdatePostForm;
