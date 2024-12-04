import React from "react";
import CreatableSelect from "react-select/creatable";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UploadCaseBulkProps = ({
  isOpen,
  setIsOpen,
  formattedDate,
  options,
  selectedOption,
  handleChange,
  handleInputChange,
  disputeType,
  setDisputeType,
  setFile,
  message,
  setMessage,
  handleUpload

}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="sm:max-w-[480px] p-6 rounded-lg shadow-lg"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            File Details
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            File Name: <span className="font-medium text-gray-800">Excel</span>
            <br />
            Date:{" "}
            <span className="font-medium text-gray-800">{formattedDate}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label
              htmlFor="status"
              className="text-sm font-medium text-gray-700 sm:col-span-1"
            >
              Client Email <span className="text-red-500">*</span>
            </Label>
            <div className="sm:col-span-3">
              <CreatableSelect
                options={options}
                value={selectedOption}
                onChange={handleChange}
                onInputChange={handleInputChange}
                placeholder="Search for an email..."
                isSearchable
                filterOption={null}
                className="text-sm"
                isValidNewOption={() => false}
                noOptionsMessage={() => "No matching email found"}
              />
              {selectedOption && (
                <p className="text-sm text-green-600 mt-1">
                  You selected: {selectedOption.label.split("/")[1]}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label
              htmlFor="status"
              className="text-sm font-medium text-gray-700 sm:col-span-1"
            >
              Dispute Type <span className="text-red-500">*</span>
            </Label>
            <div className="sm:col-span-3">
              <Input
                type="text"
                placeholder="Enter Dispute Type"
                value={disputeType}
                onChange={(e) => setDisputeType(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <Label className="block text-sm font-medium text-gray-700 mb-1">
              Excel File <span className="text-red-500">*</span>
            </Label>
            <label
              htmlFor="uploadFile1"
              className="w-[200px] md:w-[300px] ml-[100px] md:ml-[120px] lg:ml-[120px] mt-[-15px] bg-white text-gray-500 font-semibold text-base rounded h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-11 mb-2 fill-gray-500"
                viewBox="0 0 32 32"
              >
                <path
                  d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                  data-original="#000000"
                />
                <path
                  d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                  data-original="#000000"
                />
              </svg>
              Upload file
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setMessage(e.target.files[0]);
                }}
                id="uploadFile1"
                className="hidden"
              />
              <p className="text-xs font-medium text-gray-400 mt-2">
                Only .xlsx file is Allowed.
              </p>
            </label>
            {message && (
              <div className="text-sm text-gray-600 mt-2 text-center">
                Selected file: {message.name}
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="mt-6 flex justify-end">
          <Button
            type="submit"
            onClick={handleUpload}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadCaseBulkProps;
