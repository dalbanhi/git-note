import React from "react";
import ListItemWithImage from "@/components/interface/ListItemWithImage";

interface KeyTakeawaysPreviewProps {
  keyTakeaways: string[] | undefined;
}

const KeyTakeawaysPreview: React.FC<KeyTakeawaysPreviewProps> = ({
  keyTakeaways,
}) => {
  return (
    <div>
      <p className="mb-4 text-p1Bold text-myWhite-100">{"Key Takeaways"}</p>
      <ul>
        {keyTakeaways?.map((item: string) => {
          return (
            <ListItemWithImage
              imgSrc="/icons/check-square/green.svg"
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

export default KeyTakeawaysPreview;
