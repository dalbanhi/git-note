import React from "react";
import PostQuickView from "./PostQuickView";
// import { PostType } from "@types/index";
// import { PostType } from "../../../types/index";

const PostsQuickView = () => {
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
    {
      //   type: PostType.Component,
      type: "component",
      title: "Header Component with Logo, Nav Links, and Dropdown Menu",
      content: "This is a content",
      tags: ["Header", "Logo", "Nav Links", "Dropdown Menu"],
      id: 4,
    },
    {
      //   type: PostType.Knowledge,
      type: "knowledge",
      title: "Naming Convention",
      content: "This is a content",
      tags: ["Naming Convention"],
      id: 5,
    },
    {
      //   type: PostType.Workflow,
      type: "workflow",
      title: "NextAuth OAuth Setup",
      content: "This is a content",
      tags: ["NextAuth", "OAuth Setup"],
      id: 6,
    },
    {
      //   type: PostType.Component,
      type: "component",
      title: "Modal",
      content: "This is a content",
      tags: ["Modal"],
      id: 7,
    },
    {
      //   type: PostType.Components,
      type: "component",
      title: "Search Command",
      content: "This is a content",
      tags: ["Search Command"],
      id: 8,
    },
    {
      //   type: PostType.Knowledge,
      type: "knowledge",
      title: "Best Practices",
      content: "This is a content",
      tags: ["Best Practices"],
      id: 9,
    },
  ];

  return (
    <div className="mb-4 flex flex-col gap-3">
      <h2 className="text-caption uppercase text-myWhite-500">Posts</h2>
      <>
        {testPosts.map((post, index) => {
          return (
            <PostQuickView
              key={index}
              post={post}
              isActive={false}
            ></PostQuickView>
          );
        })}
      </>
    </div>
  );
};

export default PostsQuickView;
