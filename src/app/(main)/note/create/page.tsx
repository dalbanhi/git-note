import React from "react";
import CreatePostForm from "@/components/shared/Form/Post/CreatePostForm";

const CreateNote = () => {
  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start p-4">
      <h1 className="text-display1 text-myWhite-100">Create a Post</h1>
      <CreatePostForm />
    </section>
  );
};

export default CreateNote;
