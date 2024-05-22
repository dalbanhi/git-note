//modified from: https://github.com/kevinsqi/react-calendar-heatmap

/* eslint-disable tailwindcss/no-custom-classname */
import React, { useCallback, useMemo } from "react";
import memoizeOne from "memoize-one";
import { DAYS_IN_WEEK, MILLISECONDS_IN_ONE_DAY } from "~/constants/index";
import {
  dateNDaysAgo,
  shiftDate,
  getBeginningTimeForDate,
  convertToDate,
  getRange,
} from "~/lib/helpers/calendar";

const SQUARE_SIZE = 10;
const MONTH_LABEL_GUTTER_SIZE = 4;
const CSS_PSEUDO_NAMESPACE = "react-calendar-heatmap-";

interface CalendarHeatmapProps {
  values: Array<{ date: string | number | Date; [key: string]: any }>;
  numDays?: number;
  startDate?: string | number | Date;
  endDate?: string | number | Date;
  gutterSize?: number;
  horizontal?: boolean;
  showMonthLabels?: boolean;
  showWeekdayLabels?: boolean;
  showOutOfRangeDays?: boolean;
  tooltipDataAttrs?:
    | { [key: string]: any }
    | ((value: any) => { [key: string]: any });
  titleForValue?: (value: any) => string | null;
  classForValue?: (value: any) => string;
  monthLabels?: string[];
  weekdayLabels?: string[];
  onClick?: (value: any) => void;
  onMouseOver?: (e: React.MouseEvent, value: any) => void;
  onMouseLeave?: (e: React.MouseEvent, value: any) => void;
  transformDayElement?: (
    rect: React.ReactElement,
    value: any,
    index: number
  ) => React.ReactElement;
}

const CalendarHeatmap: React.FC<CalendarHeatmapProps> = (props) => {
  const getEndDate = useCallback(() => {
    return getBeginningTimeForDate(convertToDate(props.endDate));
  }, [props.endDate]);
  const getDateDifferenceInDays = useCallback(() => {
    const { startDate, numDays } = props;
    if (numDays) {
      console.warn(
        "numDays is a deprecated prop. It will be removed in the next release. Consider using the startDate prop instead."
      );
      return numDays;
    }
    const timeDiff = Number(getEndDate()) - Number(convertToDate(startDate));
    return Math.ceil(timeDiff / MILLISECONDS_IN_ONE_DAY);
  }, [props, getEndDate]);

  const getSquareSizeWithGutter = useCallback(() => {
    return SQUARE_SIZE + props.gutterSize!;
  }, [props.gutterSize]);

  const getMonthLabelSize = useCallback(() => {
    if (!props.showMonthLabels) {
      return 0;
    }
    if (props.horizontal) {
      return SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE;
    }
    return 2 * (SQUARE_SIZE + MONTH_LABEL_GUTTER_SIZE);
  }, [props.showMonthLabels, props.horizontal]);

  const getWeekdayLabelSize = useCallback(() => {
    if (!props.showWeekdayLabels) {
      return 0;
    }
    if (props.horizontal) {
      return 30;
    }
    return SQUARE_SIZE * 1.5;
  }, [props.showWeekdayLabels, props.horizontal]);

  const getStartDate = useCallback(() => {
    return shiftDate(getEndDate(), -getDateDifferenceInDays() + 1);
  }, [getEndDate, getDateDifferenceInDays]);

  const getNumEmptyDaysAtStart = useCallback(() => {
    return getStartDate().getDay();
  }, [getStartDate]);

  const getStartDateWithEmptyDays = useCallback(() => {
    return shiftDate(getStartDate(), -getNumEmptyDaysAtStart());
  }, [getStartDate, getNumEmptyDaysAtStart]);

  const getNumEmptyDaysAtEnd = useCallback(() => {
    return DAYS_IN_WEEK - 1 - getEndDate().getDay();
  }, [getEndDate]);

  const getWeekCount = useCallback(() => {
    const numDaysRoundedToWeek =
      getDateDifferenceInDays() +
      getNumEmptyDaysAtStart() +
      getNumEmptyDaysAtEnd();
    return Math.ceil(numDaysRoundedToWeek / DAYS_IN_WEEK);
  }, [getDateDifferenceInDays, getNumEmptyDaysAtStart, getNumEmptyDaysAtEnd]);

  const getWeekWidth = useCallback(() => {
    return DAYS_IN_WEEK * getSquareSizeWithGutter();
  }, [getSquareSizeWithGutter]);

  const getWidth = useCallback(() => {
    return (
      getWeekCount() * getSquareSizeWithGutter() -
      (props.gutterSize! - getWeekdayLabelSize())
    );
  }, [
    getWeekCount,
    getSquareSizeWithGutter,
    props.gutterSize,
    getWeekdayLabelSize,
  ]);

  const getHeight = useCallback(() => {
    return (
      getWeekWidth() +
      (getMonthLabelSize() - props.gutterSize!) +
      getWeekdayLabelSize()
    );
  }, [getWeekWidth, getMonthLabelSize, props.gutterSize, getWeekdayLabelSize]);

  const getTooltipDataAttrsForValue = useCallback(
    (value: any) => {
      const { tooltipDataAttrs } = props;

      if (typeof tooltipDataAttrs === "function") {
        return tooltipDataAttrs(value);
      }
      return tooltipDataAttrs;
    },
    [props]
  );

  const getValueCache = useMemo(
    () =>
      memoizeOne((props) =>
        props.values.reduce((memo: any, value: any) => {
          const date = convertToDate(value.date);
          const index = Math.floor(
            (Number(date) - Number(getStartDateWithEmptyDays())) /
              MILLISECONDS_IN_ONE_DAY
          );
          memo[index] = {
            value,
            className: props.classForValue!(value),
            title: props.titleForValue ? props.titleForValue(value) : null,
            tooltipDataAttrs: getTooltipDataAttrsForValue(value),
          };
          return memo;
        }, {})
      ),
    [getStartDateWithEmptyDays, getTooltipDataAttrsForValue]
  );

  const valueCache = getValueCache(props);

  const getValueForIndex = useCallback(
    (index: number) => {
      if (valueCache[index]) {
        return valueCache[index].value;
      }
      return null;
    },
    [valueCache]
  );

  const getClassNameForIndex = useCallback(
    (index: number) => {
      if (valueCache[index]) {
        return valueCache[index].className;
      }
      return props.classForValue!(null);
    },
    [valueCache, props.classForValue]
  );

  const getTitleForIndex = useCallback(
    (index: number) => {
      if (valueCache[index]) {
        return valueCache[index].title;
      }
      return props.titleForValue ? props.titleForValue(null) : null;
    },
    [valueCache, props]
  );

  const getTooltipDataAttrsForIndex = useCallback(
    (index: number) => {
      if (valueCache[index]) {
        return valueCache[index].tooltipDataAttrs;
      }
      return getTooltipDataAttrsForValue({ date: null, count: null });
    },
    [valueCache, getTooltipDataAttrsForValue]
  );

  const getTransformForWeek = useCallback(
    (weekIndex: number) => {
      if (props.horizontal) {
        return `translate(${weekIndex * getSquareSizeWithGutter()}, 0)`;
      }
      return `translate(0, ${weekIndex * getSquareSizeWithGutter()})`;
    },
    [props.horizontal, getSquareSizeWithGutter]
  );

  const getTransformForWeekdayLabels = useCallback(() => {
    if (props.horizontal) {
      return `translate(0, ${getMonthLabelSize()})`;
    }
    return undefined;
  }, [props.horizontal, getMonthLabelSize]);

  const getTransformForMonthLabels = useCallback(() => {
    if (props.horizontal) {
      return `translate(${getWeekdayLabelSize()}, 0)`;
    }
    return `translate(${getWeekWidth() + MONTH_LABEL_GUTTER_SIZE}, ${getWeekdayLabelSize()})`;
  }, [props.horizontal, getWeekdayLabelSize, getWeekWidth]);

  const getTransformForAllWeeks = useCallback(() => {
    if (props.horizontal) {
      return `translate(${getWeekdayLabelSize()}, ${getMonthLabelSize()})`;
    }
    return `translate(0, ${getWeekdayLabelSize()})`;
  }, [props.horizontal, getWeekdayLabelSize, getMonthLabelSize]);

  const getViewBox = useCallback(() => {
    if (props.horizontal) {
      return `0 0 ${getWidth()} ${getHeight()}`;
    }
    return `0 0 ${getHeight()} ${getWidth()}`;
  }, [props.horizontal, getWidth, getHeight]);

  const getSquareCoordinates = useCallback(
    (dayIndex: number) => {
      if (props.horizontal) {
        return [0, dayIndex * getSquareSizeWithGutter()];
      }
      return [dayIndex * getSquareSizeWithGutter(), 0];
    },
    [props.horizontal, getSquareSizeWithGutter]
  );

  const getWeekdayLabelCoordinates = useCallback(
    (dayIndex: number) => {
      if (props.horizontal) {
        return [0, (dayIndex + 1) * SQUARE_SIZE + dayIndex * props.gutterSize!];
      }
      return [
        dayIndex * SQUARE_SIZE + dayIndex * props.gutterSize!,
        SQUARE_SIZE,
      ];
    },
    [props.horizontal, props.gutterSize]
  );

  const getMonthLabelCoordinates = useCallback(
    (weekIndex: number) => {
      if (props.horizontal) {
        return [
          weekIndex * getSquareSizeWithGutter(),
          getMonthLabelSize() - MONTH_LABEL_GUTTER_SIZE,
        ];
      }
      const verticalOffset = -2;
      return [0, (weekIndex + 1) * getSquareSizeWithGutter() + verticalOffset];
    },
    [props.horizontal, getSquareSizeWithGutter, getMonthLabelSize]
  );

  const handleClick = useCallback(
    (value: any) => {
      if (props.onClick) {
        props.onClick(value);
      }
    },
    [props]
  );

  const handleMouseOver = useCallback(
    (e: React.MouseEvent, value: any) => {
      if (props.onMouseOver) {
        props.onMouseOver(e, value);
      }
    },
    [props]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent, value: any) => {
      if (props.onMouseLeave) {
        props.onMouseLeave(e, value);
      }
    },
    [props]
  );

  const renderSquare = useCallback(
    (dayIndex: number, index: number) => {
      const indexOutOfRange =
        index < getNumEmptyDaysAtStart() ||
        index >= getNumEmptyDaysAtStart() + getDateDifferenceInDays();
      if (indexOutOfRange && !props.showOutOfRangeDays) {
        return null;
      }
      const [x, y] = getSquareCoordinates(dayIndex);
      const value = getValueForIndex(index);
      const rect = (
        <rect
          key={index}
          width={SQUARE_SIZE}
          height={SQUARE_SIZE}
          x={x}
          y={y}
          className={getClassNameForIndex(index)}
          onClick={() => handleClick(value)}
          onMouseOver={(e) => handleMouseOver(e, value)}
          onMouseLeave={(e) => handleMouseLeave(e, value)}
          {...getTooltipDataAttrsForIndex(index)}
          rx={2}
        >
          <title>{getTitleForIndex(index)}</title>
        </rect>
      );
      const { transformDayElement } = props;
      return transformDayElement
        ? transformDayElement(rect, value, index)
        : rect;
    },
    [
      getClassNameForIndex,
      getNumEmptyDaysAtStart,
      getDateDifferenceInDays,
      handleClick,
      handleMouseOver,
      handleMouseLeave,
      getSquareCoordinates,
      getValueForIndex,
      getTooltipDataAttrsForIndex,
      getTitleForIndex,
      props,
    ]
  );

  const renderWeek = useCallback(
    (weekIndex: number) => {
      return (
        <g
          key={weekIndex}
          transform={getTransformForWeek(weekIndex)}
          // eslint-disable-next-line tailwindcss/no-custom-classname
          className={`${CSS_PSEUDO_NAMESPACE}week`}
        >
          {getRange(DAYS_IN_WEEK).map((dayIndex) =>
            renderSquare(dayIndex, weekIndex * DAYS_IN_WEEK + dayIndex)
          )}
        </g>
      );
    },
    [getTransformForWeek, renderSquare]
  );

  const renderAllWeeks = useCallback(() => {
    return getRange(getWeekCount()).map((weekIndex) => renderWeek(weekIndex));
  }, [getWeekCount, renderWeek]);

  const renderMonthLabels = useCallback(() => {
    if (!props.showMonthLabels) {
      return null;
    }
    const weekRange = getRange(getWeekCount() - 1);
    return weekRange.map((weekIndex) => {
      const endOfWeek = shiftDate(
        getStartDateWithEmptyDays(),
        (weekIndex + 1) * DAYS_IN_WEEK
      );
      const [x, y] = getMonthLabelCoordinates(weekIndex);
      return endOfWeek.getDate() >= 1 && endOfWeek.getDate() <= DAYS_IN_WEEK ? (
        <text
          key={weekIndex}
          x={x}
          y={y}
          className={`${CSS_PSEUDO_NAMESPACE}month-label`}
        >
          {props.monthLabels![endOfWeek.getMonth()]}
        </text>
      ) : null;
    });
  }, [
    props.showMonthLabels,
    getWeekCount,
    getStartDateWithEmptyDays,
    getMonthLabelCoordinates,
    props.monthLabels,
  ]);

  const renderWeekdayLabels = useCallback(() => {
    if (!props.showWeekdayLabels) {
      return null;
    }
    return props.weekdayLabels!.map((weekdayLabel, dayIndex) => {
      const [x, y] = getWeekdayLabelCoordinates(dayIndex);
      const cssClasses = `${
        props.horizontal ? "" : `${CSS_PSEUDO_NAMESPACE}small-text`
      } ${CSS_PSEUDO_NAMESPACE}weekday-label`;
      return dayIndex & 1 ? (
        <text key={`${x}${y}`} x={x} y={y} className={cssClasses}>
          {weekdayLabel}
        </text>
      ) : null;
    });
  }, [
    props.showWeekdayLabels,
    getWeekdayLabelCoordinates,
    props.weekdayLabels,
    props.horizontal,
  ]);

  return (
    <svg className="react-calendar-heatmap" viewBox={getViewBox()}>
      <g
        transform={getTransformForMonthLabels()}
        className={`${CSS_PSEUDO_NAMESPACE}month-labels`}
      >
        {renderMonthLabels()}
      </g>
      <g
        transform={getTransformForAllWeeks()}
        className={`${CSS_PSEUDO_NAMESPACE}all-weeks`}
      >
        {renderAllWeeks()}
      </g>
      <g
        transform={
          getTransformForWeekdayLabels() === null
            ? undefined
            : getTransformForWeekdayLabels()
        }
        className={`${CSS_PSEUDO_NAMESPACE}weekday-labels`}
      >
        {renderWeekdayLabels()}
      </g>
    </svg>
  );
};

export default CalendarHeatmap;
