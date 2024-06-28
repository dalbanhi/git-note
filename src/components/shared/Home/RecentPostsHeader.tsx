import React from "react";
import FilterPill from "../FilterPill";
import { postFilters } from "~/constants";
import { getPostTypePropValues } from "~/lib/helpers/postTypePropValues";
import { PostType } from "~/types";

const RecentPostsHeader = () => {
  return (
    <div className="flex max-sm:flex-col md:justify-between">
      <h1 className="text-display2 text-myWhite-100">Recent Posts</h1>
      <div className="flex flex-wrap gap-2 max-sm:justify-start md:justify-end">
        {postFilters?.map((filter) => {
          const { icon, backgroundColor, textColor } = getPostTypePropValues(
            filter.type as PostType
          );
          return (
            <FilterPill
              key={filter.type + "filter"}
              icon={icon}
              text={filter.label}
              backgroundColor={backgroundColor}
              textColor={textColor}
              filterType={"type"}
            />
          );
        })}
      </div>
    </div>
  );
};
export default RecentPostsHeader;
