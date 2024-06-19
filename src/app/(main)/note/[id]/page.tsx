import PostHeader from "@/components/shared/Post/PostHeader";
import React from "react";
import { Note as TypeOfNote } from "~/types";
import { Separator } from "@/components/ui/separator";

import { getPost } from "~/lib/actions/posts";
import { getPostTypePropValues } from "~/lib/helpers/postTypePropValues";
import Markdown from "react-markdown";
import CodeBlock from "@/components/shared/Post/CodeBlock/CodeBlock";
import ResourcesAndLinks from "@/components/shared/Post/ResourcesAndLinks";
import KeyTakeawaysPreview from "@/components/shared/Post/KeyTakeaways";
import StepsToFollowPreview from "@/components/shared/Post/StepsToFollowPreview";

import { getSession } from "~/auth/auth";
import { redirect } from "next/navigation";

const Note = async ({ params }: { params: { id: string } }) => {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }

  const noteId = params.id;
  const noteFromServer = await getPost(noteId);
  if (!noteFromServer) {
    return (
      <section className="flex min-h-screen w-6/12 flex-col justify-start gap-5 p-4">
        Post not found
      </section>
    );
  }
  const { icon, backgroundColor, textColor } = getPostTypePropValues(
    noteFromServer.type
  );

  const post = JSON.stringify(noteFromServer);
  const postJSON = JSON.parse(post) as TypeOfNote;

  const NoteData = () => {
    switch (noteFromServer?.type) {
      case "component":
        return <CodeBlock code={postJSON.code} />;
      case "knowledge":
        return (
          <KeyTakeawaysPreview keyTakeaways={noteFromServer?.whatYouLearned} />
        );
      case "workflow":
        return <StepsToFollowPreview steps={noteFromServer?.stepsToFollow} />;
      default:
        return null;
    }
  };

  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start gap-5 p-4">
      <PostHeader
        icon={icon}
        backgroundColor={backgroundColor}
        textColor={textColor}
        post={post}
      />
      <Separator className="bg-myBlack-700" />
      <NoteData />
      <Separator className="bg-myBlack-700" />
      <div className="prose prose-neutral dark:prose-invert">
        <Markdown>{noteFromServer?.content}</Markdown>
      </div>
      <ResourcesAndLinks
        resourcesAndLinks={noteFromServer?.resourcesAndLinks}
      />
    </section>
  );
};

export default Note;
