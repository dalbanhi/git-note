import React from "react";
import FilterPill from "@/components/shared/FilterPill";

interface TagsListHorizProps {
  tagList: string[] | null;
}

const TagsListHoriz: React.FC<TagsListHorizProps> = ({ tagList }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {tagList?.map((tag) => {
        return (
          <FilterPill
            key={tag}
            text={tag}
            backgroundColor="bg-myBlack-700"
            textColor="text-myWhite-300"
            filterType="tag"
          />
        );
      })}
    </div>
  );
};

export default TagsListHoriz;
