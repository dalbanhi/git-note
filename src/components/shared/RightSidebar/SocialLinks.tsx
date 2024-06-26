"use client";
import Button from "@/components/interface/Button";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import IconLink from "../LeftSidebar/IconLink";
import { usePathname } from "next/navigation";
import { getUserSocialLinks } from "~/lib/actions/users";
import { SocialMediaLink } from "~/types";

interface SocialLinksProps {
  userID: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ userID }) => {
  const pathname = usePathname();

  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>();

  useEffect(() => {
    const getTheLinks = async () => {
      const socialLinks = await getUserSocialLinks(userID);
      setSocialLinks(socialLinks);
    };
    getTheLinks();
  }, [userID]);

  function getIcon(site: string) {
    switch (site) {
      case "twitter":
        return "twitter";
      case "x":
        return "x";
      case "instagram":
        return "instagram";
      case "facebook":
        return "facebook";
      case "linkedin":
        return "linkedin";
      case "github":
        return "github";
      case "generic-web":
        return "generic-web";
      default:
        return "generic-web";
    }
  }

  if (!pathname.includes("profile")) return null;
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
      <Separator className="bg-myBlack-700" />
      <div className="">
        {socialLinks?.map((link, index) => {
          return (
            <IconLink
              key={index}
              href={link.url}
              iconColor="text-myWhite-500"
              iconSrc={`/icons/${getIcon(link.site)}.svg`}
              iconAlt={link.site}
              textColor="text-myWhite-300"
              text={link.username}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinks;
