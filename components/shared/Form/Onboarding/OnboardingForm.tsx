"use client";
import React from "react";
import { useForm, useFieldArray, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema } from "~/lib/validators/user.schema";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";

import Button from "~/components/ui/Button";
import Input from "@components/ui/Input";
import ImageUploader from "./ImageUploader";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { useState } from "react";

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
      name: "test", // unique name for your Field Array
    }
  );
  return (
    <div>
      {" "}
      <Input
        label="Email"
        type={"text"}
        placeholder="Email"
        register={register}
      />{" "}
      <button
        onClick={() => {
          append({ value: "new" });
        }}
      >
        add new thing
      </button>
      <br />
      <br />
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`test.${index}.value`)} />
          <button
            onClick={() => {
              remove(index);
            }}
          >
            -
          </button>
        </div>
      ))}
    </div>
  );
};

const Step3: React.FC<StepProps> = ({ register }) => {
  return (
    <div>
      {" "}
      <Input
        label="step3"
        type={"text"}
        placeholder="Step3"
        register={register}
      />{" "}
    </div>
  );
};

const Step4: React.FC<StepProps> = ({ register }) => {
  return (
    <div>
      {" "}
      <Input
        label="Step4"
        type={"text"}
        placeholder="Step4"
        register={register}
      />{" "}
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
    // resolver: zodResolver(UserFormSchema), //change this schema
    // defaultValues: {
    //   Name: session?.user?.name,
    // },
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
        <button type="submit">Submit</button>
      )}
    </form>
  );
};

export default OnboardingForm;
