import React from "react";
import { useFieldArray, Control, Controller } from "react-hook-form";
import TechStackSelector from "../TechStackSelector";
import MyDatePicker from "../MyDatePicker/MyDatePicker";
import ImageUploader from "../ImageUploader";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import Button from "@/components/interface/Button";
import DeletableListItem from "@/components/interface/DeletableListItem";
import Input from "@/components/interface/Input";

interface StepProps {
  register: UseFormRegister<any>;
  control?: Control<any>;
  session?: Session | null;
}

interface Step1Props extends StepProps {
  setNextButtonDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const Step1: React.FC<Step1Props> = ({
  register,
  control,
  session,
  setNextButtonDisabled,
}) => {
  return (
    <div className="flex flex-col gap-3">
      <Controller
        name={"image"}
        control={control}
        defaultValue={""}
        render={({ field: { onChange, value } }) => (
          <ImageUploader
            image={value}
            setImage={onChange}
            session={session}
            setNextButtonDisabled={setNextButtonDisabled}
          />
        )}
      ></Controller>
      <Input
        label="name"
        type={"text"}
        placeholder="Full Name"
        register={register}
        // initialValue={session?.user?.name}
      />
      <Input
        label="portfolio"
        type={"url"}
        placeholder="Portfolio"
        register={register}
      />
    </div>
  );
};

const Step2: React.FC<StepProps> = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "learningGoals",
  });
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-p3Med text-myWhite-300">Learning goals</h3>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => {
          return (
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
          );
        })}
      </div>
      <Button
        image="/icons/plus-blue.svg"
        backgroundColor="bg-myBlack-600"
        textColor="text-myWhite-100"
        onClick={() => {
          append({ value: "", completed: false });
        }}
      >
        Add goal checkbox
      </Button>
    </div>
  );
};

const Step3: React.FC<StepProps> = ({ register, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "knowledgeLevels",
  });
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
            imageSrc="/icons/check-square.svg"
            imageAlt="Checkmark"
          />
        ))}
      </div>
      <Button
        image="/icons/plus-blue.svg"
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
        <label
          className="flex items-center gap-1 text-p3Med text-myWhite-300"
          htmlFor="availability"
        >
          <input
            type="checkbox"
            {...register("availability")}
            className="rounded-sm bg-myBlack-700 text-myGreen-400 ring-0 focus:ring-0"
            defaultChecked
          />
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

export { Step1, Step2, Step3, Step4 };
