import React from "react";
import TechStackImage from "@/components/interface/TechStackImage";

interface TeckStackPreviewProps {
  techStack: string[];
}

const TechStackPreview: React.FC<TeckStackPreviewProps> = ({ techStack }) => {
  return (
    <div>
      <p className="mb-4 text-p1Bold text-myWhite-100">{"Technology Stack"}</p>
      <div className="flex gap-2">
        {techStack.map((item: any) => {
          return <TechStackImage key={item} name={item} />;
        })}
      </div>
    </div>
  );
};

export default TechStackPreview;
