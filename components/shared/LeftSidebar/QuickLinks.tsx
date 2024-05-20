import React from "react";
import Image from "next/image";
import Link from "next/link";
import IconLink from "./IconLink";

const QuickLinks = () => {
  const quickLinks = [
    {
      icon: "jsm-icon.svg",
      title: "JSM Courses",
      link: "https://courses.jsmastery.pro",
    },
    {
      icon: "github-icon.svg",
      title: "GitHub Organization",
      link: "https://github.com",
    },
  ];

  return (
    <div className="mb-4 flex grow flex-col gap-3">
      <h2 className="text-caption uppercase text-myWhite-500">Quick Links</h2>
      <div className="flex grow flex-col justify-between">
        <div className="">
          {quickLinks.map((link, index) => {
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
        <IconLink
          href="/sign-in"
          iconColor="text-myWhite-500"
          iconSrc="logout-icon.svg"
          iconAlt="Logout"
          textColor="text-myWhite-300"
          text="Logout"
        />
      </div>
    </div>
  );
};

export default QuickLinks;
