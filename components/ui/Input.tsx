import React from "react";

interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-p3Med capitalize text-myWhite-300" htmlFor={name}>
        {name}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="rounded-sm bg-myBlack-700 p-2 text-p4Reg text-myWhite-300 outline-none"
      />
    </div>
  );
};

export default Input;
