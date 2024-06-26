"use client";
import React from "react";
import FilterPill from "../FilterPill";
import { usePathname } from "next/navigation";

interface TagsListProps {
  tags: string;
}

const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  const pathname = usePathname();
  if (pathname.includes("profile")) return null;
  if (pathname.includes("note")) {
    if (!pathname.includes("create")) return null;
  }

  const allTags = JSON.parse(tags) as string[];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-p3Bold">Tags</p>
      <div className="flex flex-col gap-2">
        {allTags?.map((tag, index) => {
          return (
            <FilterPill
              key={tag}
              icon=""
              text={tag}
              backgroundColor="bg-myBlack-700"
              textColor="text-myWhite-300"
              filterType="tag"
            />
          );
        })}
      </div>
    </div>
  );
};

export default TagsList;
