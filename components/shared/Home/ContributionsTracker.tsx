import React from "react";

interface Contribution {
  id: number;
  date: string;
  count: number;
}

interface UserContributions {
  contributions: Contribution[];
  userID: number;
}

const ContributionsTracker = () => {
  const testContributions: UserContributions = {
    userID: 1,
    contributions: [
      {
        id: 1,
        date: "2024-05-01",
        count: 1,
      },
      {
        id: 2,
        date: "2024-05-02",
        count: 2,
      },
      {
        id: 3,
        date: "2024-05-03",
        count: 3,
      },
    ],
  };

  const { contributions, userID } = testContributions;

  const getContributionsMap = (contributions: Contribution[]) => {
    const map: { [key: string]: number } = {};
    contributions.forEach((contribution) => {
      map[contribution.date] = contribution.count;
    });
    return map;
  };

  const contributionsMap = getContributionsMap(contributions);

  const generateCalendar = () => {
    const today = new Date();
    const startDate = new Date(today.getFullYear(), today.getMonth() - 11, 1);
    const days = [];

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateString = d.toISOString().split("T")[0];
      days.push({
        date: dateString,
        count: contributionsMap[dateString] || 0,
      });
    }

    return days;
  };

  const days = generateCalendar();
  const weeks: { date: string; count: number }[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const renderWeek = (week: { date: string; count: number }[]) => {
    return (
      <div className="flex gap-2">
        {week.map((day, index) => {
          return (
            <div
              key={index}
              className={`size-2  rounded-md text-subtitle ${
                day.count > 0 ? "bg-myGreen-500" : "bg-myWhite-500"
              }`}
            >
              {day.date}
            </div>
          );
        })}
      </div>
    );
  };

  //get current month
  const month = new Date().toLocaleString("default", { month: "long" });
  //get months from current month to 12 months ago
  const months = [];
  for (let i = 13; i > 1; i--) {
    months.push(
      new Date(new Date().setMonth(new Date().getMonth() - i)).toLocaleString(
        "default",
        { month: "short" }
      )
    );
  }

  //get days of the week
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className=" flex flex-col border border-myWhite-300 bg-myBlack-900 p-4">
      <div className="mt-4 flex justify-around gap-2">
        {months.map((month, index) => {
          return (
            <div key={index} className="text-p4Med text-myWhite-300">
              {month}
            </div>
          );
        })}
      </div>
      <div className="flex">
        <div className="flex flex-col gap-2">
          {daysOfWeek.map((day, index) => {
            return (
              <div key={index} className="text-p4Med text-myWhite-300">
                {day}
              </div>
            );
          })}
        </div>
        {/* <div className="grid grid-cols-7 gap-2">
          {weeks.map((week, index) => {
            return <div key={index}>{renderWeek(week)}</div>;
          
        </div> */}
      </div>
    </div>
  );
};

export default ContributionsTracker;
