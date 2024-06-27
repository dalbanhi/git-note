"use client";
import Button from "@/components/interface/Button";
import { Separator } from "@/components/ui/separator";
import React, { useEffect, useState } from "react";
import IconLink from "../LeftSidebar/IconLink";
import { usePathname } from "next/navigation";
import { getUserSocialLinks } from "~/lib/actions/users";
import { SocialMediaLink } from "~/types";
import { toast, Flip } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SocialLinksSchema } from "~/lib/validators/socialLinks.schema";
import SocialLinkInput from "./SocialLinkInput";
import { updateUserSocialLinks } from "~/lib/actions/users";

interface SocialLinksProps {
  userID: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({ userID }) => {
  const pathname = usePathname();

  const [socialLinks, setSocialLinks] = useState<SocialMediaLink[]>();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(SocialLinksSchema),
    defaultValues: {
      socialLinks: socialLinks,
    },
  });

  useEffect(() => {
    const getTheLinks = async () => {
      const socialLinks = await getUserSocialLinks(userID);
      console.log("getting the social links");
      console.log(socialLinks);
      setSocialLinks(socialLinks);
      reset({
        socialLinks: socialLinks.map((link: any) => {
          return { url: link.url, site: link.site, username: link.username };
        }),
      });
    };
    getTheLinks();
  }, [userID, reset]);

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
      case "website":
        return "website";
      default:
        return "website";
    }
  }

  const sites = [
    "twitter",
    "instagram",
    "facebook",
    "linkedin",
    "github",
    "website",
  ];

  const form = watch();

  useEffect(() => {
    console.log(form);
  }, [form]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: any) => {
    console.log("SUBMITTING THE DATA");
    console.log(data);
    const updatedLinks = await updateUserSocialLinks(data);
    setIsDialogOpen(false);
    setSocialLinks(updatedLinks);
  };

  const showError = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      progress: 0,
      transition: Flip,
    });
  };

  useEffect(() => {
    const handleSingleFieldError = (prependingString: string, error: any) => {
      let errorMsg = "";
      if (error) {
        errorMsg = `${prependingString} Error: ${error.message}`;
        showError(errorMsg);
      }
    };

    const handleFieldArrayError = (prependingString: string, error: any) => {
      let errorMsg = "";
      if (!error) return;
      if (Array.isArray(error)) {
        for (let err of error) {
          for (let key in err) {
            errorMsg += `${prependingString} Error: ${err[key].message} `;
            break;
          }
          if (errorMsg !== "") {
            break;
          }
        }
      } else {
        errorMsg = `${prependingString} Error: ${error.message}`;
      }
      showError(errorMsg);
    };
    console.log("Error on form input", errors);
    if (Object.keys(errors).length !== 0) {
      if (errors.socialLinks) {
        handleFieldArrayError("Social Links", errors.socialLinks);
      }
    }
  }, [errors]);

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
          if (!link.url) return null;

          return (
            <IconLink
              key={index}
              href={link.url}
              iconColor="text-myWhite-500"
              iconSrc={`/icons/${getIcon(link.site)}.svg`}
              iconAlt={link.site}
              textColor="text-myWhite-300"
              text={link.username ? link.username : `Link`}
            />
          );
        })}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-myBlack-800">
          <DialogHeader>
            <DialogTitle className="text-display1">
              Social Media Links
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
            <button
              className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary-500 p-2  text-p4Med text-myBlack-900`}
              type="submit"
            >
              Update Social Links
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialLinks;
