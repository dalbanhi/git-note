import React from "react";
import ListItemWithImage from "./ListItemWithImage";
import Image from "next/image";

interface CheckBoxWithImageProps {
  text: string;
  initialChecked?: boolean;
}

const uncheckedImage = "icons/check-empty.svg";
const checkedImage = "icons/check-full.svg";

const CheckBoxWithImage: React.FC<CheckBoxWithImageProps> = ({
  text,
  initialChecked,
}) => {
  console.log("CheckBoxWithImageProps", text, initialChecked);
  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        id={`custom-check-${text}`}
        name={`custom-check-${text}`}
        defaultChecked={initialChecked}
        className={`peer hidden`}
      />
      <label
        className="flex gap-1 hover:cursor-pointer peer-checked:hidden"
        htmlFor={`custom-check-${text}`}
      >
        <Image
          src={uncheckedImage}
          alt={"unchecked"}
          width={16}
          height={16}
        ></Image>
        {text}
      </label>
      <label
        className="hidden hover:cursor-pointer peer-checked:flex peer-checked:gap-1 "
        htmlFor={`custom-check-${text}`}
      >
        <Image
          src={checkedImage}
          alt={"checked"}
          width={16}
          height={16}
        ></Image>
        {text}
      </label>
    </div>
  );
};

export default CheckBoxWithImage;
