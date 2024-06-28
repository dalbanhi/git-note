"use client";
import React from "react";
import CalendarHeatmap from "./Home/CalendarHeatmap";
import useDevice from "~/hooks/useMediaQuery/useDevice";

import { DAY_LABELS, MONTH_LABELS, testContributions } from "~/constants";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ContributionsTracker = () => {
  //get date one year ago today
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);

  function getClassNameValue(value: any) {
    if (!value || value.count === 0) {
      return `color-myCal-0`;
    } else if (value.count < 2) {
      return `color-myCal-1`;
    } else if (value.count < 3) {
      return `color-myCal-2`;
    } else if (value.count < 4) {
      return `color-myCal-3`;
    } else if (value.count < 5) {
      return `color-myCal-4`;
    } else {
      return `color-myCal-5`;
    }
  }

  const rectClasses = [
    "color-myCal-1",
    "color-myCal-2",
    "color-myCal-3",
    "color-myCal-4",
    "color-myCal-5",
  ];

  const device = useDevice();

  return (
    <div className=" rounded-sm border border-myWhite-500 bg-myBlack-900 max-sm:p-3 md:p-4">
      <CalendarHeatmap
        startDate={lastYear}
        endDate={new Date()}
        values={testContributions.contributions.map((contribution) => {
          return {
            date: contribution.date,
            count: contribution.count,
          };
        })}
        showWeekdayLabels={true}
        gutterSize={4}
        weekdayLabels={DAY_LABELS}
        classForValue={getClassNameValue}
        horizontal={true}
        monthLabels={MONTH_LABELS}
        showMonthLabels={true}
      />
      <div className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="flex justify-between">
              <p className="text-subtitle text-myWhite-300">
                Learn how we count contributions
              </p>
            </TooltipTrigger>
            <TooltipContent>
              Contributions are counted by notes created per day
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex items-center justify-center gap-2">
          <span className="text-subtitle text-myWhite-300">Less</span>
          <svg className="h-[15px] w-[54px] max-sm:h-[5px] max-sm:w-[24px] ">
            <g>
              {rectClasses.map((rectClass, index) => {
                return (
                  <rect
                    key={index}
                    x={
                      index * (device?.isSmall ? 5 : 8) +
                      index * (device?.isSmall ? 1 : 3)
                    }
                    y={0}
                    rx={2}
                    className={`${rectClass} size-[10px] max-sm:size-[5px]`}
                  ></rect>
                );
              })}
            </g>
          </svg>
          <span className="text-subtitle text-myWhite-300">More</span>
        </div>
      </div>
    </div>
  );
};

export default ContributionsTracker;
