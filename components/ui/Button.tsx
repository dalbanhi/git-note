import React from "react";
import Image from "next/image";

interface ButtonProps {
  onClick: () => void; // This is the type of the function that will be passed in
  image: string;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ image, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-myBlack-700 p-2 text-p4Med capitalize text-myWhite-100"
    >
      {image !== "" && (
        <Image src={image} alt={text} width={12} height={12}></Image>
      )}
      {text}
    </button>
  );
};

export default Button;
