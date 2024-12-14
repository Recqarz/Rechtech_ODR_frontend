import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { IoSearch } from "react-icons/io5";

const ClientFilter = ({
  uniqueFileName,
  setSearchByFileName,
  searchData,
  handleSearchData,
  setAssignNotAssignArbitrator,
}) => {
  return (
    <div className="grid grid-cols-[1fr,1fr] md:grid-cols-[1fr,1fr,1fr] lg:grid-cols-[150px,140px,160px] gap-3 px-3 mt-12 md:mt-0">
      {/* Filter by file name */}
      <div className="mt-1">
        <Select
          className="w-full"
          onValueChange={(e) => setSearchByFileName(e)}
        >
          <SelectTrigger className="w-full text-sm h-8">
            <SelectValue placeholder="File Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key="all" value="all">
                All
              </SelectItem>
              <SelectItem key="Single Case" value="singlecase">
                Single Case
              </SelectItem>
              {uniqueFileName?.map((item) => {
                if (item.isFileUpload) {
                  return (
                    <SelectItem key={item._id} value={item.fileName}>
                      {item.fileName}
                    </SelectItem>
                  );
                }
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* filter by assign or not assign arbitrator */}

      <div className="mt-1">
        <Select
          id="name"
          className="w-full"
          onValueChange={(e) => setAssignNotAssignArbitrator(e)}
        >
          <SelectTrigger className="w-full text-sm h-8">
            <SelectValue placeholder="Arbitrator" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem key="all" value="all">
                All
              </SelectItem>
              <SelectItem key="assign arbitrator" value="assigned">
                Assigned Arbitrator
              </SelectItem>
              <SelectItem key="not assign arbitrator" value="notassigned">
                Not Assigned Arbitrator
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* search by data */}
      <div className="relative h-[32px] mt-[5px] md:mt-1">
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

export default ClientFilter;
