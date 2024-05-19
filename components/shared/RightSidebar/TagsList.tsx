import React from "react";

const TagsList = () => {
  const testTags = [
    "Authentication",
    "Next.js",
    "Next.js setup",
    "ESLint/Prettier",
    "Header",
    "Clerk",
    "Middleware",
    "Deployment",
    "Hooks",
    "React Setup",
    "Database",
    "MongoDB",
  ];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-p3Bold">Tags</p>
      <div className="flex flex-col gap-2">
        {testTags.map((tag, index) => {
          return (
            <span
              key={index}
              className="w-fit rounded-md bg-myBlack-700 p-1 text-p3Med text-myWhite-300 hover:cursor-pointer hover:text-myWhite-100"
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default TagsList;
