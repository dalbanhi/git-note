"use client";
import React from "react";
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

interface PostHeaderProps {
  icon: string;
  backgroundColor: string;
  textColor: string;
  note: Note | null;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  icon,
  backgroundColor,
  textColor,
  note,
}) => {
  const createdAt = note?.createdAt;
  const formattedCreatedAtDate = format(
    new Date(createdAt || ""),
    "dd MMM yyyy"
  );
  const headerInfo = [
    { info: formattedCreatedAtDate, icon: "/icons/calendar.svg" },
    { info: `${note?.numberOfStars} stars`, icon: "/icons/star.svg" },
    { info: `${note?.numberOfViews} views`, icon: "/icons/eye.svg" },
  ];

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
          <DropdownMenu>
            <DropdownMenuTrigger className="h-fit shrink-0 ">
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
                  href={`/note/${note?.id}/update`}
                  iconSrc="/icons/edit.svg"
                  iconAlt="edit icon"
                  iconColor="text-myWhite-100"
                  textColor="text-myWhite-100"
                  text="Update Post"
                />
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconLink
                  href={`/note/${note?.id}/update`}
                  iconSrc="/icons/trash.svg"
                  iconAlt="delete trash icon"
                  iconColor="text-myWhite-100"
                  textColor="text-myWhite-100"
                  text="Delete Post"
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <p className="text-p3Reg text-myWhite-300">{note?.description}</p>
      <div className="flex justify-start gap-4">
        {headerInfo.map((infoItem) => {
          console.log("infoItem: ", infoItem);
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
