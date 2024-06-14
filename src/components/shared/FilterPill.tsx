import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FilterPillProps {
  icon: string;
  text: string;
  backgroundColor: string;
  textColor: string;
  filterType: string;
  // onClick: () => void// This is the type of the function that will be passed in
}

const FilterPill: React.FC<FilterPillProps> = ({
  icon,
  text,
  backgroundColor,
  textColor,
  filterType,
}) => {
  return (
    <Link
      className={`flex  max-w-fit items-center gap-1 rounded-lg p-1 hover:cursor-pointer hover:text-myWhite-100  ${backgroundColor}`}
      href={`/explore?${filterType}=${text}`}
    >
      {icon && <Image src={icon} alt={text} width={12} height={12}></Image>}
      <span
        className={` text-caption capitalize hover:text-myWhite-100 ${textColor} `}
      >
        {text}
      </span>
    </Link>
  );
};

export default FilterPill;
