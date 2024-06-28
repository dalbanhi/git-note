"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import IconLink from "../LeftSidebar/IconLink";
import { signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MobileNav = () => {
  return (
    <nav className="flex justify-between bg-myBlack-800 px-3 max-sm:w-full sm:hidden">
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
            <Link href="/note/create" className=" flex gap-2">
              <Image
                src="/icons/search.svg"
                alt="Search"
                width={10}
                height={6}
              ></Image>
              Search
            </Link>
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
  );
};

export default MobileNav;
