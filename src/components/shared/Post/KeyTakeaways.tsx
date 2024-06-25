import React from "react";
import ListItemWithImage from "@/components/interface/ListItemWithImage";
import HeadingAnchor from "./HeadingAnchor";

interface KeyTakeawaysPreviewProps {
  keyTakeaways: string[] | undefined;
}

const KeyTakeawaysPreview: React.FC<KeyTakeawaysPreviewProps> = ({
  keyTakeaways,
}) => {
  return (
    <div>
      <h6 className="mb-4 text-p1Bold text-myWhite-100">
        <HeadingAnchor id="key-takeaways" />
        Key Takeaways
      </h6>
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
