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
    color: "text-myGreen-500",
    backgroundColor: "bg-myGreen-900",
    iconSrc: "/icons/knowledge.svg",
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
    tags: ["Button", "Hover", "Active", "Focused", "Header"],
    id: 2,
  },
  {
    type: NoteType.Knowledge,
    title: "How does Authentication and Authorization work behind the scenes?",
    content: "This is a content",
    tags: ["Authentication", "Authorization", "Next-Auth"],
    id: 3,
  },
  {
    type: NoteType.Component,
    title: "Header Component with Logo, Nav Links, and Dropdown Menu",
    content: "This is a content",
    tags: ["Header", "Logo", "Nav Links", "Dropdown Menu"],
    id: 4,
  },
  {
    type: NoteType.Knowledge,
    title: "Naming Convention",
    content: "This is a content",
    tags: ["Naming Convention"],
    id: 5,
  },
  {
    type: NoteType.Workflow,
    title: "NextAuth OAuth Setup",
    content: "This is a content",
    tags: ["Next-Auth", "OAuth Setup"],
    id: 6,
  },
  {
    type: NoteType.Component,
    title: "Modal",
    content: "This is a content",
    tags: ["Modal", "Header"],
    id: 7,
  },
  {
    type: NoteType.Component,
    title: "Search Command",
    content: "This is a content",
    tags: ["Search Command"],
    id: 8,
  },
  {
    type: NoteType.Knowledge,
    title: "Best Practices",
    content: "This is a content",
    tags: ["Best Practices", "Authorization"],
    id: 9,
  },
];

//put all the tags in the testPosts into a testTags
let tags: string[] = [];
for (let post of testPosts) {
  for (let t of post.tags) {
    tags.push(t);
  }
}
//remove duplicate from tags
export const testTags = Array.from(new Set(tags));

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
  "Next.js",
  "Tailwind CSS",
  "VS Code",
];
