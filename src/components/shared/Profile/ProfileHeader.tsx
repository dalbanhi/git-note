import React from "react";
import Image from "next/image";
import Link from "next/link";
import InfoLink from "./InfoLink";
import Button from "@/components/interface/Button";

interface ProfileHeaderProps {
  userImageURL?: string;
  userAvatar?: string;
  formattedCreatedAtDate: string;
  portfolio: string;
  location: string;
  name: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  userImageURL,
  userAvatar,
  name,
  portfolio,
  location,
  formattedCreatedAtDate,
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-2">
        <div className="shrink-0">
          <Image
            src={
              userImageURL
                ? userImageURL
                : userAvatar
                  ? userAvatar
                  : "/icons/default-image.svg"
            }
            alt="Profile"
            width={50}
            height={50}
            objectFit="cover"
            className="rounded-sm"
          />
        </div>
        <div className="flex shrink flex-col">
          <h1 className="text-display2">{name}</h1>
          <div className="flex flex-wrap gap-2">
            <InfoLink
              iconSrc="icons/link.svg"
              href={portfolio ? portfolio : "profile/update"}
              iconAlt="Link"
            >
              {portfolio ? portfolio : "Add Portfolio"}
            </InfoLink>
            <InfoLink
              href={location ? `` : "/profile/update"}
              iconSrc="icons/map-pin.svg"
              iconAlt="Location"
            >
              {location ? location : "Add Location"}
            </InfoLink>
            <InfoLink iconSrc="icons/calendar.svg" iconAlt="Calendar">
              Joined on {formattedCreatedAtDate}
            </InfoLink>
          </div>
        </div>
      </div>
      <Link className="shrink-0" href="/profile/update">
        <Button
          image="icons/edit.svg"
          backgroundColor="bg-myBlack-700"
          textColor="text-primary-500"
        >
          Edit Profile
        </Button>
      </Link>
    </div>
  );
};

export default ProfileHeader;
