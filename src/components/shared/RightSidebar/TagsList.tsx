import React from "react";
import FilterPill from "../FilterPill";
import { testTags } from "~/constants";

const TagsList = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-p3Bold">Tags</p>
      <div className="flex flex-col gap-2">
        {testTags?.map((tag, index) => {
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