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
import { Checkbox } from "@/components/ui/checkbox";
import { FcVideoCall } from "react-icons/fc";

const FilterAllData = ({
  setSearchByFileName,
  uniqueFileName,
  searchByData,
  setSearchByData,
  arbitratorCaseData,
  setCaseId,
  setCaseIdForMeeting,
  selectAllClientStatus,
  setSelectAllClientStatus,
  isClickedForMultiple,
  setIsClickedForMultiple,
  handleAllClientForMeeting,
  handleUploadFunctionbulk,
  caseIdForMeeting,
}) => {
  return (
    <div className="grid grid-cols-[1fr,1fr] md:grid-cols-[1fr,1fr,1fr] lg:grid-cols-[140px,140px,120px,100px,1fr] gap-3 px-3 mt-12 md:mt-0">
      {/* Filter by file name */}
      <div className="mt-1">
        <Select
          // id="name"
          className="w-full"
          onValueChange={(e) => setSearchByFileName(e)}
        >
          <SelectTrigger className="w-full bg-blue-50 text-sm h-8">
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

      <div className="relative h-[32px] mt-[5px] md:mt-1">
        <Input
          className="w-full h-full  rounded-md placeholder:font-semibold"
          placeholder="Search here"
          value={searchByData}
          onChange={(e) => setSearchByData(e.target.value)}
        />
        <IoSearch className="absolute top-[25%] right-4 text-lg text-blue-700" />
      </div>

      {arbitratorCaseData.length > 0 ? (
        <div className="flex gap-2 items-center text-white mt-0 md:mt-1">
          <Checkbox
            className="bg-white"
            onClick={() => {
              setIsClickedForMultiple(!isClickedForMultiple);
              setSelectAllClientStatus(false);
              setCaseId("");
              setCaseIdForMeeting([]);
            }}
            checked={isClickedForMultiple}
          />
          <p className="text-sm font-semibold">Select Multiple</p>
        </div>
      ) : (
        ""
      )}

      {isClickedForMultiple ? (
        <div className="flex gap-2 items-center mt-0 lg:mt-1 text-white">
          <Checkbox
            className="bg-white"
            value="allclient"
            checked={selectAllClientStatus}
            onClick={handleAllClientForMeeting}
          />
          <p className="text-sm font-semibold">Select All</p>
        </div>
      ) : null}

      {caseIdForMeeting.length > 0 && isClickedForMultiple ? (
        <div className="flex gap-1 items-center text-white mt-0 lg:mt-2">
          <FcVideoCall
            onClick={handleUploadFunctionbulk}
            style={{
              fontSize: "30px",
              cursor: "pointer",
            }}
          />
          <p className="text-sm font-semibold">Schedule Meeting</p>
        </div>
      ) : null}
    </div>
  );
};

export default FilterAllData;
