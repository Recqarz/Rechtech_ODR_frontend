import React from "react";

const SearchByDataProps = ({ handleSearchData }) => {
  return (
    <div className="w-[30%] md:w-[20%] flex items-center border rounded-md p-1 bg-blue-50 border-black">
      <input
        type="text"
        placeholder="Search here"
        className="flex-grow outline-none bg-transparent px-2 py-0.5 text-sm"
        onChange={handleSearchData}
      />
      <button className="text-gray-500 hover:text-gray-700 hidden md:hidden xl:block">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M17.5 10.5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchByDataProps;
