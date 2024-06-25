"use client";
import React, { useState } from "react";
import Image from "next/image";
import FilterPill from "@/components/shared/FilterPill";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import IconLink from "../LeftSidebar/IconLink";
import { Note } from "~/types";
import TagsListHoriz from "../Home/TagsListHoriz";
import { format } from "date-fns";
import { deletePost } from "~/lib/actions/posts";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface PostHeaderProps {
  icon: string;
  backgroundColor: string;
  textColor: string;
  post: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  icon,
  backgroundColor,
  textColor,
  post,
}) => {
  const router = useRouter();
  const note = JSON.parse(post) as Note;
  const createdAt = note?.createdAt;
  const formattedCreatedAtDate = format(
    new Date(createdAt || ""),
    "dd MMM yyyy"
  );
  const headerInfo = [
    { info: formattedCreatedAtDate, icon: "/icons/calendar.svg" },
    { info: `${note?.stars} stars`, icon: "/icons/star.svg" },
    { info: `${note?.views} views`, icon: "/icons/eye.svg" },
  ];

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDropdown, setIsOpenDropDown] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-1">
        <h1 className="text-display1 text-myWhite-100">{note?.title}</h1>
        <div className="flex shrink-0 justify-end gap-1">
          <FilterPill
            icon={icon}
            text={note?.type}
            backgroundColor={backgroundColor}
            textColor={textColor}
            filterType="type"
          />
          <DropdownMenu open={isOpenDropdown} onOpenChange={setIsOpenDropDown}>
            <DropdownMenuTrigger asChild className="h-fit shrink-0 ">
              <Image
                src="/icons/see-more.svg"
                alt="three dots to see more"
                width={20}
                height={20}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <IconLink
                  href={`/note/${note?._id}/update`}
                  iconSrc="/icons/edit/grey.svg"
                  iconAlt="edit icon"
                  iconColor="text-myWhite-100"
                  textColor="text-myWhite-100"
                  text="Update Post"
                />
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  setIsOpenDropDown(false);
                  setIsOpenDialog(true);
                }}
              >
                <IconLink
                  iconSrc="/icons/trash.svg"
                  iconAlt="delete trash icon"
                  iconColor="text-myWhite-100"
                  textColor="text-myWhite-100"
                  text="Delete Post"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogContent className="bg-myBlack-700">
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  Deleting cannot be undone. This will permanently delete the
                  post.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="bg-myBlack-700">
                <Button
                  onClick={async (e) => {
                    console.log("Delete post");
                    await deletePost(note?._id || "", note?.creator);
                    router.push("/");
                    setIsOpenDialog(false);
                  }}
                  variant="destructive"
                >
                  Delete
                </Button>
                <Button
                  onClick={(e) => {
                    setIsOpenDialog(false);
                  }}
                  variant="secondary"
                >
                  Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <p className="text-p3Reg text-myWhite-300">{note?.description}</p>
      <div className="flex justify-start gap-4">
        {headerInfo.map((infoItem) => {
          return (
            <IconLink
              key={infoItem?.info}
              href="#"
              iconSrc={infoItem.icon}
              iconAlt={infoItem.info}
              iconColor="text-myWhite-100"
              textColor="text-myWhite-300"
              text={infoItem.info}
            />
          );
        })}
      </div>
      <TagsListHoriz tagList={note?.tags || null} />
    </div>
  );
};

export default PostHeader;
