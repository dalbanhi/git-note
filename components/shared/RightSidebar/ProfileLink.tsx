import React from "react";
import Image from "next/image";

const ProfileLink = () => {
  const testUser = {
    name: "Nikky Eya",
    email: "nikky@jsmastery.pro",
    avatar: "/test-avatar.svg",
  };

  return (
    <div className="mb-6 mt-4 flex gap-3">
      <Image
        src={testUser.avatar}
        alt="Profile"
        width={40}
        height={40}
        className="rounded-sm"
      ></Image>
      <div className="flex flex-col">
        <h2 className="text-p3Med text-myWhite-100">{testUser.name}</h2>
        <p className="text-p3Reg text-myWhite-300">{testUser.email}</p>
      </div>
    </div>
  );
};

export default ProfileLink;
