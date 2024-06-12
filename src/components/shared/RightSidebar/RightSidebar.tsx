// "use client";

// import { usePathname } from "next/navigation";
import React from "react";
import ProfileLink from "./ProfileLink";
import TagsList from "./TagsList";
import SocialLinks from "./SocialLinks";
import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";

const RightSidebar = () => {
  // const pathname = usePathname();
  // const router = useRouter();
  // const pathname = router.pathname;
  return (
    <aside className="flex min-h-screen w-3/12 flex-col gap-2 bg-myBlack-800 p-4">
      <ProfileLink />
      {/* {!pathname.includes("profile") ? <TagsList /> : <SocialLinks />} */}
      {/* <TagsList /> */}
      <TagsList />
      <SocialLinks />
    </aside>
  );
};

export default RightSidebar;
