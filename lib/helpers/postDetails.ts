export function getPostDetails(post: any) {
  let icon = "";
  let backgroundColor = "";
  let textColor = "";
  if (post.type === "workflow") {
    icon = "/icons/workflow.svg";
    backgroundColor = "bg-primary-900";
    textColor = "text-primary-500";
  }
  if (post.type === "component") {
    icon = "/icons/component.svg";
    backgroundColor = "bg-myPurple-900";
    textColor = "text-myPurple-500";
  }
  if (post.type === "knowledge") {
    icon = "/icons/knowledge.svg";
    backgroundColor = "bg-myGreen-900";
    textColor = "text-myGreen-500";
  }

  return { icon, backgroundColor, textColor };
}
