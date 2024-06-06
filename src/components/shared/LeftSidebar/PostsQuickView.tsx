import React from "react";
import PostQuickView from "./PostQuickView";
// import { PostType } from "@types/index";
// import { PostType } from "../../../types/index";
import { testPosts } from "~/constants";

const PostsQuickView = () => {
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
