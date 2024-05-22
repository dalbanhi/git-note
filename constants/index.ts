import { UserContributions } from "~/types";

export enum NoteType {
  Knowledge = "knowledge",
  Component = "component",
  Workflow = "workflow",
}

//filter constants
export const postFilters = [
  {
    type: "WorkFlow",
    label: "WorkFlow",
    color: "text-primary-500",
    backgroundColor: "bg-primary-900",
    iconSrc: "/workflow-icon.svg",
  },
  {
    type: "Component",
    label: "Component",
    color: "text-myPurple-500",
    backgroundColor: "bg-myPurple-900",
    iconSrc: "/component-icon.svg",
  },
  {
    type: "Knowledge",
    label: "Knowledge",
    color: "text-myGreen-500",
    backgroundColor: "bg-myGreen-900",
    iconSrc: "/knowledge-icon.svg",
  },
];

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

//user contributions constants

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
