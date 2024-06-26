"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingFormSchema } from "~/lib/validators/onboarding.schema";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import Button from "@/components/interface/Button";
import {
  handleFieldArrayError,
  handleSingleFieldError,
} from "@/components/shared/utils/FormErrorHandlers";
import { updateUser } from "~/lib/actions/users";
import { Step1, Step2, Step3, Step4 } from "./Steps/Steps";

interface OnboardingFormProps {
  step: number;
  session: Session | null;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ step, session }) => {
  step = Number(step);
  const [nextButtonDisabled, setNextButtonDisabled] = React.useState(false);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      image: "",
      name: session?.user?.name,
      portfolio: "",
      location: "",
      learningGoals: [],
      knowledgeLevels: [],
      techStack: [],
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length !== 0) {
      handleSingleFieldError("Name", errors.name);
      if (errors.portfolio) {
        handleSingleFieldError("Portfolio", errors.portfolio);
      }
      handleFieldArrayError("Learning Goals", errors.learningGoals);
      handleFieldArrayError("Knowledge Levels", errors.knowledgeLevels);
    }
  }, [errors]);

  const onSubmit = async (data: any) => {
    await updateUser(data);
    router.push("/");
  };
  const onNext = (event: React.FormEvent) => {
    if (step === 4) {
      event.preventDefault();
    } else {
      router.push(`/onboarding?step=${step + 1}`);
    }
  };
  const stepComponents = {
    1: (
      <Step1
        register={register}
        control={control}
        session={session}
        setNextButtonDisabled={setNextButtonDisabled}
      />
    ),
    2: <Step2 register={register} control={control} session={session} />,
    3: <Step3 register={register} control={control} session={session} />,
    4: <Step4 register={register} control={control} session={session} />,
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex flex-col gap-4"
    >
      {stepComponents[step as keyof typeof stepComponents]}

      {step < 4 ? (
        <Button
          onClick={onNext}
          key={step}
          backgroundColor="bg-primary-500"
          textColor="bg-myBlack-500"
          disabled={nextButtonDisabled}
        >
          Next
        </Button>
      ) : (
        <button
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary-500 p-2  text-p4Med text-myBlack-900`}
          type="submit"
        >
          Submit
        </button>
      )}
      {step > 1 && (
        <Button
          onClick={() => router.push(`/onboarding?step=${step - 1}`)}
          backgroundColor="bg-myBlack-600"
          textColor="text-myWhite-100"
        >
          Previous
        </Button>
      )}
    </form>
  );
};

export default OnboardingForm;
