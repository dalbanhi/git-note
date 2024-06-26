import React from "react";
import Image from "next/image";
import Input from "@/components/interface/Input";
import {
  UseFormRegister,
  FieldValues,
  Controller,
  Control,
} from "react-hook-form";

interface SocialLinkInputProps {
  siteName: string;
  register: UseFormRegister<any>;
  control: Control<FieldValues>;
  index: number;
}

const SocialLinkInput: React.FC<SocialLinkInputProps> = ({
  register,
  control,
  index,
  siteName,
}) => {
  return (
    <div className="flex w-full">
      <Image
        src={`/icons/${siteName}.svg`}
        alt={siteName}
        width={12}
        height={12}
      />
      <Input
        label="Username"
        type="text"
        placeholder="Username"
        register={register}
      />
      <Input
        label="Social Link"
        type="text"
        placeholder="Username"
        register={register}
      />
    </div>
  );
};

export default SocialLinkInput;
