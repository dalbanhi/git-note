import React, { forwardRef } from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  initialValue?: string;
}

const Input: React.FC<InputProps> = (props) => {
  const { label, type, placeholder, register, initialValue } = props;

  function SplitCamelCaseWithAbbreviations(s: string) {
    return s.split(/([A-Z][a-z]+)/).filter(function (e) {
      return e;
    });
  }
  return (
    <div className="flex flex-col gap-2">
      <label className="text-p3Med capitalize text-myWhite-300" htmlFor={label}>
        {SplitCamelCaseWithAbbreviations(label).join(" ")}
      </label>
      <input
        {...register(label)}
        type={type}
        placeholder={placeholder}
        className="truncate rounded-sm border-none bg-myBlack-700 p-2 text-p4Reg text-myWhite-300 outline-none"
        defaultValue={initialValue}
      />
    </div>
  );
};
Input.displayName = "Input";

export default Input;
