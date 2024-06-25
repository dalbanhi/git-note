import { Separator } from "@/components/ui/separator";
import React from "react";
import slugify from "slugify";
import Link from "next/link";

interface OnThisPageProps {
  postContent: string;
}

const OnThisPage: React.FC<OnThisPageProps> = ({ postContent }) => {
  console.log("postContent", postContent);

  const regex = /^#{1,6} (.+)$/gm;
  const headings = postContent.match(regex);
  console.log("headings", headings);
  const slugifyHeadings = headings?.map((heading) => {
    const slug = slugify(heading, { lower: true, strict: true });
    return { heading: heading, slug: slug };
  });

  console.log("slugifyHeadings", slugifyHeadings);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-p2Bold text-myWhite-100">On This Page</h2>
        <Separator className="bg-myBlack-700" />
        {slugifyHeadings &&
          slugifyHeadings.map((heading) => {
            return (
              <Link
                key={heading.slug}
                href={`#${heading.slug}`}
                className="truncate text-myWhite-300 hover:text-myWhite-100"
              >
                {heading.heading}
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default OnThisPage;
