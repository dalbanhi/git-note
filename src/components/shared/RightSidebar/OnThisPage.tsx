import { Separator } from "@/components/ui/separator";
import React from "react";
import slugify from "slugify";
import Link from "next/link";

interface OnThisPageProps {
  postContent: string;
  postType?: string;
}

const OnThisPage: React.FC<OnThisPageProps> = ({ postContent, postType }) => {
  const postSpecialAnchor =
    postType === "knowledge"
      ? "Key Takeaways"
      : postType === "component"
        ? "Code Block"
        : "Steps to Follow";

  const specialSlug = slugify(postSpecialAnchor, { lower: true, strict: true });
  const resourcesAndLinks = "Resources & Links";
  const resourceSlug = slugify(resourcesAndLinks, {
    lower: true,
    strict: true,
  });

  const regex = /^#{1,6} (.+)$/gm;
  let match: RegExpExecArray | null;
  const headings: string[] = [];
  while ((match = regex.exec(postContent)) !== null) {
    headings.push(match[1]);
  }
  const slugifyHeadings = headings?.map((heading) => {
    const slug = slugify(heading, { lower: true, strict: true });
    return { heading: heading, slug: slug };
  });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-p2Bold text-myWhite-100">On This Page</h2>
        <Separator className="bg-myBlack-700" />
        <Link
          key={specialSlug + " anchor"}
          href={`#${specialSlug}`}
          className="truncate text-myWhite-300 hover:text-myWhite-100"
        >
          {postSpecialAnchor}
        </Link>
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
        <Link
          key={resourceSlug + " anchor"}
          href={`#${resourceSlug}`}
          className="truncate text-myWhite-300 hover:text-myWhite-100"
        >
          {resourcesAndLinks}
        </Link>
      </div>
    </div>
  );
};

export default OnThisPage;
