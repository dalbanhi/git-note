import React from "react";
import RecentPostsHeader from "@components/shared/Home/RecentPostsHeader";
import PostCard from "@components/shared/Home/PostCard";

import { getPosts } from "~/lib/actions/posts";
import { PostType } from "~/types/index";

const Explore = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const posts = await getPosts(searchParams.filter as PostType);
  return (
    <section>
      <RecentPostsHeader />
      {posts.map((post, index) => {
        return <PostCard key={index} post={post} isShort={false} />;
      })}
    </section>
  );
};

export default Explore;
