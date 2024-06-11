import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import { getSession } from "~/auth/auth";
import { getUser } from "~/lib/actions/users";
import InfoLink from "@/components/shared/Profile/InfoLink";
import Button from "@/components/interface/Button";
import Link from "next/link";
import { format } from "date-fns";
import { redirect } from "next/navigation";

const ContributionsTracker = dynamic(
  () => import("@/components/shared/ContributionsTracker"),
  { ssr: false, loading: () => <p>Loading Contributions...</p> }
);

const MyProfile = async () => {
  const session = await getSession();
  console.log(session);
  if (!session) {
    redirect("/sign-in");
  }
  const userAvatar = session?.user?.image as string;
  const userImageURL = session?.image as string;

  const userFromDB = await getUser();
  console.log(userFromDB);

  const createdAt = userFromDB?.createdAt;
  const formattedDate = format(new Date(createdAt), "MMMM yyyy");

  const portfolio = userFromDB?.portfolio;
  const location = userFromDB?.location;
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
                Joined on {formattedDate}
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
      <div className="mt-4 flex flex-col gap-4">
        <div>
          <p className="mb-4 text-p1Bold text-myWhite-100">
            {"Contribution Grid"}
          </p>
          <ContributionsTracker />
        </div>
        <div>
          <p className="mb-4 text-p1Bold text-myWhite-100">
            {"Learning Goals"}
          </p>
        </div>
        <div>
          <p className="mb-4 text-p1Bold text-myWhite-100">
            {"Technology Stack"}
          </p>
        </div>
        <div>
          <p className="mb-4 text-p1Bold text-myWhite-100">
            {"Knowledge level"}
          </p>
        </div>
        <div>
          <p className="mb-4 text-p1Bold text-myWhite-100">
            {"Schedule & availability"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MyProfile;
