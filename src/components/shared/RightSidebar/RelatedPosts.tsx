import Link from "next/link";
import React, { useState } from "react";
import Button from "@/components/interface/Button";
import { Separator } from "@/components/ui/separator";
import RelatedPostsCMD from "./RelatedPostsCMD";
import { NoteReference } from "~/types";

interface RelatedPostsProps {
  relatedPosts: NoteReference[] | undefined;
  allOtherPosts?: NoteReference[];
  addRelatedPost: (postToAdd: string) => void;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  relatedPosts,
  allOtherPosts,
  addRelatedPost,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <Button
        image="/icons/plus-blue.svg"
        backgroundColor="bg-myBlack-600"
        textColor="text-myWhite-100"
        onClick={() => setOpen((open) => !open)}
      >
        New related post
      </Button>

      <div className="flex flex-col gap-2">
        <h2 className="text-p2Bold text-myWhite-100">Related Posts</h2>
        <Separator className="bg-myBlack-700" />
        {relatedPosts &&
          relatedPosts?.map((post) => {
            return (
              <Link
                key={post.id + " related"}
                href={`/note/${post.id}`}
                className="truncate text-myWhite-300 hover:text-myWhite-100"
              >
                {post.title}
              </Link>
            );
          })}
      </div>
      <RelatedPostsCMD
        open={open}
        setOpen={setOpen}
        allOtherPosts={allOtherPosts}
        addRelatedPost={addRelatedPost}
      />
    </div>
  );
};

export default RelatedPosts;
