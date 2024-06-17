import PostHeader from "@/components/shared/Post/PostHeader";
import React from "react";
import { Separator } from "@/components/ui/separator";

import { getPost } from "~/lib/actions/posts";
import { getPostDetails } from "~/lib/helpers/postDetails";
import Markdown from "react-markdown";
import CodeBlock from "@/components/shared/Post/CodeBlock/CodeBlock";

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
      {noteFromServer?.type === "component" ? (
        <CodeBlock code={noteFromServer?.code || ""} />
      ) : noteFromServer?.type === "knowledge" ? (
        <div>show what you learned</div>
      ) : (
        <div>show workflow</div>
      )}
      <div className="prose prose-neutral dark:prose-invert">
        <Markdown>{noteFromServer?.content}</Markdown>
      </div>
      <div>
        <h6>Resources & Links</h6>
        {noteFromServer?.resourcesAndLinks.map((resource) => {
          return (
            <div key={resource.url}>
              <a
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="text-myWhite-300"
              >
                {resource.resource}
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Note;
