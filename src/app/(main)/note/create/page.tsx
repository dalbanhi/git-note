import React from "react";
import CreatePostForm from "@/components/shared/Form/Post/CreatePostForm";
import { getAllUserTags } from "~/lib/actions/posts";
import { getSession } from "~/auth/auth";
import { redirect } from "next/navigation";

const CreateNote = async () => {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const tags = await getAllUserTags(session.user.id);

  const tagsString = JSON.stringify(tags);
  return (
    <section className="flex min-h-screen flex-col justify-start p-4 max-sm:w-full md:w-6/12">
      <h1 className="text-display1 text-myWhite-100">Create a Post</h1>
      <CreatePostForm tagsString={tagsString} />
    </section>
  );
};

export default CreateNote;
