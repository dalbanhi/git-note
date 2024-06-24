import React from "react";
import ProfileLink from "./ProfileLink";
import TagsList from "./TagsList";
import SocialLinks from "./SocialLinks";
import { getAllUserTags } from "~/lib/actions/posts";
import { getSession } from "~/auth/auth";

const RightSidebar = async () => {
  const session = await getSession();
  if (!session) return null;
  const tags = await getAllUserTags(session.user.id);
  const tagsString = JSON.stringify(tags);
  return (
    <aside className="flex min-h-screen w-3/12 flex-col gap-2 bg-myBlack-800 p-4">
      <ProfileLink />

      <TagsList tags={tagsString} />
      <SocialLinks />
    </aside>
  );
};

export default RightSidebar;
