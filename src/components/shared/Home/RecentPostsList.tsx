import React from "react";
import PostCard from "./PostCard";
import { testPosts } from "~/constants";

const RecentPostsList = () => {
  return (
    <div className="mt-2 flex flex-col gap-4">
      {testPosts.map((post) => {
        return <PostCard key={post.id} post={post} isShort={false} />;
      })}
    </div>
  );
};

export default RecentPostsList;
