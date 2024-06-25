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
      <CommandInput placeholder="Search for a post to add it as related..." />
      <CommandList className="customScroll">
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Other Posts">
          {allOtherPosts?.map((post) => {
            return (
              <CommandItem key={post.id}>
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
