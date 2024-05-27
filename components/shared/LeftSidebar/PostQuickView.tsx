import React from "react";
import IconLink from "./IconLink";

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

  let color = "";
  let icon = "";
  if (type === "workflow") {
    color = "text-primary-500";
    icon = "/icons/workflow.svg";
  }
  if (type === "component") {
    color = "text-myPurple-500";
    icon = "icons/component.svg";
  }
  if (type === "knowledge") {
    color = "text-myGreen-500";
    icon = "icons/knowledge.svg";
  }

  let textColor = isActive ? "text-primary-500" : "text-myWhite-300";

  return (
    <IconLink
      href={`/note/${id}`}
      iconColor={color}
      iconSrc={icon}
      iconAlt={type}
      textColor={textColor}
      text={title}
    />
  );
};

export default PostQuickView;
