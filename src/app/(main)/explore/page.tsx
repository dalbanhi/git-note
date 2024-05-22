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
  console.log(posts);
  return (
    <section>
      <RecentPostsHeader />
      {posts.map((post) => {
        return <PostCard key={post.id} post={post} isShort={false} />;
      })}
    </section>
  );
};

export default Explore;
