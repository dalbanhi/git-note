"use client";
import React, { useState } from "react";
import PostCard from "./PostCard";
import { Note } from "~/types";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginatedPostsProps {
  posts: string;
}

const PaginatedPosts: React.FC<PaginatedPostsProps> = ({ posts }) => {
  const postsPerPage = 3;
  const allPosts = JSON.parse(posts) as Note[];
  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(postsPerPage);

  return (
    <React.Fragment>
      {allPosts.slice(startIndex, endIndex).map((post) => {
        return <PostCard key={post.id} post={post} isShort={false} />;
      })}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setStartIndex(startIndex - postsPerPage);
                setEndIndex(endIndex - postsPerPage);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <p className="text-p3Med text-myWhite-300">
              {endIndex / postsPerPage} of {totalPages}
            </p>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                endIndex >= allPosts.length
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => {
                setStartIndex(startIndex + postsPerPage);
                setEndIndex(endIndex + postsPerPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </React.Fragment>
  );
};

export default PaginatedPosts;
