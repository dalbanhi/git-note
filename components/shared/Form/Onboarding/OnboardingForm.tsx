"use client";
import React from "react";
import { useForm, useFieldArray, Control, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OnboardingFormSchema } from "~/lib/validators/onboarding.schema";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import Button from "~/components/ui/Button";
import Input from "@components/ui/Input";
import DeletableListItem from "@components/ui/DeletableListItem";
import ImageUploader from "./ImageUploader";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { useState } from "react";
import TechStackSelector from "./TechStackSelector";
import MyDatePicker from "./MyDatePicker/MyDatePicker";

interface OnboardingFormProps {
  step: number;
  session: Session | null;
}

interface StepProps {
  register: UseFormRegister<FieldValues>;
  control?: Control<FieldValues>;
  session?: Session | null;
}

interface Step1Props extends StepProps {
  imageURL: string;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
}

const Step1: React.FC<Step1Props> = ({
  register,
  control,
  session,
  imageURL,
  setImageURL,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <ImageUploader imageURL={imageURL} setImageURL={setImageURL} />
      <Input
        label="Name"
        type={"text"}
        placeholder="Full Name"
        register={register}
        initialValue={session?.user?.name}
      />
      <Input
        label="Portfolio"
        type={"url"}
        placeholder="Portfolio"
        register={register}
      />
    </div>
  );
};

const Step2: React.FC<StepProps> = ({ register, control }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "learningGoals", // unique name for your Field Array
    }
  );
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-p3Med text-myWhite-300">Learning goals</h3>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <DeletableListItem
            key={field.id}
            onDelete={() => remove(index)}
            checkable={true}
            register={register}
            fieldArrayName="learningGoals"
            placeholderText="Enter a learning goal"
            control={control}
            index={index}
          />
        ))}
      </div>
      <Button
        image="icons/plus-blue.svg"
        backgroundColor="bg-myBlack-600"
        textColor="text-myWhite-100"
        onClick={() => {
          append({ value: "" });
        }}
      >
        Add goal checkbox
      </Button>
    </div>
  );
};

const Step3: React.FC<StepProps> = ({ register, control }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control, // control props comes from useForm (optional: if you are using FormProvider)
      name: "knowledgeLevels", // unique name for your Field Array
    }
  );
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-p3Med text-myWhite-300">Knowledge Level</h3>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <DeletableListItem
            key={field.id}
            onDelete={() => remove(index)}
            checkable={false}
            register={register}
            fieldArrayName="knowledgeLevels"
            placeholderText="Enter a knowledge level"
            control={control}
            index={index}
            imageSrc="icons/check-square.svg"
            imageAlt="Checkmark"
          />
        ))}
      </div>
      <Button
        image="icons/plus-blue.svg"
        backgroundColor="bg-myBlack-600"
        textColor="text-myWhite-100"
        onClick={() => {
          append({ value: "" });
        }}
      >
        Add knowledge checkmark
      </Button>
      <div className="flex flex-col gap-2">
        <label
          className="text-p3Med capitalize text-myWhite-300"
          htmlFor={"techStack"}
        >
          {"Tech Stack"}
        </label>
        <TechStackSelector control={control} />
      </div>
    </div>
  );
};

const Step4: React.FC<StepProps> = ({ register, control }) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <input
          className="rounded-sm bg-myBlack-700 text-myGreen-400 ring-0 focus:ring-0"
          type="checkbox"
          {...register("availability")}
          defaultChecked
        />
        <label className="text-p3Med text-myWhite-300" htmlFor="availability">
          Are you available for a new project?
        </label>
      </div>
      <div className="flex gap-2">
        <MyDatePicker
          label="Start Date & Time "
          fieldName="startDate"
          control={control}
        />
        <MyDatePicker
          label="End Date & Time "
          fieldName="endDate"
          control={control}
        />
      </div>
    </div>
  );
};

const OnboardingForm: React.FC<OnboardingFormProps> = ({ step, session }) => {
  step = Number(step);
  const router = useRouter();
  const [imageURL, setImageURL] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(OnboardingFormSchema), //change this schema
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  const onNext = (event: React.FormEvent) => {
    if (step === 4) {
      event.preventDefault();
      console.log("submit");
      //   handleSubmit(onSubmit)();
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
        imageURL={imageURL}
        setImageURL={setImageURL}
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
      {step !== 4 ? (
        <Button
          onClick={onNext}
          key={step}
          backgroundColor="bg-primary-500"
          textColor="bg-myBlack-500"
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
    </form>
  );
};

export default OnboardingForm;
