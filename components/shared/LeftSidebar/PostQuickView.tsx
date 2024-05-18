import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { PostType } from "../../../types/index";
interface PostQuickViewProps {
  post: {
    type: string;
    title: string;
    content: string;
    tags: string[];
    id: number;
  };
  isActive: boolean;
}

const PostQuickView: React.FC<PostQuickViewProps> = ({ post, isActive }) => {
  const { type, title, content, tags, id } = post;

  //trim to first 22 characters
  let trimmedTitle = title;
  if (title.length > 25) {
    trimmedTitle = title.slice(0, 22) + "...";
  }

  let color = "";
  let icon = "";
  if (type === "workflow") {
    color = "text-primary-500";
    icon = "workflow-icon.svg";
  }
  if (type === "component") {
    color = "text-myPurple-500";
    icon = "component-icon.svg";
  }
  if (type === "knowledge") {
    color = "text-myGreen-500";
    icon = "knowledge-icon.svg";
  }

  let textColor = isActive ? "text-primary-500" : "text-myWhite-300";

  return (
    <Link className="flex w-full gap-2" href={`/note/${id}`}>
      <Image
        className={color}
        src={icon}
        alt={type}
        width={12}
        height={12}
      ></Image>
      <span className={`text-p3Med ${textColor}`}>{trimmedTitle}</span>
    </Link>
  );
};

export default PostQuickView;
