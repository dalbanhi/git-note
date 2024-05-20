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

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="flex flex-col gap-2 bg-myBlack-800 p-4 ">
      <FilterPill
        icon={icon}
        text={capitalizeFirstLetter(post.type)}
        backgroundColor={backgroundColor}
        textColor={textColor}
      />
      <h2 className="text-h1Md text-myWhite-100">{post.title}</h2>
      <div className="flex gap-2">
        {post.tags.map((tag) => {
          return (
            <FilterPill
              icon={""}
              key={tag}
              text={tag}
              backgroundColor="bg-myBlack-700"
              textColor="text-myWhite-300"
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostCard;
