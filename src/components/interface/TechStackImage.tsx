import React from "react";
import Image from "next/image";

import { TechStackOptionsWithIcons } from "~/constants";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TechStackImageProps {
  name: string;
}

const TechStackImage: React.FC<TechStackImageProps> = ({ name }) => {
  const techStackIcon = TechStackOptionsWithIcons.find(
    (option) => option.name === name
  );
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Image
            src={
              techStackIcon?.iconSrc
                ? techStackIcon.iconSrc
                : "tech-stack-icons/generic.svg"
            }
            alt={name}
            width={24}
            height={24}
          />
        </TooltipTrigger>
        <TooltipContent className="border-0 bg-myBlack-700 text-myWhite-300">
          {name}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TechStackImage;
