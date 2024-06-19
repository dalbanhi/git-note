import CheckBoxWithImage from "@/components/interface/CheckBoxWithImage";
import React from "react";

interface StepsToFollowPreviewProps {
  steps: string[] | undefined;
}

const StepsToFollowPreview: React.FC<StepsToFollowPreviewProps> = ({
  steps,
}) => {
  return (
    <div>
      <p className="mb-4 text-p1Bold text-myWhite-100">{"Task Checklist"}</p>
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
