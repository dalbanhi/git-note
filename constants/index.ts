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
    color: "text-myGreen-500",
    backgroundColor: "bg-myGreen-900",
    iconSrc: "/icons/knowledge.svg",
  },
];

// export const testPosts: Note[] = [
//   {
//     type: NoteType.Workflow,
//     title:
//       "User Authentication with Next-Auth, Clerk, 0Auth and other Most Popular Auth Providers",
//     content:
//       "### Dic quaeque gaudent; \n[illas ambo](http://simulatoremque.org/), virgineos fulgebant vices et frondes [mortisneu](http://www.achaide.net/voluntas-virtute.php) tribus recipit: conloquiumquemagnaeque. Tamen illa pectore!",
//     description:
//       "A mobile navigation that seamlessly reveals a full-height sheet designed to effortlessly accommodate extensive menus.",
//     tags: ["Next-Auth", "Clerk", "0Auth", "Auth Providers"],
//     id: 1,
//     createdAt: new Date("2024-05-01"),
//     updatedAt: new Date("2024-05-01"),
//     numberOfStars: 10,
//     numberOfViews: 100,
//     stepsToFollow: ["This is a step to follow"],
//     resourcesAndLinks: [
//       {
//         resource: "This is a resource",
//         url: "https://www.google.com",
//       },
//     ],
//   },
//   {
//     type: NoteType.Component,
//     title: "Button Component with Hover, Active, Focused States",
//     content:
//       "### Dic quaeque gaudent; \n[illas ambo](http://simulatoremque.org/), virgineos fulgebant vices et frondes [mortisneu](http://www.achaide.net/voluntas-virtute.php) tribus recipit: conloquiumquemagnaeque. Tamen illa pectore!\n\n```javascript\nlet x = 10;\n```\n![An example background image](https://picsum.photos/200)",
//     description:
//       "A mobile navigation that seamlessly reveals a full-height sheet designed to effortlessly accommodate extensive menus.",
//     tags: ["Button", "Hover", "Active", "Focused", "Header"],
//     id: 2,
//     createdAt: new Date("2024-05-01"),
//     updatedAt: new Date("2024-05-01"),
//     numberOfStars: 10,
//     numberOfViews: 100,
//     code: {
//       code: "let x = 10;",
//       codePreviewImage: "https://picsum.photos/200",
//     },
//     resourcesAndLinks: [
//       {
//         resource: "Google",
//         url: "https://www.google.com",
//       },
//       {
//         resource: "Shadcn",
//         url: "https://www.google.com",
//       },
//     ],
//   },
//   {
//     type: NoteType.Knowledge,
//     title: "How does Authentication and Authorization work behind the scenes?",
//     content:
//       "### Dic quaeque gaudent; \n[illas ambo](http://simulatoremque.org/), virgineos fulgebant vices et frondes [mortisneu](http://www.achaide.net/voluntas-virtute.php) tribus recipit: conloquiumquemagnaeque. Tamen illa pectore!",
//     description:
//       "A mobile navigation that seamlessly reveals a full-height sheet designed to effortlessly accommodate extensive menus.",
//     tags: ["Authentication", "Authorization", "Next-Auth"],
//     id: 3,
//     createdAt: new Date("2024-05-01"),
//     updatedAt: new Date("2024-05-01"),
//     numberOfStars: 10,
//     numberOfViews: 100,
//     whatYouLearned: ["This is a step to follow"],
//     resourcesAndLinks: [
//       {
//         resource: "This is a resource",
//         url: "https://www.google.com",
//       },
//     ],
//   },
//   {
//     type: NoteType.Component,
//     title: "Header Component with Logo, Nav Links, and Dropdown Menu",
//     content:
//       "### Dic quaeque gaudent; \n[illas ambo](http://simulatoremque.org/), virgineos fulgebant vices et frondes [mortisneu](http://www.achaide.net/voluntas-virtute.php) tribus recipit: conloquiumquemagnaeque. Tamen illa pectore!",
//     description:
//       "A mobile navigation that seamlessly reveals a full-height sheet designed to effortlessly accommodate extensive menus.",
//     tags: ["Header", "Logo", "Nav Links", "Dropdown Menu"],
//     id: 4,
//     createdAt: new Date("2024-05-01"),
//     updatedAt: new Date("2024-05-01"),
//     numberOfStars: 10,
//     numberOfViews: 100,
//     code: {
//       code: "import React from 'react';",
//       codePreviewImage: "",
//     },
//     resourcesAndLinks: [
//       {
//         resource: "This is a resource",
//         url: "https://www.google.com",
//       },
//     ],
//   },
//   {
//     type: NoteType.Knowledge,
//     title: "Naming Convention",
//     content:
//       "### Dic quaeque gaudent; \n[illas ambo](http://simulatoremque.org/), virgineos fulgebant vices et frondes [mortisneu](http://www.achaide.net/voluntas-virtute.php) tribus recipit: conloquiumquemagnaeque. Tamen illa pectore!",
//     description:
//       "A mobile navigation that seamlessly reveals a full-height sheet designed to effortlessly accommodate extensive menus.",
//     tags: ["Naming Convention"],
//     id: 5,
//     createdAt: new Date("2024-05-01"),
//     updatedAt: new Date("2024-05-01"),
//     numberOfStars: 10,
//     numberOfViews: 100,
//     whatYouLearned: ["This is what you learned"],
//     resourcesAndLinks: [
//       {
//         resource: "This is a resource",
//         url: "https://www.google.com",
//       },
//     ],
//   },
//   {
//     type: NoteType.Workflow,
//     title: "NextAuth OAuth Setup",
//     content:
//       "### Dic quaeque gaudent; \n[illas ambo](http://simulatoremque.org/), virgineos fulgebant vices et frondes [mortisneu](http://www.achaide.net/voluntas-virtute.php) tribus recipit: conloquiumquemagnaeque. Tamen illa pectore!",
//     description:
//       "A mobile navigation that seamlessly reveals a full-height sheet designed to effortlessly accommodate extensive menus.",
//     tags: ["Next-Auth", "OAuth Setup"],
//     id: 6,
//     createdAt: new Date("2024-05-01"),
//     updatedAt: new Date("2024-05-01"),
//     numberOfStars: 10,
//     numberOfViews: 100,
//     stepsToFollow: ["This is a step to follow"],
//     resourcesAndLinks: [
//       {
//         resource: "This is a resource",
//         url: "https://www.google.com",
//       },
//     ],
//   },
//   {
//     type: NoteType.Component,
//     title: "Modal",
//     content:
//       "### Dic quaeque gaudent; \n[illas ambo](http://simulatoremque.org/), virgineos fulgebant vices et frondes [mortisneu](http://www.achaide.net/voluntas-virtute.php) tribus recipit: conloquiumquemagnaeque. Tamen illa pectore!",
//     description:
//       "A mobile navigation that seamlessly reveals a full-height sheet designed to effortlessly accommodate extensive menus.",
//     tags: ["Modal", "Header"],
//     id: 7,
//     createdAt: new Date("2024-05-01"),
//     updatedAt: new Date("2024-05-01"),
//     numberOfStars: 10,
//     numberOfViews: 100,
//     code: {
//       code: "import React from 'react';",
//       codePreviewImage: "",
//     },
//     resourcesAndLinks: [
//       {
//         resource: "This is a resource",
//         url: "https://www.google.com",
//       },
//     ],
//   },
//   {
//     type: NoteType.Component,
//     title: "Search Command",
//     content:
//       "### Dic quaeque gaudent; \n[illas ambo](http://simulatoremque.org/), virgineos fulgebant vices et frondes [mortisneu](http://www.achaide.net/voluntas-virtute.php) tribus recipit: conloquiumquemagnaeque. Tamen illa pectore!",
//     description:
//       "A mobile navigation that seamlessly reveals a full-height sheet designed to effortlessly accommodate extensive menus.",
//     tags: ["Search Command"],
//     id: 8,
//     createdAt: new Date("2024-05-01"),
//     updatedAt: new Date("2024-05-01"),
//     numberOfStars: 10,
//     numberOfViews: 100,
//     code: {
//       code: "import cmd from 'search';",
//       codePreviewImage: "",
//     },
//     resourcesAndLinks: [
//       {
//         resource: "This is a resource",
//         url: "https://www.google.com",
//       },
//     ],
//   },
//   {
//     type: NoteType.Knowledge,
//     title: "Best Practices",
//     content:
//       "### Dic quaeque gaudent; \n[illas ambo](http://simulatoremque.org/), virgineos fulgebant vices et frondes [mortisneu](http://www.achaide.net/voluntas-virtute.php) tribus recipit: conloquiumquemagnaeque. Tamen illa pectore!",
//     description:
//       "A mobile navigation that seamlessly reveals a full-height sheet designed to effortlessly accommodate extensive menus.",
//     tags: ["Best Practices", "Authorization"],
//     id: 9,
//     createdAt: new Date("2024-05-01"),
//     updatedAt: new Date("2024-05-01"),
//     numberOfStars: 10,
//     numberOfViews: 100,
//     // code: "This is a code",
//     whatYouLearned: ["This is what you learned"],
//     // stepsToFollow: ["This is a step to follow"],
//     resourcesAndLinks: [
//       {
//         resource: "This is a resource",
//         url: "https://www.google.com",
//       },
//     ],
//   },
// ];

//put all the tags in the testPosts into a testTags
// let tags: string[] = [];
// for (let post of testPosts) {
//   for (let t of post.tags) {
//     tags.push(t);
//   }
// }
//remove duplicate from tags
// export const testTags = Array.from(new Set(tags));

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
