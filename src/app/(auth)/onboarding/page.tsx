import React from "react";
import ProgressStepBar from "~/components/shared/Form/Onboarding/ProgressStepBar";
import OnboardingForm from "~/components/shared/Form/Onboarding/OnboardingForm";

const Onboarding = ({ searchParams }: any) => {
  console.log(searchParams);
  const steps = [
    "Basic Information",
    "Add your learning goals",
    "Add your knowledge level",
    "Schedule & Availability",
  ];
  return (
    <div className=" mx-auto bg-myBlack-800 p-8 lg:w-3/4">
      <ProgressStepBar steps={steps} currentStep={searchParams?.step} />
      <h2 className="mt-4 text-display2 text-myWhite-100">
        {steps[searchParams?.step - 1]}
      </h2>
      <OnboardingForm step={searchParams?.step} />
    </div>
  );
};

export default Onboarding;
