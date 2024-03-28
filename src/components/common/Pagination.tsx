import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const visiblePages = 3;
  const pages = Array.from({ length:10 }, (_, index) => index + 1);

  const startPage = Math.max(currentPage - Math.floor(visiblePages / 2), 1);
  const endPage = Math.min(startPage + visiblePages - 1, totalPages);

  return (
    <div className="flex justify-center mb-3 mt-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="mx-1 px-3 py-1 rounded bg-white  hover:bg-black hover:text-white"
        >
          Prev
        </button>
      )}

      {pages.slice(startPage - 1, endPage).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`mx-1 px-3 py-1 rounded ${
            currentPage === page ? "bg-blue-500 text-white" : "bg-white text-black"
          } hover:bg-blue-700 hover:text-white`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="mx-1 px-3 py-1 rounded bg-white  hover:bg-black hover:text-white"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
