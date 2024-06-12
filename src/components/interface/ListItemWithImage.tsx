import React from "react";
import Image from "next/image";

interface ListItemWithImageProps extends React.PropsWithChildren<{}> {
  index: number;
  imgSrc: string;
  imgAlt: string;
}

const ListItemWithImage: React.FC<ListItemWithImageProps> = ({
  index,
  imgSrc,
  imgAlt,
  children,
}) => {
  return (
    <li>
      <label
        className="flex items-center gap-1 text-p2Reg text-myWhite-300"
        htmlFor={children as string}
      >
        <Image src={imgSrc} alt={imgAlt} width={16} height={16}></Image>
        <span className="line-clamp-1 hover:line-clamp-3">{children}</span>
      </label>
    </li>
  );
};

export default ListItemWithImage;
