import React from "react";
import Image from "next/image";
import Link from "next/link";

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
    <div className="mb-4 flex flex-col gap-3">
      <h2 className="text-caption uppercase text-myWhite-500">Quick Links</h2>
      <div>
        {quickLinks.map((link, index) => {
          return (
            <Link
              key={index}
              className="flex w-full gap-2 text-myWhite-300"
              href={link.link}
            >
              <Image
                src={link.icon}
                alt={link.title}
                width={12}
                height={12}
              ></Image>
              <span className={`text-p3Med`}>{link.title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickLinks;
