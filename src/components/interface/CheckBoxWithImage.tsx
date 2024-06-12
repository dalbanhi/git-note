import React from "react";
import Image from "next/image";
import { updateUser } from "~/lib/actions/users";

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
  const onSubmit = async (data: any) => {
    console.log(data);
    // await updateUser(data);
    // router.push("/");
  };
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
