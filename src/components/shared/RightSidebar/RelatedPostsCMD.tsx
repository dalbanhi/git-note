import React from "react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

interface RelatedPostsCMDProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allOtherPosts?: { title: string; id: string }[];
  addRelatedPost: (postToAdd: string) => void;
}

const RelatedPostsCMD: React.FC<RelatedPostsCMDProps> = ({
  open,
  setOpen,
  allOtherPosts,
  addRelatedPost,
}) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        className="bg-myBlack-700 text-myWhite-100"
        placeholder="Search for a post to add it as related..."
      />
      <CommandList className="customScroll bg-myBlack-900">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Other Posts">
          {allOtherPosts?.map((post) => {
            return (
              <CommandItem
                key={post.id}
                onClick={() => {
                  addRelatedPost(post.id);
                  setOpen(false);
                }}
              >
                <span
                  className="hover:cursor-pointer"
                  onClick={() => {
                    addRelatedPost(post.id);
                    setOpen(false);
                  }}
                >
                  {post.title}
                </span>
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default RelatedPostsCMD;
