import React from "react";
import RecentPostsHeader from "@/components/shared/Home/RecentPostsHeader";
import PostCard from "@/components/shared/Home/PostCard";

import { getPosts } from "~/lib/actions/posts";
import { PostType } from "~/types/index";
import { getSession } from "~/auth/auth";
import { redirect } from "next/navigation";

const Explore = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await getSession();
  if (!session) redirect("/");

  const posts = await getPosts(
    (searchParams.type as PostType) || undefined,
    (searchParams.tag as string) || "",
    session.user.id || ""
  );

  return (
    <section className="mt-6 w-6/12 p-4">
      <RecentPostsHeader />
      <div className="mt-4 grid grid-cols-2 gap-4">
        {posts.map((post) => {
          return <PostCard key={post.id} post={post} isShort={false} />;
        })}
      </div>
    </section>
  );
};

export default Explore;
