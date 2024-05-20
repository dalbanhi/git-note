import React from "react";
import PostCard from "./PostCard";

const RecentPostsList = () => {
  const testPosts = [
    {
      //   type: PostType.Workflow,
      type: "workflow",
      title:
        "User Authentication with Next-Auth, Clerk, 0Auth and other Most Popular Auth Providers",
      content: "This is a content",
      tags: ["Next-Auth", "Clerk", "0Auth", "Auth Providers"],
      id: 1,
    },
    {
      //   type: PostType.Component,
      type: "component",
      title: "Button Component with Hover, Active, Focused States",
      content: "This is a content",
      tags: ["Button", "Hover", "Active", "Focused"],
      id: 2,
    },
    {
      //   type: PostType.Knowledge,
      type: "knowledge",
      title:
        "How does Authentication and Authorization work behind the scenes?",
      content: "This is a content",
      tags: ["Authentication", "Authorization"],
      id: 3,
    },
  ];
  return (
    <div className="mt-2 flex flex-col gap-4">
      {testPosts.map((post) => {
        return <PostCard key={post.id} post={post} isShort={true} />;
      })}
    </div>
  );
};

export default RecentPostsList;
