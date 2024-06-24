import React from "react";
import Autocomplete from "react-google-autocomplete";
import {
  useFieldArray,
  Control,
  Controller,
  UseFormRegister,
} from "react-hook-form";
import TechStackSelector from "../TechStackSelector";
import MyDatePicker from "../MyDatePicker/MyDatePicker";
import ImageUploader from "../ImageUploader";
// import { UseFormRegister } from "react-hook-form";
import { Session } from "next-auth";
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
  // const autocompleteRef = useRef(null);
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
      />
      <Input
        label="name"
        type={"text"}
        placeholder="Full Name"
        register={register}
      />
      <Input
        label="portfolio"
        type={"url"}
        placeholder="Portfolio"
        register={register}
      />
      <label
        className="text-p3Med capitalize text-myWhite-300"
        htmlFor={"location"}
      >
        {"Location"}
      </label>
      <Controller
        name="location"
        control={control}
        render={({ field: { onChange, value, ref } }) => (
          <Autocomplete
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
            style={{
              //truncate
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              //rounded-sm
              borderRadius: "0.125rem",
              //border-none
              borderStyle: "none",
              //bg-myBlack-700
              backgroundColor: "rgb(var(--my-black-700))",
              //p-2
              padding: "0.5rem",
              //text-p4Reg
              fontSize: "12px",
              lineHeight: "16px",
              fontWeight: 400,
              //text-myWhite-300
              color: "rgb(var(--my-white-300))",
              //outline-none
              outline: "2px solid transparent",
              outlineOffset: "2px",
            }}
            apiKey={process.env.NEXT_PUBLIC_GMAPS}
            onPlaceSelected={(place) => {
              onChange(place?.formatted_address || place?.name);
            }}
            defaultValue={value}
          />
        )}
      ></Controller>
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
            imageSrc="/icons/check-square/blue.svg"
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
    <div className="flex flex-col justify-center gap-2">
      <div className="flex items-center gap-2">
        <label
          className="flex items-center gap-1 text-p3Med text-myWhite-300"
          htmlFor="availability"
        >
          <Controller
            name="availability"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                {...field}
                className="rounded-sm bg-myBlack-700 text-myGreen-400 ring-0 focus:ring-0"
                checked={field.value}
              />
            )}
          />
          Are you available for a new project?
        </label>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
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
