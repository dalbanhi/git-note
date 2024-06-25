import React from "react";
import Link from "next/link";

interface HeadingAnchorProps {
  id: string;
}

const HeadingAnchor: React.FC<HeadingAnchorProps> = ({ id }) => {
  return (
    <Link id={id} className="heading-anchor" href={`#${id}`}>
      #{" "}
    </Link>
  );
};

export default HeadingAnchor;
