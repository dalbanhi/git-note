import { TechStackOptions } from "~/constants";
export type PostType =
  | "knowledge"
  | "component"
  | "workflow"
  | "all"
  | undefined;

export interface LearningGoal {
  done: boolean;
  goal: string;
}

export interface SocialMediaLink {
  username: string;
  url: string;
  site: string;
}

export type TechStackType = typeof TechStackOptions;

export interface ScheduleAvailability {
  startDate: Date;
  endDate: Date;
  available: boolean;
}

export interface ResourcesAndLinks {
  resource: string;
  url: string;
}

export interface Contribution {
  id: number;
  date: string;
  count: number;
}

interface UserContributions {
  contributions: Contribution[];
  userID: number;
}

interface Code {
  code: string;
  codePreviewImage?: string;
}

export interface NoteReference {
  title: string;
  id: string;
}

export interface Note {
  _id?: string;
  type: NoteType;
  title: string;
  content: string;
  description: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  stars: number;
  views: number;
  code?: Code;
  whatYouLearned?: string[];
  stepsToFollow?: string[];
  resourcesAndLinks: ResourcesAndLinks[];
  creator: string;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
