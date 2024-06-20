import React from "react";
import IconLink from "./IconLink";
import { Note } from "~/types";
import { getPostTypePropValues } from "~/lib/helpers/postTypePropValues";

interface PostQuickViewProps {
  post: Note;
  isActive: boolean;
}

const PostQuickView: React.FC<PostQuickViewProps> = ({ post, isActive }) => {
  const { type, title, _id } = post;

  const { backgroundColor, icon } = getPostTypePropValues(type);

  let textColor = isActive ? "text-primary-500" : "text-myWhite-300";

  return (
    <IconLink
      href={`/note/${_id}`}
      iconColor={backgroundColor}
      iconSrc={icon}
      iconAlt={type}
      textColor={textColor}
      text={title}
    />
  );
};

export default PostQuickView;
