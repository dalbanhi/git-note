import React from "react";
import Image from "next/image";

const LeftSidebar = () => {
  return (
    <aside className="flex min-h-screen flex-col gap-2 border-r border-myWhite-300 bg-myBlack-800 px-2 py-4">
      <div className="mb-4 flex gap-2">
        <Image
          src="/gitnote-icon.svg"
          alt="GitNote"
          width={20}
          height={20}
        ></Image>
        <h1 className="text-h1Md text-myWhite-100 ">GitNote</h1>
      </div>
      <div className="flex flex-col gap-2">
        <button className="flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-primary-gradientStart to-primary-gradientEnd p-2 text-p4Med">
          <Image
            src="/plus-icon.svg"
            alt="Create Note"
            width={12}
            height={12}
          ></Image>
          Create Post
        </button>
        <div className="flex items-center justify-center rounded-lg bg-myBlack-700 px-2 text-p4Med text-myWhite-500">
          <button>
            <Image
              src="/search-icon.svg"
              alt="Search"
              width={12}
              height={12}
            ></Image>
          </button>
          <input
            type="text"
            className="rounded-lg bg-myBlack-700 p-2 text-p4Med text-myWhite-500"
            placeholder="Search..."
          ></input>
          <button className="flex items-center justify-center text-myWhite-300">
            <Image
              src="/command-icon.svg"
              alt="Command"
              width={12}
              height={12}
            ></Image>
            {`K`}
          </button>
        </div>
      </div>
      <hr className="border-myWhite-300"></hr>
    </aside>
  );
};

export default LeftSidebar;
