import React from "react";
import Image from "next/image";
import Link from "next/link";
import PostAndSearch from "./PostAndSearch";
import PostsQuickView from "./PostsQuickView";
import QuickLinks from "./QuickLinks";
import { getAllUserTags } from "~/lib/actions/posts";
import { getSession } from "~/auth/auth";

const LeftSidebar = async () => {
  const session = await getSession();
  if (!session) return null;
  const allUserTags = await getAllUserTags(session.user.id);
  return (
    <aside className="flex min-h-screen w-3/12 flex-col gap-2 bg-myBlack-800 p-4 max-sm:hidden">
      <Link className="mb-6 mt-4 flex gap-2" href={"/"}>
        <Image
          src="/icons/gitnote.svg"
          alt="GitNote"
          width={20}
          height={20}
        ></Image>
        <h1 className="text-h1Md text-myWhite-100 ">GitNote</h1>
      </Link>
      <PostAndSearch allUserTags={allUserTags} />
      <hr className="mb-4 border-myWhite-500"></hr>
      <PostsQuickView />
      <hr className="mb-4 border-myWhite-500"></hr>
      <QuickLinks />
    </aside>
  );
};

export default LeftSidebar;
