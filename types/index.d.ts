import { TechStackOptions } from "~/constants";
export type PostType = "knowledge" | "component" | "workflow" | "all";

export interface LearningGoal {
  done: boolean;
  goal: string;
}

export interface SocialMediaLink {
  username: string;
  url: string;
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

export interface Note {
  type: NoteType;
  title: string;
  content: string;
  description: string;
  tags: string[];
  id?: number;
  createdAt: Date;
  updatedAt: Date;
  numberOfStars: number;
  numberOfViews: number;
  code?: Code;
  whatYouLearned?: string[];
  stepsToFollow?: string[];
  resourcesAndLinks: ResourcesAndLinks[];
  creator: number;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
