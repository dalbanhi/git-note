import React from "react";
import Image from "next/image";
import {
  UseFormRegister,
  FieldValues,
  Controller,
  Control,
} from "react-hook-form";

interface DeletableListItemProps {
  onDelete: () => void;
  checkable: boolean;
  register: UseFormRegister<FieldValues>;
  index: number;
  fieldArrayName: string;
  control: Control | undefined;
  placeholderText: string;
  imageSrc?: string;
  imageAlt?: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DeletableListItem: React.FC<DeletableListItemProps> = ({
  onDelete,
  checkable,
  register,
  index,
  fieldArrayName,
  control,
  imageSrc,
  imageAlt,
  placeholderText,
  onKeyDown,
}) => {
  console.log("fieldArrayName.index.value", `${fieldArrayName}.${index}.value`);
  return (
    <div className="flex justify-between bg-myBlack-700 px-2 py-1">
      <div className="flex grow items-center justify-center gap-2">
        {checkable ? (
          <Controller
            name={`${fieldArrayName}[${index}].completed`}
            control={control}
            render={({ field }) => (
              <input
                className="rounded-sm bg-myBlack-700 text-myGreen-400 ring-0 focus:ring-0"
                type="checkbox"
                checked={field.value}
                {...field}
              />
            )}
          />
        ) : (
          <Image
            src={imageSrc ?? ""}
            alt={imageAlt ?? ""}
            width={12}
            height={12}
          ></Image>
        )}

        <input
          className="w-full border-none bg-myBlack-700 p-2 text-p4Reg text-myWhite-100 outline-none focus:ring-0"
          placeholder={placeholderText}
          onKeyDown={onKeyDown}
          {...register(`${fieldArrayName}.${index}.value`)}
        />
      </div>
      <button onClick={onDelete}>
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
