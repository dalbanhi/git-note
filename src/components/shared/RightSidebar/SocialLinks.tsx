"use client";
import Button from "@/components/interface/Button";
import Image from "next/image";
import React from "react";
import IconLink from "../LeftSidebar/IconLink";
import { usePathname } from "next/navigation";

const SocialLinks = () => {
  const pathname = usePathname();
  if (!pathname.includes("profile")) return null;
  const socialLinks = [
    {
      title: "LinkedIn",
      icon: "icons/github.svg",
      link: "https://www.linkedin.com/in/username",
    },
    {
      title: "GitHub",
      icon: "icons/github.svg",
      link: "https://www.linkedin.com/in/username",
    },
  ];
  return (
    <div className="flex flex-col justify-center gap-4">
      <Button
        image="/icons/plus-blue.svg"
        backgroundColor="bg-myBlack-600 w-full"
        textColor="text-myWhite-100"
        onClick={() => {}}
      >
        Update social link
      </Button>
      <p className="text-p3Bold">Social Media Links</p>
      <hr className="mb-4 border-dashed border-myWhite-500"></hr>
      <div className="">
        {socialLinks.map((link, index) => {
          return (
            <IconLink
              key={index}
              href={link.link}
              iconColor="text-myWhite-500"
              iconSrc={link.icon}
              iconAlt={link.title}
              textColor="text-myWhite-300"
              text={link.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
