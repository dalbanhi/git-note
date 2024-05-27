import React from "react";
import Image from "next/image";

interface ButtonProps {
  onClick: (e: any) => void;
  image?: string;
  text: string;
  backgroundColor?: string;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  image,
  text,
  onClick,
  backgroundColor,
  textColor,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${backgroundColor ? backgroundColor : "bg-myBlack-700"} flex items-center justify-center gap-2 rounded-sm p-2 text-p4Med  ${textColor ? textColor : "text-myWhite-100 "}`}
    >
      {image && <Image src={image} alt={text} width={15} height={15}></Image>}
      <span>{text}</span>
    </button>
  );
};

export default Button;
