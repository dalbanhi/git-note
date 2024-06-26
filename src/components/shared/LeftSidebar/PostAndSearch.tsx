"use client";
import React, { useState } from "react";
import Image from "next/image";
import CommandPalette from "@/components/shared/LeftSidebar/CommandPalette/CommandPalette";
import Link from "next/link";

interface PostAndSearchProps {
  allUserTags: string[];
}

const PostAndSearch: React.FC<PostAndSearchProps> = ({ allUserTags }) => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  return (
    <div className="mb-4 flex flex-col gap-3">
      <Link
        href="/note/create"
        className="flex items-center justify-center gap-1 rounded bg-gradient-to-r from-primary-gradientStart to-primary-gradientEnd p-2 text-p4Med text-myWhite-100"
      >
        <Image
          src="/icons/plus.svg"
          alt="Create Note"
          width={12}
          height={12}
        ></Image>
        Create Post
      </Link>
      <div className="flex items-center justify-between rounded-lg bg-myBlack-700 px-2 text-p4Med text-myWhite-500">
        <div className="flex justify-center">
          <button onClick={() => setIsCommandPaletteOpen(true)}>
            <Image
              src="/icons/search.svg"
              alt="Search"
              width={12}
              height={12}
            ></Image>
          </button>
          <input
            type="text"
            className="w-full rounded-lg border-none bg-myBlack-700 p-2 text-p4Med text-myWhite-500 outline-none"
            placeholder="Search..."
            onClick={() => setIsCommandPaletteOpen(true)}
          ></input>
        </div>
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="flex items-center justify-center text-myWhite-300"
        >
          <Image
            src="/icons/command.svg"
            alt="Command"
            width={12}
            height={12}
          ></Image>
          {`K`}
        </button>
      </div>
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        setIsOpen={setIsCommandPaletteOpen}
        allUserTags={allUserTags}
      />
    </div>
  );
};

export default PostAndSearch;
