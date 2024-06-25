"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/interface/Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema } from "~/lib/validators/note.schema";
import SelectPostType from "./SelectPostType";
import TagsSelector from "./TagsSelector";
import { Flip, toast } from "react-toastify";
import { Separator } from "@/components/ui/separator";
import "@uploadthing/react/styles.css";

import { Textarea } from "@/components/ui/textarea";
import DynamicChecklist from "./DynamicChecklist";
import MarkdownEditPreview from "./MarkdownEditPreview/MarkdownEditPreview";
import PostSpecial from "./PostSpecial";

import { useRouter } from "next/navigation";
import { createPost } from "~/lib/actions/posts";

interface CreatePostFormProps {
  tagsString: string;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ tagsString }) => {
  const router = useRouter();
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

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
      title: "",
      type: "",
      tags: [],
      resourcesAndLinks: [],
      stepsToFollow: [],
      whatYouLearned: [],
      code: "",
      description: "",
      content: "",
    },
  });

  const watchType = watch("type");
  useEffect(() => {
    if (watchType === "component") {
      register("code");
      setValue("code", "");
      unregister("stepsToFollow");
      unregister("whatYouLearned");
    } else if (watchType === "workflow") {
      register("stepsToFollow");
      setValue("stepsToFollow", []);
      unregister("code");
      unregister("whatYouLearned");
    } else if (watchType === "knowledge") {
      register("whatYouLearned");
      setValue("whatYouLearned", []);
      unregister("code");
      unregister("stepsToFollow");
    }
  }, [watchType, setValue, unregister, register]);

  const showError = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      progress: 0,
      transition: Flip,
    });
  };
  useEffect(() => {
    const handleSingleFieldError = (prependingString: string, error: any) => {
      let errorMsg = "";
      if (error) {
        errorMsg = `${prependingString} Error: ${error.message}`;
        console.log(errorMsg);
        showError(errorMsg);
      }
    };
    const handleFieldArrayError = (prependingString: string, error: any) => {
      let errorMsg = "";
      if (!error) return;
      if (Array.isArray(error)) {
        for (let err of error) {
          for (let key in err) {
            errorMsg += `${prependingString} Error: ${err[key].message} `;
            break;
          }
          if (errorMsg !== "") {
            break;
          }
        }
      } else {
        errorMsg = `${prependingString} Error: ${error.message}`;
      }
      showError(errorMsg);
    };
    if (Object.keys(errors).length !== 0) {
      console.log("Errors: ", errors);
      if (errors.type) {
        handleSingleFieldError("Type: ", errors.type);
      } else {
        handleSingleFieldError("Title: ", errors.title);
        handleSingleFieldError("Description: ", errors.description);
        handleSingleFieldError("Content: ", errors.content);
        handleSingleFieldError("Code: ", errors.code);
        handleFieldArrayError(
          "Resources and Links: ",
          errors.resourcesAndLinks
        );
        handleFieldArrayError("Steps to Follow: ", errors.stepsToFollow);
        handleFieldArrayError("What you learned: ", errors.whatYouLearned);
      }
    }
  }, [errors]);

  const onSubmit = async (data: any) => {
    const newPostID = await createPost(data);
    const newPostRoute = JSON.parse(newPostID || "");
    router.push(`/note/${newPostRoute}`);
  };
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
      <Separator className="bg-myBlack-700" />
      <div className="flex flex-col gap-2">
        <p className="text-p3Med uppercase text-myWhite-500">
          Resources & Links
        </p>
        <DynamicChecklist
          register={register}
          control={control}
          fieldStringLabel=""
          fieldArrayName="resourcesAndLinks"
          placeholderText={{ resource: "Label", url: "Resource Link" }}
          listType="itemPair"
          plusButtonText="New Resource"
        />
      </div>

      <button
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary-500 p-2  text-p4Med text-myBlack-900`}
        type="submit"
        disabled={submitButtonDisabled}
      >
        Create Post
      </button>
    </form>
  );
};

export default CreatePostForm;
