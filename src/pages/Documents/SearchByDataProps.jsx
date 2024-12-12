import React from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "@/components/ui/input";

const SearchByDataProps = ({ searchData, handleSearchData }) => {
  return (
    <div className="flex justify-end px-3">
      <div className="relative w-[230px] md:w-[280px] h-[32px] mt-[5px] md:mt-0">
        <Input
          className="w-full h-full  rounded-md placeholder:font-semibold"
          placeholder="Search here"
          value={searchData}
          onChange={handleSearchData}
        />
        <IoSearch className="absolute top-[25%] right-4 text-lg text-blue-700" />
      </div>
    </div>
  );
};

export default SearchByDataProps;
