import React from "react";
import Image from "next/image";
import { getSession } from "~/auth/auth";
import Link from "next/link";

const ProfileLink = async () => {
  const session = await getSession();
  const userName = session?.user?.name as string;
  const userEmail = session?.user?.email as string;
  const userAvatar = session?.user?.image as string;
  const userImageURL = session?.image as string;

  return (
    <Link href="/profile" className="mb-6 mt-4 flex gap-3">
      <Image
        src={
          userImageURL
            ? userImageURL
            : userAvatar
              ? userAvatar
              : "/icons/default-image.svg"
        }
        alt="Profile"
        width={40}
        height={40}
        className="size-10 rounded-sm"
      />
      <div className="flex w-full flex-col ">
        <h2 className="w-full text-p3Med text-myWhite-100">{userName}</h2>
        <p className="w-full truncate text-p3Reg text-myWhite-300 ">
          {userEmail}
        </p>
      </div>
    </Link>
  );
};

export default ProfileLink;
