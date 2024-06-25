"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

interface IconLinkProps {
  href?: string;
  iconColor: string;
  iconSrc: string;
  iconAlt: string;
  textColor: string;
  text: string;
  onClick?: (e: any) => void;
}

const IconLink: React.FC<IconLinkProps> = ({
  href,
  iconColor,
  iconSrc,
  iconAlt,
  textColor,
  text,
  onClick,
}) => {
  const content = (
    <>
      <Image
        className={iconColor}
        src={iconSrc}
        alt={iconAlt}
        width={12}
        height={12}
      ></Image>
      <span
        className={`truncate text-p3Med ${textColor} hover:text-myWhite-100`}
      >
        {text}
      </span>
    </>
  );

  if (href) {
    return (
      <Link className="flex w-full max-w-fit gap-2" href={href}>
        {content}
      </Link>
    );
  } else if (onClick) {
    return (
      <div
        className="flex w-full max-w-fit cursor-pointer gap-2"
        onClick={onClick}
      >
        {content}
      </div>
    );
  } else {
    return (
      <div className="flex w-full max-w-fit cursor-pointer gap-2">
        {content}
      </div>
    );
  }
};

export default IconLink;
