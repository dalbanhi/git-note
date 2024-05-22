"use client";
import React, { useState, useEffect, KeyboardEvent, MouseEvent } from "react";
import { Command } from "cmdk";
import Image from "next/image";
import { postFilters } from "~/constants";
import { useRouter } from "next/navigation";

interface CommandPaletteProps {}

const CommandPalette: React.FC<CommandPaletteProps> = () => {
  const router = useRouter();
  // console.log(postFilters);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: any) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setOpen((open) => !open);
  };

  return (
    <div>
      {open && (
        <div className="cmdk-overlay" onClick={handleOverlayClick}>
          <div className="cmdk-modal" onClick={(e) => e.stopPropagation()}>
            <Command className="bg-myBlack-900">
              <div className="flex w-full justify-between gap-2 bg-myBlack-700 p-2 text-myWhite-300">
                <div className="flex">
                  <Image
                    src="/search-icon.svg"
                    alt="Search"
                    width={12}
                    height={12}
                  ></Image>
                  <Command.Input
                    className="w-full bg-myBlack-700 p-2 text-myWhite-300"
                    placeholder="Search..."
                  />
                </div>
                <button
                  className="flex items-center justify-center rounded-sm bg-myBlack-800 p-1 text-p4Reg text-myWhite-300 hover:bg-myBlack-600 hover:text-myWhite-100"
                  onClick={() => setOpen(false)}
                >
                  {`ESC`}
                </button>
              </div>

              <Command.List className="flex flex-col bg-myBlack-800">
                {postFilters &&
                  postFilters.map((filter) => {
                    return (
                      <Command.Item
                        key={filter.type}
                        className="flex items-center gap-2 p-2 text-myWhite-300 hover:bg-myBlack-700 hover:text-myWhite-100"
                        onSelect={() => {
                          console.log("Filter selected", filter.type);
                          setOpen(false);
                          router.push(`/explore?filter=${filter.type}`);
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
              </Command.List>
            </Command>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandPalette;
