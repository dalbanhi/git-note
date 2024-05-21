import { UserContributions } from "~/types";

export enum NoteType {
  Knowledge = "knowledge",
  Component = "component",
  Workflow = "workflow",
}

export const testPosts = [
  {
    type: NoteType.Workflow,
    title:
      "User Authentication with Next-Auth, Clerk, 0Auth and other Most Popular Auth Providers",
    content: "This is a content",
    tags: ["Next-Auth", "Clerk", "0Auth", "Auth Providers"],
    id: 1,
  },
  {
    type: NoteType.Component,
    title: "Button Component with Hover, Active, Focused States",
    content: "This is a content",
    tags: ["Button", "Hover", "Active", "Focused"],
    id: 2,
  },
  {
    type: NoteType.Knowledge,
    title: "How does Authentication and Authorization work behind the scenes?",
    content: "This is a content",
    tags: ["Authentication", "Authorization"],
    id: 3,
  },
];

//react heatmap constants
export const MILLISECONDS_IN_ONE_DAY = 24 * 60 * 60 * 1000;

export const DAYS_IN_WEEK = 7;

export const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const testContributions: UserContributions = {
  userID: 1,
  contributions: [
    {
      id: 1,
      date: "2024/05/01",
      count: 1,
    },
    {
      id: 2,
      date: "2024/05/02",
      count: 2,
    },
    {
      id: 3,
      date: "2024/05/03",
      count: 3,
    },
    {
      id: 4,
      date: "2024/05/04",
      count: 4,
    },
    {
      id: 5,
      date: "2024/05/05",
      count: 5,
    },
  ],
};
