import dynamic from "next/dynamic";
import React from "react";
import Image from "next/image";
import { getSession } from "~/auth/auth";
const ContributionsTracker = dynamic(
  () => import("@/components/shared/Home/ContributionsTracker"),
  { ssr: false, loading: () => <p>Loading Contributions...</p> }
);

const MyProfile = async () => {
  const session = await getSession();
  console.log(session);
  const userAvatar = session?.user?.image as string;

  return (
    <section className="flex min-h-screen w-6/12 flex-col justify-start p-4">
      <div className="flex ">
        <div>
          <Image
            src={userAvatar ? userAvatar : "/icons/default-image.svg"}
            alt="Profile"
            width={40}
            height={40}
            className="rounded-sm"
          ></Image>
        </div>
      </div>
      <p className="mb-4 text-p1Reg text-myWhite-300">{"Contributions Grid"}</p>
      <ContributionsTracker />
    </section>
  );
};

export default MyProfile;
