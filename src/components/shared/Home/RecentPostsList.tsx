import React from "react";

import { getPosts } from "~/lib/actions/posts";
import PaginatedPosts from "./PaginatedPosts";

const RecentPostsList = async () => {
  const allPosts = await getPosts(undefined, "");
  let postsString = JSON.stringify(allPosts);
  return (
    <div className="mt-2 flex flex-col gap-4">
      <PaginatedPosts posts={postsString} />
    </div>
  );
};

export default RecentPostsList;
