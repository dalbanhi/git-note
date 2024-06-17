import PostHeader from "@/components/shared/Post/PostHeader";
import React from "react";
import { Separator } from "@/components/ui/separator";

import { getPost } from "~/lib/actions/posts";
import { getPostDetails } from "~/lib/helpers/postDetails";

const Note = async ({ params }: { params: { id: string } }) => {
  const noteId = Number(params.id);
  const noteFromServer = await getPost(noteId);
  console.log(noteFromServer);
  const { icon, backgroundColor, textColor } = getPostDetails(noteFromServer);

  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start gap-2 p-4">
      <PostHeader
        icon={icon}
        backgroundColor={backgroundColor}
        textColor={textColor}
        note={noteFromServer || null}
      />
      <Separator className="bg-myBlack-700" />
    </section>
  );
};

export default Note;
