import React from "react";
import Image from "next/image";
import FilterPill from "../FilterPill";
import { postFilters } from "~/constants";

const RecentPostsHeader = () => {
  return (
    <div className="flex justify-between">
      <h1 className="text-display2 text-myWhite-100">Recent Posts</h1>
      <div className="flex gap-2">
        {postFilters?.map((filter) => {
          return (
            <FilterPill
              key={filter.type}
              icon={filter.iconSrc}
              text={filter.label}
              backgroundColor={filter.backgroundColor}
              textColor={filter.color}
              filterType={"type"}
            />
          );
        })}
      </div>
    </div>
  );
};
export default RecentPostsHeader;
