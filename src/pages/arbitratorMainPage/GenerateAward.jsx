import React from "react";
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

const GenerateAward = ({
  isOpen3,
  setIsOpen3,
  file,
  setFile,
  handleAwardGenerateFunc,
}) => {
  return (
    <Dialog open={isOpen3} onOpenChange={setIsOpen3}>
      <DialogContent className="max-w-[280px] md:max-w-[480px] p-6 rounded-lg shadow-lg h-[90vh] lg:h-[70vh] overflow-y-auto scrollbar-hide">
        <DialogHeader className="mb-4">
          <DialogTitle className="w-[100%] md:w-auto text-lg font-semibold text-gray-800">
            Upload the Award sheet.
          </DialogTitle>

          <div className="space-y-4">
            <DialogDescription className="w-[100%] md:w-auto text-sm text-red-500 font-semibold">
              Only PDF file is Allowed!
            </DialogDescription>
          </div>

          <div className="flex flex-col">
            <Label className="block text-sm font-medium text-gray-700 mb-1 mt-5">
              PDF File <span className="text-red-500">*</span>
            </Label>
            <label
              htmlFor="uploadFile1"
              className="w-[200px] md:w-[300px] ml-[20px] md:ml-[120px] lg:ml-[120px] mt-0 md:mt-[-15px] bg-white text-gray-500 font-semibold text-base rounded h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]"
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
                accept=".pdf"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                id="uploadFile1"
                className="hidden"
              />
              <p className="text-xs font-medium text-gray-400 mt-2">
                Only .pdf file is allowed.
              </p>
            </label>
            {file ? (
              <div className="text-sm text-gray-600 mt-2 text-center">
                Selected file: {file.name}
              </div>
            ) : null}
          </div>
        </DialogHeader>

        <DialogFooter className="mt-6 flex justify-end">
          <Button
            type="submit"
            className="w-[80%] md:w-auto ml-7 md:ml-0 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            onClick={handleAwardGenerateFunc}
          >
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateAward;
