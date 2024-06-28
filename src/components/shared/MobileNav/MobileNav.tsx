import React from "react";
import Image from "next/image";
import Link from "next/link";

const MobileNav = () => {
  return (
    <nav className="flex justify-between bg-myBlack-800 px-3 max-sm:w-full md:w-1/2">
      <Link className="mb-6 mt-4 flex gap-2" href={"/"}>
        <Image
          src="/icons/gitnote.svg"
          alt="GitNote"
          width={20}
          height={20}
        ></Image>
        <h1 className="text-h1Md text-myWhite-100 ">GitNote</h1>
      </Link>
      <Image src="/icons/burger.svg" alt="Menu" width={20} height={20}></Image>
    </nav>
  );
};

export default MobileNav;
