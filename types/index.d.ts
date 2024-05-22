export type PostType = "knowledge" | "component" | "workflow" | "all";

export interface Contribution {
  id: number;
  date: string;
  count: number;
}

interface UserContributions {
  contributions: Contribution[];
  userID: number;
}

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
