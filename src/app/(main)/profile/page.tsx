import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import { getSession } from "~/auth/auth";
import { getUser } from "~/lib/actions/users";
import InfoLink from "@/components/shared/Profile/InfoLink";
import Button from "@/components/interface/Button";
import Link from "next/link";

const ContributionsTracker = dynamic(
  () => import("@/components/shared/Home/ContributionsTracker"),
  { ssr: false, loading: () => <p>Loading Contributions...</p> }
);

const MyProfile = async () => {
  const session = await getSession();
  console.log(session);
  const userAvatar = session?.user?.image as string;
  const userImageURL = session?.image as string;

  const userFromDB = await getUser();
  console.log(userFromDB);

  //todo: get user created at date
  const userCreatedAt = new Date().toDateString();

  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start p-4">
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
            <h1 className="text-display2">{session?.user.name}</h1>
            <div className="flex flex-wrap gap-2">
              <InfoLink iconSrc="icons/link.svg" iconAlt="Link">
                jsmastery.pro
              </InfoLink>
              <InfoLink iconSrc="icons/map-pin.svg" iconAlt="Location">
                Lagos, Nigeria
              </InfoLink>
              <InfoLink iconSrc="icons/calendar.svg" iconAlt="Calendar">
                Joined on May 2024
              </InfoLink>
            </div>
          </div>
        </div>
        <Link className="shrink-0" href="/profile/edit">
          <Button
            image="icons/edit.svg"
            backgroundColor="bg-myBlack-700"
            textColor="text-primary-500"
            // onClick={() => console.log("Edit Profile")}
          >
            Edit Profile
          </Button>
        </Link>
        {/* onClick?: (e: any) => void;
  image?: string;
  backgroundColor?: string;
  textColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean; */}
      </div>
      <p className="mb-4 text-p1Reg text-myWhite-300">{"Contributions Grid"}</p>
      <ContributionsTracker />
    </section>
  );
};

export default MyProfile;
