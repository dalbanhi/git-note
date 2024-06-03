"use client";
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormSchema } from "~/lib/validators/user.schema";
import { useRouter } from "next/navigation";

import Button from "~/components/ui/Button";
import Input from "@components/ui/Input";

interface OnboardingFormProps {
  step: number;
}

interface StepProps {
  register: any;
  control?: any;
}

const Step1: React.FC<StepProps> = ({ register, control }) => {
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
        label="Full Name"
        type={"text"}
        placeholder="Full Name"
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

const Step2: React.FC<StepProps> = ({ register }) => {
  return (
    <div>
      {" "}
      <Input
        label="Email"
        type={"text"}
        placeholder="Email"
        register={register}
      />{" "}
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

const OnboardingForm = ({ step }: { step: number }) => {
  step = Number(step);
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(UserFormSchema), //change this schema
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
    1: <Step1 register={register} control={control} />,
    2: <Step2 register={register} />,
    3: <Step3 register={register} />,
    4: <Step4 register={register} />,
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
