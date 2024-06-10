import React, { PropsWithChildren } from "react";
import Image from "next/image";
import Link from "next/link";

interface InfoLinkProps extends PropsWithChildren<{}> {
  href?: string;
  iconSrc: string;
  iconAlt: string;
}

const InfoLink: React.FC<InfoLinkProps> = ({
  href,
  iconSrc,
  iconAlt,
  children,
}) => {
  const content = (
    <>
      <Image src={"/" + iconSrc} alt={iconAlt} width={12} height={12}></Image>
      <span
        className={`truncate text-caption ${href ? "text-primary-500" : "text-myWhite-300"} hover:text-myWhite-100`}
      >
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link className="flex" href={href}>
        {content}
      </Link>
    );
  } else {
    return <div className="flex cursor-pointer gap-1">{content}</div>;
  }
};

export default InfoLink;
