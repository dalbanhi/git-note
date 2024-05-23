import React from "react";
import FilterPill from "../FilterPill";

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
  let icon = "";
  let backgroundColor = "";
  let textColor = "";
  if (post.type === "workflow") {
    icon = "workflow-icon.svg";
    backgroundColor = "bg-primary-900";
    textColor = "text-primary-500";
  }
  if (post.type === "component") {
    icon = "component-icon.svg";
    backgroundColor = "bg-myPurple-900";
    textColor = "text-myPurple-500";
  }
  if (post.type === "knowledge") {
    icon = "knowledge-icon.svg";
    backgroundColor = "bg-myGreen-900";
    textColor = "text-myGreen-500";
  }

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
      <h2 className=" truncate text-h1Md text-myWhite-100">{post.title}</h2>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => {
          return (
            <FilterPill
              icon={""}
              key={tag}
              text={tag}
              backgroundColor="bg-myBlack-700"
              textColor="text-myWhite-300"
              filterType="tag"
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostCard;
