import React, { PropsWithChildren } from "react";
import Image from "next/image";

interface ButtonProps extends PropsWithChildren<{}> {
  onClick?: (e: any) => void;
  image?: string;
  backgroundColor?: string;
  textColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  image,
  onClick,
  backgroundColor,
  textColor,
  children,
  type = "button",
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${backgroundColor ? backgroundColor : "bg-myBlack-700"} flex items-center justify-center gap-2 rounded-sm p-2 text-p4Med disabled:bg-myWhite-500/50  ${textColor ? textColor : "text-myWhite-100 "}`}
      disabled={disabled}
    >
      {image && <Image src={image} alt={image} width={15} height={15}></Image>}
      {children}
    </button>
  );
};

export default Button;
