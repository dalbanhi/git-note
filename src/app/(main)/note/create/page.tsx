import React from "react";
import CreatePostForm from "@/components/shared/Form/Post/CreatePostForm";
import { getAllUserTags } from "~/lib/actions/posts";

const CreateNote = async () => {
  const tags = await getAllUserTags();
  const tagsString = JSON.stringify(tags);
  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start p-4">
      <h1 className="text-display1 text-myWhite-100">Create a Post</h1>
      <CreatePostForm tagsString={tagsString} />
    </section>
  );
};

export default CreateNote;
