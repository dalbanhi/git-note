import { redirect } from "next/navigation";
import React from "react";
import { getSession } from "~/auth/auth";
import { getPost, getAllUserTags } from "~/lib/actions/posts";
import UpdatePostForm from "@/components/shared/Form/Post/UpdatePostForm";

const UpdateNote = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }

  const noteId = params.id;
  const noteFromServer = await getPost(noteId);

  const tags = await getAllUserTags(session.user.id);

  const tagsString = JSON.stringify(tags);

  //clean the user object
  const noteJSON = JSON.parse(JSON.stringify(noteFromServer));
  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start p-4">
      <h1 className="mt-4 text-display1">Edit Post</h1>
      <UpdatePostForm
        session={session}
        noteFromServer={noteJSON}
        tagsString={tagsString}
      />
    </section>
  );
};

export default UpdateNote;
