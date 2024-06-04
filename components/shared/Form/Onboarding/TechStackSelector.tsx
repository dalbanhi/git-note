import React from "react";
import { Control, FieldValues, Controller } from "react-hook-form";
import { TechStackOptions } from "~/constants";
import CreatableSelect from "react-select/creatable";

interface TechStackSelectorProps {
  control?: Control<FieldValues>;
}

const options = [
  { value: "react", label: "React" },
  { value: "angular", label: "Angular" },
  { value: "vue", label: "Vue" },
];
const TechStackSelector: React.FC<TechStackSelectorProps> = ({ control }) => {
  //   const options = TechStackOptions.map((techStack) => ({
  //     value: techStack,
  //     label: techStack,
  //   }));
  console.log(options);

  return (
    <Controller
      name="techStack"
      control={control}
      defaultValue={[]}
      render={({ field }) => (
        <CreatableSelect
          isMulti
          {...field}
          classNamePrefix="react-select"
          options={options}
          theme={(theme) => ({
            ...theme,
            borderRadius: 5,
            colors: {
              // ...theme.colors,
              //main bar color
              neutral0: "rgb(var(--my-black-700))",
              //down arrow color when selected
              neutral5: "rgb(var(--primary))",
              //color of the selected pill
              neutral10: "rgb(var(--my-black-600))",

              neutral20: "rgb(var(--my-white-500))",
              //hover over the select color
              neutral30: "rgb(var(--primary))",
              neutral40: "rgb(var(--primary))",
              //color of placeholder text
              neutral50: "rgb(var(--my-white-100))",
              neutral60: "rgb(var(--my-white-100))",
              neutral70: "rgb(var(--my-white-100))",
              //text color of pills
              neutral80: "rgb(var(--my-white-100))",
              neutral90: "rgb(var(--my-black-600))",
              primary: "rgb(var(--primary))",
              primary25: "rgb(var(--primary))",
              primary50: "rgb(var(--primary))",
              primary75: "rgb(var(--primary))",
              //color of the X in the X button
              danger: "rgb(var(--my-black-900))",
              //danger of the X button
              dangerLight: "rgb(var(--warning-500))",
            },
          })}
          placeholder="Select your tech stack"
          //   onChange={(selectedOptions) =>
          //     field.onChange(selectedOptions.map((option) => option.value))
          //   }
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          onChange={(selectedOptions) => field.onChange(selectedOptions)}
          //   value={field.value}
          //   onBlur={field.onBlur}
        />
      )}
    />
  );
};

export default TechStackSelector;
