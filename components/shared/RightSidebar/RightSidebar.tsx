import React from "react";
import ProfileLink from "./ProfileLink";
import TagsList from "./TagsList";

const RightSidebar = () => {
  return (
    <aside className="flex min-h-screen w-3/12 flex-col gap-2 bg-myBlack-800 p-4">
      <ProfileLink />
      <TagsList />
    </aside>
  );
};

export default RightSidebar;
