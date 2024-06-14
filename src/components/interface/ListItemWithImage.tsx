import React from "react";
import Image from "next/image";

interface ListItemWithImageProps extends React.PropsWithChildren<{}> {
  imgSrc: string;
  imgAlt: string;
  liClasses?: string;
}

const ListItemWithImage: React.FC<ListItemWithImageProps> = ({
  imgSrc,
  imgAlt,
  children,
  liClasses,
}) => {
  return (
    <li className={`${liClasses}`}>
      <label
        className="flex items-start gap-1 text-p2Reg text-myWhite-300"
        htmlFor={children as string}
      >
        <div className="flex !size-[24px] shrink-0 items-center justify-center">
          <Image src={imgSrc} alt={imgAlt} width={16} height={16}></Image>
        </div>
        <span className="">{children}</span>
      </label>
    </li>
  );
};

export default ListItemWithImage;
