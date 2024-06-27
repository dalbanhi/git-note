import { UserContributions } from "~/types";
import { Note } from "~/types";

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
    iconSrc: "/icons/workflow.svg",
  },
  {
    type: "Component",
    label: "Component",
    color: "text-myPurple-500",
    backgroundColor: "bg-myPurple-900",
    iconSrc: "/icons/component.svg",
  },
  {
    type: "Knowledge",
    label: "Knowledge",
    color: "text-myGreen-400",
    backgroundColor: "bg-myGreen-900",
    iconSrc: "/icons/knowledge.svg",
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

export const TechStackOptions = [
  "React.js",
  "Tailwind CSS",
  "VS Code",
  "Vite",
  "Git",
  "GitHub",
  "Netlify",
];

export const TechStackOptionsWithIcons = [
  {
    name: "React.js",
    iconSrc: "/tech-stack-icons/react.svg",
  },
  {
    name: "Tailwind CSS",
    iconSrc: "/tech-stack-icons/tailwind.svg",
  },
  {
    name: "VS Code",
    iconSrc: "/tech-stack-icons/vscode.svg",
  },
  {
    name: "Vite",
    iconSrc: "/tech-stack-icons/vite.svg",
  },
  {
    name: "Git",
    iconSrc: "/tech-stack-icons/git.svg",
  },
  {
    name: "GitHub",
    iconSrc: "/tech-stack-icons/github.svg",
  },
  {
    name: "Netlify",
    iconSrc: "/tech-stack-icons/netlify.svg",
  },
];

export const socialMediaSites = [
  "twitter",
  "instagram",
  "facebook",
  "linkedin",
  "github",
  "website",
];
