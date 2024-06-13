import React from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import { Control, FieldValues, Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import "./MyDatePicker.css";

interface MyDatePickerProps {
  label: string;
  fieldName: string;
  control?: Control<FieldValues>;
}
function SplitCamelCaseWithAbbreviations(s: string) {
  return s.split(/([A-Z][a-z]+)/).filter(function (e) {
    return e;
  });
}

const MyDatePicker: React.FC<MyDatePickerProps> = ({
  label,
  control,
  fieldName,
}) => {
  const startDate = new Date();
  return (
    <div className="flex w-full flex-col gap-2">
      <label className="text-p3Med capitalize text-myWhite-300" htmlFor={label}>
        {SplitCamelCaseWithAbbreviations(label).join(" ")}
      </label>
      <Controller
        name={fieldName}
        control={control}
        defaultValue={null}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          // console.log("value in date picker:", value),
          <DatePicker
            onChange={onChange}
            className="truncate rounded-sm border-none bg-myBlack-700 p-2 text-p4Reg text-myWhite-300 outline-none"
            calendarClassName="custom-calendar"
            showTimeSelect
            startDate={startDate}
            onBlur={onBlur}
            selected={new Date(value)}
            ref={ref}
            placeholderText="Select a date"
          />
        )}
      />
      <p className="text-caption text-myWhite-300">
        {" "}
        The time is in your local timezone
      </p>
    </div>
  );
};

export default MyDatePicker;
