import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IconLinkProps {
  href: string;
  iconColor: string;
  iconSrc: string;
  iconAlt: string;
  textColor: string;
  text: string;
}

const IconLink: React.FC<IconLinkProps> = ({
  href,
  iconColor,
  iconSrc,
  iconAlt,
  textColor,
  text,
}) => {
  return (
    <Link className="flex w-full gap-2" href={href}>
      <Image
        className={iconColor}
        src={"/" + iconSrc}
        alt={iconAlt}
        width={12}
        height={12}
      ></Image>
      <span
        className={`truncate text-p3Med ${textColor} hover:text-myWhite-100`}
      >
        {text}
      </span>
    </Link>
  );
};

export default IconLink;
