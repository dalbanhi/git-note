"use client";
import React, { useEffect, useState } from "react";
import Autocomplete from "react-google-autocomplete";
import {
  Step1,
  Step2,
  Step3,
  Step4,
} from "@/components/shared/Form/Onboarding/Steps/Steps";

import { Session } from "next-auth";
import { Flip, toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { User } from "~/models/user";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingFormSchema } from "~/lib/validators/onboarding.schema";

interface UpdateProfileFormProps {
  session: Session | null;
  userFromDB: User;
}

const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  session,
  userFromDB,
}) => {
  const learningGoalsToPass = Object.entries(userFromDB?.learningGoals).map(
    (goal) => {
      return { value: goal[1].goal, completed: goal[1].done };
    }
  );

  const knowledgeLevelsToPass = Object.entries(userFromDB?.knowledgeLevels).map(
    (item) => {
      return { value: item[1] };
    }
  );

  const techStackToPass = Object.entries(userFromDB?.techStack).map((item) => {
    return { value: item[1] };
  });
  console.log("schedule availability", userFromDB?.scheduleAvailability);

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
      techStack: techStackToPass,
      knowledgeLevels: knowledgeLevelsToPass,
      availability: userFromDB?.scheduleAvailability.available,
      startDate: userFromDB?.scheduleAvailability.startDate,
      endDate: userFromDB?.scheduleAvailability.endDate,
    },
  });
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);
  console.log("in the form user from DB", userFromDB);
  console.log("in the form session", session);

  const showError = (message: string) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      progress: 0,
      transition: Flip,
    });
  };

  useEffect(() => {
    const handleSingleFieldError = (prependingString: string, error: any) => {
      let errorMsg = "";
      if (error) {
        errorMsg = `${prependingString} Error: ${error.message}`;
        showError(errorMsg);
      }
    };

    const handleFieldArrayError = (prependingString: string, error: any) => {
      let errorMsg = "";
      if (!error) return;
      if (Array.isArray(error)) {
        for (let err of error) {
          for (let key in err) {
            errorMsg += `${prependingString} Error: ${err[key].message} `;
            break;
          }
          if (errorMsg !== "") {
            break;
          }
        }
      } else {
        errorMsg = `${prependingString} Error: ${error.message}`;
      }
      showError(errorMsg);
    };
    console.log(errors);
    if (Object.keys(errors).length !== 0) {
      handleSingleFieldError("Name", errors.name);
      if (errors.portfolio) {
        handleSingleFieldError("Portfolio", errors.portfolio);
      }
      handleFieldArrayError("Learning Goals", errors.learningGoals);
      handleFieldArrayError("Knowledge Levels", errors.knowledgeLevels);
    }
  }, [errors]);

  const onSubmit = (data: any, event: any) => {
    event.preventDefault();
    console.log("submitting");
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
        disabled={submitButtonDisabled}
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
