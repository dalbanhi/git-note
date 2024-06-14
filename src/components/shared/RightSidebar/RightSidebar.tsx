import React from "react";
import ProfileLink from "./ProfileLink";
import TagsList from "./TagsList";
import SocialLinks from "./SocialLinks";

const RightSidebar = () => {
  return (
    <aside className="flex min-h-screen w-3/12 flex-col gap-2 bg-myBlack-800 p-4">
      <ProfileLink />

      <TagsList />
      <SocialLinks />
    </aside>
  );
};

export default RightSidebar;
