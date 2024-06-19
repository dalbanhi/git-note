import React from "react";
import PostCard from "./PostCard";
//
import { getPosts } from "~/lib/actions/posts";

const RecentPostsList = async () => {
  const allPosts = await getPosts(undefined, "");
  return (
    <div className="mt-2 flex flex-col gap-4">
      {allPosts.map((post) => {
        return <PostCard key={post.id} post={post} isShort={false} />;
      })}
    </div>
  );
};

export default RecentPostsList;
