"use client";
import Button from "@/components/interface/Button";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import IconLink from "../LeftSidebar/IconLink";
import { usePathname } from "next/navigation";
import { getUserSocialLinks } from "~/lib/actions/users";
import { SocialMediaLink } from "~/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserFormSchema } from "~/lib/validators/user.schema";
import SocialLinkInput from "./SocialLinkInput";

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

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UserFormSchema),
  });

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

  const sites = [
    "twitter",
    "instagram",
    "facebook",
    "linkedin",
    "github",
    "generic-web",
  ];

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (!pathname.includes("profile")) return null;
  return (
    <div className="flex flex-col justify-center gap-4">
      <Button
        image="/icons/plus-blue.svg"
        backgroundColor="bg-myBlack-600 w-full"
        textColor="text-myWhite-100"
        onClick={() => {
          setIsDialogOpen(true);
        }}
      >
        Update social links
      </Button>
      <p className="text-p3Bold">Social Media Links</p>
      <Separator className="bg-myBlack-700" />
      <div className="flex flex-col">
        {socialLinks?.length === 0 && (
          <p className="text-p4Reg text-myWhite-300">No social links added</p>
        )}
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-myBlack-700">
          <DialogHeader>
            <DialogTitle className="text-display1">
              Social Media Links
            </DialogTitle>
          </DialogHeader>
          <form>
            {sites.map((site, index) => {
              return (
                <SocialLinkInput
                  key={`site-${site}-${index}`}
                  siteName={site}
                  register={register}
                  control={control}
                  index={index}
                />
              );
            })}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialLinks;
