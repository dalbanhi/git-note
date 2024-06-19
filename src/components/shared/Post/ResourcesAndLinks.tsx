import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ResourcesAndLinks as ResourcesAndLinksType } from "~/types";

interface ResourcesAndLinksProps {
  resourcesAndLinks: ResourcesAndLinksType[] | undefined;
}

const ResourcesAndLinks: React.FC<ResourcesAndLinksProps> = ({
  resourcesAndLinks,
}) => {
  return (
    <div className="flex flex-col">
      <h6 className="text-p2Bold">Resources & Links</h6>
      <ul className="list-disc">
        {resourcesAndLinks?.map((resource) => {
          return (
            <li
              key={resource.url}
              className="list-item list-inside space-x-1 text-myWhite-300 hover:text-myWhite-100 "
            >
              <Link
                href={resource.url}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {resource.resource}
              </Link>
              <Image
                src="/icons/external-link.svg"
                alt="external link"
                width={16}
                height={16}
                className="inline-block"
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ResourcesAndLinks;
