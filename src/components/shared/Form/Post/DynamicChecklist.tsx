import Button from "@/components/interface/Button";
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
  placeholderText: string;
}

const DynamicChecklist: React.FC<DynamicChecklistProps> = ({
  register,
  control,
  fieldStringLabel,
  fieldArrayName,
  placeholderText,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: fieldArrayName,
  });
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-p3Med text-myWhite-300">{fieldStringLabel}</h3>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => {
          return (
            <DeletableListItem
              key={field.id}
              onDelete={() => remove(index)}
              checkable={false}
              register={register}
              fieldArrayName={fieldArrayName}
              placeholderText={placeholderText}
              control={control}
              index={index}
              imageSrc="/icons/check-square/blue.svg"
              imageAlt="Checkmark"
            />
          );
        })}
      </div>
      <Button
        image="/icons/plus-blue.svg"
        backgroundColor="bg-myBlack-600"
        textColor="text-myWhite-100"
        onClick={() => {
          append({ value: "" });
        }}
      >
        Add checkmark
      </Button>
    </div>
  );
};

export default DynamicChecklist;
