import React from "react";
import Image from "next/image";
import Link from "next/link";

interface FilterPillProps {
  icon?: string;
  text: string;
  backgroundColor: string;
  textColor: string;
  filterType: string;
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
      className={`${backgroundColor} flex size-fit shrink-0 items-center gap-1 rounded-md p-1 hover:cursor-pointer hover:text-myWhite-100 `}
      href={`/explore?${filterType}=${text}`}
    >
      {icon && <Image src={icon} alt={text} width={12} height={12}></Image>}
      <span
        className={` text-caption capitalize  ${textColor} hover:text-myWhite-100 `}
      >
        {text}
      </span>
    </Link>
  );
};

export default FilterPill;
