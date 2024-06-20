"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import React from "react";

interface PaginationButtonsProps {
  page: string | undefined;
  totalPages: number;
}

const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  page,
  totalPages,
}) => {
  const pageNum = parseInt(page || "1");
  return (
    <Pagination>
      <PaginationContent>
        {pageNum !== 1 && (
          <PaginationItem>
            <PaginationLink
              className="bg-myBlack-700 hover:bg-myBlack-600"
              href={`/?page=${pageNum - 1}`}
            >
              Prev
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <p className="text-p3Med text-myWhite-300">
            {page} /{totalPages}{" "}
          </p>
        </PaginationItem>

        {pageNum !== totalPages && (
          <PaginationItem>
            <PaginationLink
              className="bg-myBlack-700 hover:bg-myBlack-600"
              href={`/?page=${pageNum + 1}`}
            >
              Next
            </PaginationLink>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationButtons;
