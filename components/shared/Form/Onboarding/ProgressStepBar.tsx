import React from "react";

interface ProgressStepBarProps {
  steps: string[];
  currentStep: number;
}

const ProgressStepBar: React.FC<ProgressStepBarProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => {
        const shouldBeActive = index < currentStep;
        return (
          <React.Fragment key={step}>
            <div
              className={`flex size-8 items-center justify-center rounded-sm ${shouldBeActive ? "bg-primary-500" : "bg-myBlack-600"}`}
            >
              <div className="size-2 rounded-lg bg-myBlack-700"></div>
            </div>
            {index !== steps.length - 1 && (
              // if not the last step, add a line
              <div
                key={step + "line"}
                className={`h-0.5 w-20 ${
                  shouldBeActive ? "bg-primary-500" : "bg-myBlack-600"
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default ProgressStepBar;
