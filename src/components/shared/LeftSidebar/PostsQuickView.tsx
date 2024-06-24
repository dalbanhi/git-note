import React from "react";
import PostQuickView from "./PostQuickView";
import { getPosts } from "~/lib/actions/posts";
import { getSession } from "~/auth/auth";

const PostsQuickView = async () => {
  const session = await getSession();
  if (!session) return null;
  const allPosts = await getPosts(undefined, "", session.user.id);
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
