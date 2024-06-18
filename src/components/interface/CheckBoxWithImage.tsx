"use client";
import React, { useTransition } from "react";
import Image from "next/image";
import { updateLearningGoal } from "~/lib/actions/users";
import ListItemWithImage from "./ListItemWithImage";

interface CheckBoxWithImageProps {
  text: string;
  initialChecked?: boolean;
  isClientSideOnly?: boolean;
}

const uncheckedImage = "/icons/check-empty.svg";
const checkedImage = "/icons/check-full.svg";

const CheckBoxWithImage: React.FC<CheckBoxWithImageProps> = ({
  text,
  initialChecked,
  isClientSideOnly,
}) => {
  const [pending, startTransition] = useTransition();

  async function onClick(e: React.ChangeEvent<HTMLInputElement>) {
    const checked = e.target.checked;
    if (isClientSideOnly) return;

    startTransition(async () => {
      await updateLearningGoal(text, checked);
    });
  }

  return (
    <label className="flex items-center gap-2 hover:cursor-pointer">
      <input
        type="checkbox"
        id={`custom-check-${text}`}
        name={`custom-check-${text}`}
        defaultChecked={initialChecked}
        onChange={onClick}
        className={`peer hidden`}
        disabled={pending}
      />
      <Image
        src={uncheckedImage}
        alt={"unchecked"}
        width={16}
        height={16}
        className="hover:cursor-pointer peer-checked:hidden peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      ></Image>
      <Image
        src={checkedImage}
        className="hidden peer-checked:flex peer-checked:gap-2 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
        alt={"checked"}
        width={16}
        height={16}
      ></Image>
      {text}
    </label>
  );
};

export default CheckBoxWithImage;
