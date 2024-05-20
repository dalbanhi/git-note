import React from "react";
import Image from "next/image";
import FilterPill from "../FilterPill";

const RecentPostsHeader = () => {
  const postFilters = [
    {
      type: "WorkFlow",
      label: "WorkFlow",
      color: "text-primary-500",
      backgroundColor: "bg-primary-900",
      iconSrc: "/workflow-icon.svg",
    },
    {
      type: "Component",
      label: "Component",
      color: "text-myPurple-500",
      backgroundColor: "bg-myPurple-900",
      iconSrc: "/component-icon.svg",
    },
    {
      type: "Knowledge",
      label: "Knowledge",
      color: "text-myGreen-500",
      backgroundColor: "bg-myGreen-900",
      iconSrc: "/knowledge-icon.svg",
    },
  ];
  return (
    <div className="flex justify-between">
      <h1 className="text-display2 text-myWhite-100">Recent Posts</h1>
      <div className="flex gap-2">
        {postFilters.map((filter) => {
          return (
            // <a
            //   key={filter.type}
            //   className={`flex items-center gap-1 rounded-md p-1 hover:cursor-pointer  ${filter.backgroundColor}`}
            // >
            //   <Image
            //     src={filter.iconSrc}
            //     alt={filter.type}
            //     width={12}
            //     height={12}
            //   ></Image>
            //   <p className={`text-caption ${filter.color} `}>{filter.label}</p>
            // </a>
            <FilterPill
              key={filter.type}
              icon={filter.iconSrc}
              text={filter.label}
              backgroundColor={filter.backgroundColor}
              textColor={filter.color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecentPostsHeader;