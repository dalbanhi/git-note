import React from "react";
import FilterPill from "../FilterPill";
import Link from "next/link";
import { getPostTypeProps } from "~/lib/helpers/postTypeProps";
import TagsListHoriz from "./TagsListHoriz";

interface PostCardProps {
  post: {
    type: string;
    title: string;
    content: string;
    tags: string[];
    id: number;
  };
  isShort: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, isShort }) => {
  const { icon, backgroundColor, textColor } = getPostTypeProps(post.type);

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
