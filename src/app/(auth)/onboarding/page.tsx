import React from "react";
import ProgressStepBar from "@/components/shared/Form/Onboarding/ProgressStepBar";
import OnboardingForm from "@/components/shared/Form/Onboarding/OnboardingForm";
import { getSession } from "~/auth/auth";
import { redirect } from "next/navigation";

const Onboarding = async ({ searchParams }: any) => {
  const session = await getSession();

  if (session?.hasOnboarded) {
    redirect("/");
  }

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
      <OnboardingForm session={session} step={searchParams?.step} />
    </div>
  );
};

export default Onboarding;
