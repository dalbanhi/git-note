import React, { PropsWithChildren } from "react";
import Image from "next/image";

interface ButtonProps extends PropsWithChildren<{}> {
  onClick?: (e: any) => void;
  image?: string;
  backgroundColor?: string;
  textColor?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  image,
  onClick,
  backgroundColor,
  textColor,
  children,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${backgroundColor ? backgroundColor : "bg-myBlack-700"} flex items-center justify-center gap-2 rounded-sm p-2 text-p4Med  ${textColor ? textColor : "text-myWhite-100 "}`}
    >
      {image && <Image src={image} alt={image} width={15} height={15}></Image>}
      {children}
    </button>
  );
};

export default Button;
