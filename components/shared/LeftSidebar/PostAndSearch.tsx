import React from "react";
import Image from "next/image";

const PostAndSearch = () => {
  return (
    <div className="mb-4 flex flex-col gap-3">
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
  );
};

export default PostAndSearch;
