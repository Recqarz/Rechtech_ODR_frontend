import React from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  // Generate array of page numbers to display dynamically
  const getPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex justify-center text-center gap-5 mt-5">
      <div className="text-white p-1 flex items-center space-x-2">
        {/* First page */}
        <button
          className={`border px-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-700 hover:text-white"
          }`}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          ⟪
        </button>

        {/* Previous page */}
        <button
          className={`border px-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-700 hover:text-white"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ⟨
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            className={`px-2 rounded border-[1px] ${
              currentPage === pageNum
                ? "bg-blue-600 text-white"
                : "bg-white hover:bg-gray-800 text-black hover:text-white"
            }`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))}

        {totalPages > 3 && currentPage < totalPages - 2 && (
          <span className="text-white">...</span>
        )}

        {/* Next page */}
        <button
          className={`border px-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-700 hover:text-white"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ⟩
        </button>

        {/* Last page */}
        <button
          className={`border px-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-700 hover:text-white"
          }`}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          ⟫
        </button>
      </div>

      <div className="flex items-center">
        <label className="text-white flex items-center">
          Rows Per page
          <select
            value={rowsPerPage}
            onChange={onRowsPerPageChange}
            className="ml-2 px-2 rounded bg-white text-black"
          >
            {[5, 10, 20, 30, 40, 50, 100, 500].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Pagination;
