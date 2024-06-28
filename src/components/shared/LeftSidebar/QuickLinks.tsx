"use client";
import React from "react";
import IconLink from "./IconLink";
import { signOut } from "next-auth/react";

const QuickLinks = () => {
  const quickLinks = [
    {
      icon: "/icons/jsm.svg",
      title: "JSM Courses",
      link: "https://courses.jsmastery.pro",
    },
    {
      icon: "/icons/github.svg",
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
          iconColor="text-myWhite-500"
          iconSrc="/icons/logout.svg"
          iconAlt="Logout"
          textColor="text-myWhite-300"
          text="Logout"
          onClick={() => signOut()}
        />
      </div>
    </div>
  );
};

export default QuickLinks;
