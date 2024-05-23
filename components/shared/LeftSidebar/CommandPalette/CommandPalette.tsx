"use client";
import React, { useEffect, MouseEvent } from "react";
import { Command } from "cmdk";
import Image from "next/image";
import { postFilters, testTags } from "~/constants";
import { useRouter } from "next/navigation";

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const router = useRouter();

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

  return (
    <div>
      {isOpen && (
        <div className="cmdk-overlay" onClick={handleOverlayClick}>
          <div className="cmdk-modal" onClick={(e) => e.stopPropagation()}>
            <Command className="rounded-sm bg-myBlack-900">
              <div className="flex w-full justify-between gap-2 bg-myBlack-700 p-2 text-myWhite-300">
                <div className="flex">
                  <Image
                    src="/search-icon.svg"
                    alt="Search"
                    width={12}
                    height={12}
                  ></Image>
                  <Command.Input
                    className="w-full bg-myBlack-700 p-2 text-myWhite-300 outline-none"
                    placeholder="Search..."
                    autoFocus={true}
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
                {testTags && (
                  <Command.Group
                    className="p-2 text-p3Reg text-myWhite-300"
                    heading="Tags"
                  >
                    {testTags.map((tag) => {
                      return (
                        <Command.Item
                          key={tag}
                          //use cmdk-item class to style the items in the list
                          className="flex items-center gap-2 p-2 text-myWhite-300 hover:bg-myBlack-700 hover:text-myWhite-100"
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
              </Command.List>
              <Command.Empty>
                <div className="p-2 text-p3Reg text-myWhite-300">
                  No results found.
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
