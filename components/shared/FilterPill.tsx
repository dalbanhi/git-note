import React from "react";
import Image from "next/image";

interface FilterPillProps {
  icon: string;
  text: string;
  backgroundColor: string;
  textColor: string;
  // onClick: () => void// This is the type of the function that will be passed in
}

const FilterPill: React.FC<FilterPillProps> = ({
  icon,
  text,
  backgroundColor,
  textColor,
}) => {
  return (
    <a
      className={`flex  max-w-fit items-center gap-1 rounded-md p-1 hover:cursor-pointer hover:text-myWhite-100  ${backgroundColor}`}
    >
      {icon && <Image src={icon} alt={text} width={12} height={12}></Image>}
      <span className={`text-caption hover:text-myWhite-100 ${textColor} `}>
        {text}
      </span>
    </a>
  );
};

export default FilterPill;
