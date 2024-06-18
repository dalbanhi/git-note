import PostHeader from "@/components/shared/Post/PostHeader";
import React from "react";
import { Separator } from "@/components/ui/separator";

import { getPost } from "~/lib/actions/posts";
import { getPostTypeProps } from "~/lib/helpers/postTypeProps";
import Markdown from "react-markdown";
import CodeBlock from "@/components/shared/Post/CodeBlock/CodeBlock";
import Link from "next/link";
import Image from "next/image";
import ResourcesAndLinks from "@/components/shared/Post/ResourcesAndLinks";
import KeyTakeawaysPreview from "@/components/shared/Post/KeyTakeaways";
import StepsToFollowPreview from "@/components/shared/Post/StepsToFollowPreview";

const Note = async ({ params }: { params: { id: string } }) => {
  const noteId = Number(params.id);
  const noteFromServer = await getPost(noteId);
  const { icon, backgroundColor, textColor } = getPostTypeProps(
    noteFromServer.type
  );

  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start gap-2 p-4">
      <PostHeader
        icon={icon}
        backgroundColor={backgroundColor}
        textColor={textColor}
        note={noteFromServer || null}
      />
      <Separator className="bg-myBlack-700" />
      {noteFromServer?.type === "component" ? (
        <CodeBlock code={noteFromServer?.code} />
      ) : noteFromServer?.type === "knowledge" ? (
        <KeyTakeawaysPreview keyTakeaways={noteFromServer?.whatYouLearned} />
      ) : (
        <StepsToFollowPreview steps={noteFromServer?.stepsToFollow} />
      )}
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
