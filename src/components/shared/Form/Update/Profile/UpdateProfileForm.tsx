"use client";
import React, { useEffect, useState } from "react";

import {
  Step1,
  Step2,
  Step3,
  Step4,
} from "@/components/shared/Form/Onboarding/Steps/Steps";

import { Session } from "next-auth";
import {
  handleFieldArrayError,
  handleSingleFieldError,
} from "@/components/shared/utils/FormErrorHandlers";
import { useForm } from "react-hook-form";
import { User } from "~/models/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingFormSchema } from "~/lib/validators/onboarding.schema";
import { updateUser } from "~/lib/actions/users";
import { useRouter } from "next/navigation";

interface UpdateProfileFormProps {
  session: Session | null;
  userFromDB: User;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  session,
  userFromDB,
}) => {
  const router = useRouter();

  //cleaning up the data to load to the form
  const learningGoalsToPass = Object.entries(userFromDB?.learningGoals).map(
    (goal) => {
      return { value: goal[1].goal, completed: goal[1].done };
    }
  );

  const knowledgeLevelsToPass = (userFromDB?.knowledgeLevels).map((item) => {
    return { value: item };
  });

  const techStackToPass = (userFromDB?.techStack).map((item) => {
    return { label: item, value: item };
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      image: userFromDB?.image,
      name: userFromDB?.name,
      portfolio: userFromDB?.portfolio,
      learningGoals: learningGoalsToPass,
      location: userFromDB?.location,
      techStack: techStackToPass,
      knowledgeLevels: knowledgeLevelsToPass,
      availability: userFromDB?.scheduleAvailability.available,
      startDate: new Date(userFromDB?.scheduleAvailability.startDate),
      endDate: new Date(userFromDB?.scheduleAvailability.endDate),
    },
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

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

  const onSubmit = async (data: any, event: any) => {
    event.preventDefault();
    await updateUser(data);
    router.push("/profile");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-p3Med uppercase text-myWhite-500">
          Basic Information
        </p>
        <Step1
          setNextButtonDisabled={setSubmitButtonDisabled}
          register={register}
          control={control}
          session={session}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-p3Med uppercase text-myWhite-500">Learning Goals</p>
        <Step2 register={register} control={control} session={session} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-p3Med uppercase text-myWhite-500">Knowledge</p>
        <Step3 register={register} control={control} session={session} />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-p3Med uppercase text-myWhite-500">
          Schedule & Availability
        </p>
        <Step4 register={register} control={control} session={session} />
      </div>
      <button
        className={`flex cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary-500 p-2  text-p4Med text-myBlack-900`}
        type="submit"
        disabled={submitButtonDisabled}
      >
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfileForm;
