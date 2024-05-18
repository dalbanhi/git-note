import React from "react";
import Image from "next/image";
import Link from "next/link";
import PostAndSearch from "./PostAndSearch";
import PostsQuickView from "./PostsQuickView";
import QuickLinks from "./QuickLinks";

const LeftSidebar = () => {
  return (
    <aside className="flex min-h-screen w-3/12 flex-col gap-2 border-r border-myWhite-500 bg-myBlack-800 p-4">
      <Link className="mb-4 flex gap-2" href={"/"}>
        <Image
          src="/gitnote-icon.svg"
          alt="GitNote"
          width={20}
          height={20}
        ></Image>
        <h1 className="text-h1Md text-myWhite-100 ">GitNote</h1>
      </Link>
      <PostAndSearch />
      <hr className="mb-4 border-myWhite-500"></hr>
      <PostsQuickView />
      <hr className="mb-4 border-myWhite-500"></hr>
      <QuickLinks />
    </aside>
  );
};

export default LeftSidebar;
