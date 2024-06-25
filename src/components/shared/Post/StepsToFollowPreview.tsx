import CheckBoxWithImage from "@/components/interface/CheckBoxWithImage";
import React from "react";
import HeadingAnchor from "./HeadingAnchor";

interface StepsToFollowPreviewProps {
  steps: string[] | undefined;
}

const StepsToFollowPreview: React.FC<StepsToFollowPreviewProps> = ({
  steps,
}) => {
  return (
    <div>
      <h6 className="mb-4 text-p1Bold text-myWhite-100">
        <HeadingAnchor id="steps-to-follow" />
        {"Task Checklist"}
      </h6>
      <ul>
        {steps?.map((item: string) => {
          return (
            <CheckBoxWithImage
              text={item}
              key={item}
              initialChecked={false}
              isClientSideOnly={true}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default StepsToFollowPreview;
