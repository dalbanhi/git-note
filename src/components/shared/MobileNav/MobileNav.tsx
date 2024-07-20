"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import IconLink from "../LeftSidebar/IconLink";
import { getSession, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CommandPalette from "../LeftSidebar/CommandPalette/CommandPalette";
import { getAllUserTags } from "~/lib/actions/posts";

const MobileNav = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [allUserTags, setAllUserTags] = useState<string[]>([]);

  useEffect(() => {
    const fetchAllUserTags = async () => {
      const session = await getSession();
      if (!session) return;
      const allUserTags = await getAllUserTags(session.user.id);
      if (!allUserTags) return;
      setAllUserTags(allUserTags);
    };
    fetchAllUserTags();
  }, []);

  return (
    <React.Fragment>
      <nav className="hidden bg-myBlack-800 px-3 max-md:w-full max-md:justify-between max-sm:flex">
        <Link className="mb-6 mt-4 flex gap-2" href={"/"}>
          <Image
            src="/icons/gitnote.svg"
            alt="GitNote"
            width={20}
            height={20}
          ></Image>
          <h1 className="text-h1Md text-myWhite-100 ">GitNote</h1>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src="/icons/burger.svg"
              alt="Menu"
              width={20}
              height={20}
            ></Image>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <Link href={"/profile"}>My Profile</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/note/create" className=" flex gap-2">
                <Image
                  src="/icons/plus.svg"
                  alt="Create Note"
                  width={10}
                  height={6}
                ></Image>
                Create Post
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconLink
                iconColor="text-myWhite-500"
                iconSrc="/icons/search.svg"
                iconAlt="Search"
                textColor="text-myWhite-300"
                text="Search"
                onClick={() => {
                  setIsCommandPaletteOpen(true);
                }}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconLink
                iconColor="text-myWhite-500"
                iconSrc="/icons/logout.svg"
                iconAlt="Logout"
                textColor="text-myWhite-300"
                text="Logout"
                onClick={() => {
                  signOut();
                }}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        setIsOpen={setIsCommandPaletteOpen}
        allUserTags={allUserTags}
      />
    </React.Fragment>
  );
};

export default MobileNav;
