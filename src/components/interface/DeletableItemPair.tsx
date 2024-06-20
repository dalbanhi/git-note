import React from "react";
import Image from "next/image";
import {
  UseFormRegister,
  FieldValues,
  Controller,
  Control,
} from "react-hook-form";

interface DeletableItemPairProps {
  onDelete: () => void;
  register: UseFormRegister<FieldValues>;
  index: number;
  fieldArrayName: string;
  control: Control | undefined;
  placeholderText: {
    resource: string;
    url: string;
  };
}

const DeletableListItem: React.FC<DeletableItemPairProps> = ({
  onDelete,
  register,
  index,
  fieldArrayName,
  placeholderText,
}) => {
  return (
    <div className="flex justify-between gap-2 px-2 py-1">
      <div className="flex grow items-center justify-center gap-2">
        <input
          className="w-1/2 rounded-sm border-none bg-myBlack-700 p-2 text-p3Reg text-myWhite-100 outline-none focus:ring-0"
          placeholder={placeholderText.resource}
          {...register(`${fieldArrayName}.${index}.resource`)}
        />
        <input
          className="w-1/2 rounded-sm border-none bg-myBlack-700 p-2 text-p3Reg text-myWhite-100 outline-none focus:ring-0"
          placeholder={placeholderText.url}
          {...register(`${fieldArrayName}.${index}.url`)}
        />
      </div>
      <button
        className="flex items-center justify-center rounded-sm bg-myBlack-700"
        onClick={onDelete}
      >
        <Image
          src={"/icons/charm-cross.svg"}
          alt="Remove"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default DeletableListItem;
