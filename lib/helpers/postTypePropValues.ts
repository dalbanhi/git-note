import { PostType } from "~/types";
export function getPostTypePropValues(postType: PostType) {
  switch (postType) {
    case "workflow":
      return {
        icon: "/icons/workflow.svg",
        backgroundColor: "bg-primary-900",
        textColor: "text-primary-500",
      };
    case "component":
      return {
        icon: "/icons/component.svg",
        backgroundColor: "bg-myPurple-900",
        textColor: "text-myPurple-500",
      };
    case "knowledge":
      return {
        icon: "/icons/knowledge.svg",
        backgroundColor: "bg-myGreen-900",
        textColor: "text-myGreen-500",
      };
    default:
      return {
        icon: "",
        backgroundColor: "",
        textColor: "",
      };
  }
}
