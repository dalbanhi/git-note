"use client";
import React, { useEffect, MouseEvent, useState, useReducer } from "react";
import { Command } from "cmdk";
import Image from "next/image";
import { postFilters } from "~/constants";
import { useRouter } from "next/navigation";
import { INote } from "~/models/note";
import { searchPosts } from "~/lib/actions/posts";

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  allUserTags: string[];
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  setIsOpen,
  allUserTags,
}) => {
  const router = useRouter();

  const [matchingPosts, setMatchingPosts] = useState<INote[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getMatchingPosts = async () => {
      setIsLoading(true);
      const relevantPosts = await searchPosts(searchTerm);
      setMatchingPosts(relevantPosts);
      setIsLoading(false);
    };

    const timeoutID = setTimeout(() => {
      getMatchingPosts();
    }, 200);
    return () => {
      if (timeoutID) clearTimeout(timeoutID);
    };
  }, [searchTerm]);

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      //check if the key pressed is the escape key
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [isOpen, setIsOpen]);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };
  console.log("matchingPosts", matchingPosts);
  return (
    <div>
      {isOpen && (
        <div className="cmdk-overlay" onClick={handleOverlayClick}>
          <div className="cmdk-modal" onClick={(e) => e.stopPropagation()}>
            <Command className="rounded-sm bg-myBlack-900" shouldFilter={false}>
              <div className="flex w-full justify-between gap-2 bg-myBlack-700 p-2 text-myWhite-300">
                <div className="flex">
                  <Image
                    src="/icons/search.svg"
                    alt="Search"
                    width={12}
                    height={12}
                  ></Image>
                  <Command.Input
                    className="w-full border-none bg-myBlack-700 p-2 text-myWhite-300 outline-none"
                    placeholder="Search..."
                    autoFocus={true}
                    value={searchTerm}
                    onValueChange={(value) => setSearchTerm(value)}
                  />
                </div>
                <button
                  className="flex items-center justify-center rounded-sm bg-myBlack-800 p-1 text-p4Reg text-myWhite-300 hover:bg-myBlack-600 hover:text-myWhite-100"
                  onClick={() => setIsOpen(false)}
                >
                  {`ESC`}
                </button>
              </div>

              <Command.List className=" customScroll flex h-[200px] flex-col overflow-y-scroll rounded-sm bg-myBlack-800">
                {postFilters && (
                  <Command.Group
                    className="p-2 text-p3Reg text-myWhite-300"
                    heading="Filters"
                  >
                    {postFilters.map((filter) => {
                      return (
                        <Command.Item
                          key={filter.type}
                          //use cmdk-item class to style the items in the list
                          className="flex cursor-pointer items-center gap-2 p-2 text-myWhite-300 hover:bg-myBlack-700 hover:text-myWhite-100"
                          onSelect={() => {
                            setIsOpen(false);
                            router.push(`/explore?type=${filter.type}`);
                          }}
                        >
                          {filter.iconSrc && (
                            <Image
                              src={filter.iconSrc}
                              alt={filter.type}
                              width={12}
                              height={12}
                            ></Image>
                          )}
                          {filter.type}
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                )}
                {allUserTags && (
                  <Command.Group
                    className="p-2 text-p3Reg text-myWhite-300"
                    heading="Tags"
                  >
                    {allUserTags.map((tag) => {
                      return (
                        <Command.Item
                          key={tag + " tag"}
                          //use cmdk-item class to style the items in the list
                          className="flex items-center gap-2 p-2 capitalize text-myWhite-300 hover:bg-myBlack-700 hover:text-myWhite-100"
                          onSelect={() => {
                            setIsOpen(false);
                            router.push(`/explore?tag=${tag}`);
                          }}
                        >
                          {tag}
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                )}

                <Command.Group
                  className="p-2 text-p3Reg text-myWhite-300"
                  heading="Posts"
                  key={"my posts"}
                >
                  {matchingPosts && (
                    <React.Fragment>
                      {isLoading && (
                        <Command.Loading>
                          Loading relevant notes...
                        </Command.Loading>
                      )}
                      {matchingPosts.map((post) => {
                        return (
                          <Command.Item
                            key={post._id}
                            //use cmdk-item class to style the items in the list
                            className="flex items-center gap-2 truncate p-2 text-myWhite-300 hover:bg-myBlack-700 hover:text-myWhite-100"
                            onSelect={() => {
                              setIsOpen(false);
                              router.push(`/note/${post._id}`);
                            }}
                          >
                            <Image
                              src={`/icons/${post.type}.svg`}
                              alt={post.type}
                              width={12}
                              height={12}
                            ></Image>
                            {post.title}
                          </Command.Item>
                        );
                      })}
                    </React.Fragment>
                  )}
                </Command.Group>
              </Command.List>
              <Command.Empty>
                <div className="p-2 text-p3Reg text-myWhite-300">
                  {`No results found for "${searchTerm}".`}
                </div>
              </Command.Empty>
            </Command>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandPalette;
