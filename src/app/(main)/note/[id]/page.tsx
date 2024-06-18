import PostHeader from "@/components/shared/Post/PostHeader";
import React from "react";
import { Separator } from "@/components/ui/separator";

import { getPost } from "~/lib/actions/posts";
import { getPostDetails } from "~/lib/helpers/postDetails";
import Markdown from "react-markdown";
import CodeBlock from "@/components/shared/Post/CodeBlock/CodeBlock";
import Link from "next/link";
import Image from "next/image";

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
        <CodeBlock code={noteFromServer?.code} />
      ) : noteFromServer?.type === "knowledge" ? (
        <div>show what you learned</div>
      ) : (
        <div>show workflow</div>
      )}
      <div className="prose prose-neutral dark:prose-invert">
        <Markdown>{noteFromServer?.content}</Markdown>
      </div>
      <div className="flex flex-col">
        <h6 className="text-p2Bold">Resources & Links</h6>
        <ul className="list-disc">
          {noteFromServer?.resourcesAndLinks.map((resource) => {
            return (
              <li
                key={resource.url}
                className="list-item list-inside space-x-1 text-myWhite-300 hover:text-myWhite-100 "
              >
                <Link
                  href={resource.url}
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  {resource.resource}
                </Link>
                <Image
                  src="/icons/external-link.svg"
                  alt="external link"
                  width={16}
                  height={16}
                  className="inline-block"
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Note;
