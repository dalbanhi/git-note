import React from "react";
import Image from "next/image";

interface ButtonProps {
  onClick: () => void;
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
      className={`${backgroundColor ? backgroundColor : "bg-myBlack-700"} rounded-sm p-2 text-p4Med capitalize ${textColor ? textColor : "text-myWhite-100"}`}
    >
      {image && <Image src={image} alt={text} width={12} height={12}></Image>}
      {text}
    </button>
  );
};

export default Button;
