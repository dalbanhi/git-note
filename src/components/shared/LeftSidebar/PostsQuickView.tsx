import React from "react";
import PostQuickView from "./PostQuickView";
import { getPosts } from "~/lib/actions/posts";

const PostsQuickView = async () => {
  const allPosts = await getPosts(undefined, "");
  return (
    <div className="mb-4 flex flex-col gap-3">
      <h2 className="text-caption uppercase text-myWhite-500">Posts</h2>
      <>
        {allPosts.map((post, index) => {
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
