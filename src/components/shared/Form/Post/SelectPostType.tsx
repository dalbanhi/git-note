import React from "react";
import IconLink from "@/components/shared/LeftSidebar/IconLink";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Controller, Control, useForm } from "react-hook-form";

interface SelectPostTypeProps {
  control?: Control;
}

const SelectPostType: React.FC<SelectPostTypeProps> = ({ control }) => {
  return (
    <>
      <label
        className="text-p3Med capitalize text-myWhite-300"
        htmlFor={"type"}
      >
        Create type
      </label>
      <Controller
        name="type"
        control={control}
        render={({ field }) => {
          return (
            <Select
              onValueChange={(value) => field.onChange(value)}
              value={field.value}
            >
              <SelectTrigger className="w-full bg-myBlack-700 text-myWhite-300">
                <SelectValue placeholder="Choose a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="component">
                  {" "}
                  <IconLink
                    textColor="text-myWhite-300"
                    iconColor="text-myPurple-900"
                    iconSrc="/icons/component.svg"
                    iconAlt="Component icon"
                    text="Component"
                  />
                </SelectItem>
                <SelectItem value="workflow">
                  {" "}
                  <IconLink
                    textColor="text-myWhite-300"
                    iconColor="text-myBlue-900"
                    iconSrc="/icons/workflow.svg"
                    iconAlt="workflow icon"
                    text="Workflow"
                  />
                </SelectItem>
                <SelectItem value="knowledge">
                  {" "}
                  <IconLink
                    textColor="text-myWhite-300"
                    iconColor="text-myGreen-900"
                    iconSrc="/icons/knowledge.svg"
                    iconAlt="knowledge icon"
                    text="Knowledge"
                  />
                </SelectItem>
              </SelectContent>
            </Select>
          );
        }}
      />
    </>
  );
};

export default SelectPostType;
