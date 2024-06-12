"use client";
import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import {
  Step1,
  Step2,
  Step3,
  Step4,
} from "@/components/shared/Form/Onboarding/Steps/Steps";
// import { getSession } from "~/auth/auth";
import { getUser } from "~/lib/actions/users";
import { Session } from "next-auth";

import { useForm, Controller } from "react-hook-form";
import { User } from "~/models/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingFormSchema } from "~/lib/validators/onboarding.schema";
import Button from "@/components/interface/Button";

interface UpdateProfileFormProps {
  session: Session | null;
  userFromDB: User;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  session,
  userFromDB,
}) => {
  const { register, handleSubmit, control } = useForm({
    resolver: zodResolver(OnboardingFormSchema),
    defaultValues: {
      image: userFromDB?.image,
      name: userFromDB?.name,
      portfolio: userFromDB?.portfolio,
      learningGoals: userFromDB?.learningGoals,
      techStack: userFromDB?.techStack,
      knowledgeLevels: userFromDB?.knowledgeLevels,
      scheduleAvailability: userFromDB?.scheduleAvailability,
    },
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  console.log("in the form user from DB", userFromDB);
  console.log("in the form session", session);

  const onSubmit = (data: any) => {
    console.log(data);
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
      >
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfileForm;

{
  /* <React.Fragment>
  <form onSubmit={handleSubmit(onSubmit)}>
    <button type="submit">Submit</button>
  </form>
  <Controller
    name="location"
    control={control}
    render={({ field: { onChange, value } }) => (
      <Autocomplete
        apiKey={process.env.NEXT_PUBLIC_GMAPS}
        onPlaceSelected={(place) => {
          console.log(place);
          onChange(place.formatted_address);
        }}
      />
    )}
  ></Controller>
  </React.Fragment> */
}
