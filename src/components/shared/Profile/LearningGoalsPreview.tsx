import CheckBoxWithImage from "@/components/interface/CheckBoxWithImage";
import React from "react";

import { LearningGoal } from "~/types";

interface LearningGoalsPreviewProps {
  learningGoals: LearningGoal[];
}

const LearningGoalsPreview: React.FC<LearningGoalsPreviewProps> = ({
  learningGoals,
}) => {
  return (
    <div>
      <p className="mb-4 text-p1Bold text-myWhite-100">{"Learning Goals"}</p>
      <ul>
        {learningGoals.map((item: LearningGoal) => {
          return (
            <CheckBoxWithImage
              text={item.goal}
              key={item.goal}
              initialChecked={item.done}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default LearningGoalsPreview;
