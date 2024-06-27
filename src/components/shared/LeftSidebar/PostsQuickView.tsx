import React from "react";
import PostQuickView from "./PostQuickView";
import { getPosts, getPostsByPage } from "~/lib/actions/posts";
import { getSession } from "~/auth/auth";

const PostsQuickView = async () => {
  const session = await getSession();
  if (!session) return null;
  const numberOfPosts = 15;
  const mostRecentPosts = await getPostsByPage(
    1,
    session.user.id,
    numberOfPosts
  );
  return (
    <div className="mb-4 flex flex-col gap-3">
      <h2 className="text-caption uppercase text-myWhite-500">
        Posts (Most recent)
      </h2>
      <>
        {mostRecentPosts &&
          mostRecentPosts.map((post, index) => {
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
