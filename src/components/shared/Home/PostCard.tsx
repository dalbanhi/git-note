import React from "react";
import FilterPill from "../FilterPill";
import Link from "next/link";
import { getPostTypePropValues } from "~/lib/helpers/postTypePropValues";
import TagsListHoriz from "./TagsListHoriz";
import { PostType } from "~/types";
import { Note } from "~/types";

interface PostCardProps {
  post: Note;
  isShort: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isShort }) => {
  const { icon, backgroundColor, textColor } = getPostTypePropValues(post.type);

  return (
    <div
      className={` ${isShort ? "col-span-1" : "w-full"} flex flex-col gap-2 rounded-md bg-myBlack-800 p-4`}
    >
      <FilterPill
        icon={icon}
        text={post.type}
        backgroundColor={backgroundColor}
        textColor={textColor}
        filterType="type"
      />
      <h2 className=" truncate text-h1Md text-myWhite-100">
        <Link href={`note/${post.id}`}>{post.title}</Link>
      </h2>
      <TagsListHoriz tagList={post.tags} />
    </div>
  );
};

export default PostCard;
