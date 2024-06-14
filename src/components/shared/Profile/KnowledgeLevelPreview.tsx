import React from "react";
import ListItemWithImage from "@/components/interface/ListItemWithImage";

interface KnowledgeLevelPreviewProps {
  knowledgeLevels: string[];
}

const KnowledgeLevelPreview: React.FC<KnowledgeLevelPreviewProps> = ({
  knowledgeLevels,
}) => {
  return (
    <div>
      <p className="mb-4 text-p1Bold text-myWhite-100">{"Knowledge level"}</p>
      <ul>
        {knowledgeLevels.map((item: string) => {
          return (
            <ListItemWithImage
              imgSrc="icons/check-square.svg"
              imgAlt="Checkmark"
              key={item}
            >
              {item}
            </ListItemWithImage>
          );
        })}
      </ul>
    </div>
  );
};

export default KnowledgeLevelPreview;
