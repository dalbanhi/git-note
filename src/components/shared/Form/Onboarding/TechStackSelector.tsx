import React from "react";
import { Control, FieldValues, Controller } from "react-hook-form";
import { TechStackOptions } from "~/constants";
import dynamic from "next/dynamic";
const CreatableSelect = dynamic(() => import("react-select/creatable"), {
  ssr: false,
});

interface TechStackSelectorProps {
  control?: Control<FieldValues>;
}

const TechStackSelector: React.FC<TechStackSelectorProps> = ({ control }) => {
  const options = TechStackOptions.map((techStack) => ({
    value: techStack,
    label: techStack,
  }));

  return (
    <Controller
      name="techStack"
      control={control}
      render={({ field }) => {
        let techStackToPass: any = [];
        if (field.value) {
          techStackToPass = Object.entries(field.value).map((item: any) => {
            return { label: item[1].value, value: item[1].value };
          });
        }

        return (
          <CreatableSelect
            isMulti
            instanceId={"techStack"}
            classNamePrefix="react-select"
            options={options}
            defaultValue={techStackToPass}
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
            getOptionLabel={(option: any) => option.label}
            getOptionValue={(option: any) => option.value}
            onChange={(selectedOptions) => field.onChange(selectedOptions)}
          />
        );
      }}
    />
  );
};

export default TechStackSelector;
