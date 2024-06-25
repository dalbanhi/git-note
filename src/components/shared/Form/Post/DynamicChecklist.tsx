import Button from "@/components/interface/Button";
import DeletableItemPair from "@/components/interface/DeletableItemPair";
import DeletableListItem from "@/components/interface/DeletableListItem";
import React from "react";
import {
  useFieldArray,
  Control,
  Controller,
  UseFormRegister,
} from "react-hook-form";

interface DynamicChecklistProps {
  register: UseFormRegister<any>;
  control?: Control<any>;
  fieldStringLabel: string;
  fieldArrayName: string;
  placeholderText: string | { resource: string; url: string };
  listType?: string;
  plusButtonText?: string;
}

const DynamicChecklist: React.FC<DynamicChecklistProps> = ({
  register,
  control,
  fieldStringLabel,
  fieldArrayName,
  placeholderText,
  listType = "normal",
  plusButtonText = "Add checkmark",
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });

  const makeNewItem = () => {
    if (listType === "normal") {
      append({ value: "" });
    } else {
      append({ key: "", value: "" });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      makeNewItem();
      event.preventDefault();
      event.stopPropagation();
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-p3Med text-myWhite-300">{fieldStringLabel}</h3>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => {
          if (listType === "normal") {
            return (
              <DeletableListItem
                key={field.id}
                onDelete={() => remove(index)}
                checkable={false}
                register={register}
                fieldArrayName={fieldArrayName}
                placeholderText={placeholderText as string}
                control={control}
                index={index}
                imageSrc="/icons/check-square/blue.svg"
                imageAlt="Checkmark"
                onKeyDown={handleKeyDown}
              />
            );
          } else {
            return (
              <DeletableItemPair
                key={field.id}
                onDelete={() => remove(index)}
                register={register}
                index={index}
                fieldArrayName={fieldArrayName}
                placeholderText={
                  placeholderText as { resource: string; url: string }
                }
                control={control}
                onKeyDown={handleKeyDown}
              />
            );
          }
        })}
      </div>
      <Button
        image="/icons/plus-blue.svg"
        backgroundColor="bg-myBlack-600"
        textColor="text-myWhite-100"
        onClick={makeNewItem}
      >
        {plusButtonText}
      </Button>
    </div>
  );
};

export default DynamicChecklist;
