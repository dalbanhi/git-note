import React from "react";
import ListItemWithImage from "@/components/interface/ListItemWithImage";

interface ScheduleAvailabilityPreviewProps {
  available: boolean;
  startDate: string;
  endDate: string;
}

const ScheduleAvailabilityPreview: React.FC<
  ScheduleAvailabilityPreviewProps
> = ({ available, startDate, endDate }) => {
  return (
    <div>
      <p className="mb-4 text-p1Bold text-myWhite-100">
        {"Schedule & availability"}
      </p>
      <ul>
        <ListItemWithImage
          imgSrc="icons/user-check.svg"
          imgAlt="User Availability"
        >
          {available
            ? "Available for a new project"
            : "Not available for a new project"}
        </ListItemWithImage>
        {available && (
          <ListItemWithImage imgSrc="icons/clock.svg" imgAlt="Clock">
            {`Available from ${startDate} to ${endDate}`}
          </ListItemWithImage>
        )}
      </ul>
    </div>
  );
};

export default ScheduleAvailabilityPreview;
