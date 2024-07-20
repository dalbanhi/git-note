import React from "react";
import RecentPostsHeader from "@/components/shared/Home/RecentPostsHeader";
import PostCard from "@/components/shared/Home/PostCard";

import { getPosts } from "~/lib/actions/posts";
import { PostType } from "~/types/index";
import { getSession } from "~/auth/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Git Note | Explore",
  description:
    "An knowledge repository for software developers. Explore posts for learning and sharing knowledge.",
  openGraph: {
    title: "Git Note | Explore",
    description:
      "An knowledge repository for software developers. Explore posts for learning and sharing knowledge.",
    images: [
      "https://utfs.io/f/2efb8dd8-2fcd-408e-b200-31dc1a1a4380-943wot.png",
    ],
  },
};

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
    <section className="mt-6 p-4 max-sm:w-full md:w-6/12">
      <RecentPostsHeader />
      <div className="mt-4 grid grid-cols-2 gap-4">
        {posts?.map((post) => {
          return <PostCard key={post.id} post={post} isShort={false} />;
        })}
      </div>
    </section>
  );
};

export default Explore;
