import React from "react";
import RecentPostsHeader from "./RecentPostsHeader";
import RecentPostsList from "./RecentPostsList";

const RecentPosts = () => {
  return (
    <div className="mt-4 flex flex-col">
      <RecentPostsHeader />
      <RecentPostsList />
    </div>
  );
};

export default RecentPosts;
