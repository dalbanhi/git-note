import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  UseFormRegister,
  FieldValues,
  Controller,
  Control,
} from "react-hook-form";

interface SocialLinkInputProps {
  siteName: string;
  register: UseFormRegister<any>;
  control: Control<any>;
  index: number;
}

const SocialLinkInput: React.FC<SocialLinkInputProps> = ({
  register,
  control,
  index,
  siteName,
}) => {
  return (
    <div className="flex w-full gap-2">
      <Image
        src={`/icons/${siteName}.svg`}
        alt={siteName}
        width={24}
        height={24}
      />
      <Input
        {...register(`socialLinks.${index}.username`)}
        className="w-full bg-myBlack-700 text-myWhite-300"
        placeholder={`Username`}
      />
      <Input
        {...register(`socialLinks.${index}.url`)}
        className="w-full bg-myBlack-700 text-myWhite-300"
        placeholder={`Social Link`}
      />
      <input
        type="hidden"
        {...register(`socialLinks.${index}.site`)}
        value={siteName}
      />
    </div>
  );
};

export default SocialLinkInput;
