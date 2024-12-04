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

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AssignArbitratorProps = ({
  isOpen,
  setIsOpen,
  searchArbitrator,
  setSearchArbitrator,
  selectedOption,
  setSelectedOption,
  options,
  loading,
  handleSelectArbitrator
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className="rounded-lg shadow-lg"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Arbitrator Details
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            All Arbitrator
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-shrink-0 w-[45%] items-center border rounded-xl p-2 bg-blue-50 border-gray-300">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow outline-none bg-transparent text-sm"
            onChange={(e) => setSearchArbitrator(e.target.value)}
          />
          <button className="text-gray-500 hover:text-gray-700">
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

        <RadioGroup
          value={selectedOption?.arbitrtorid}
          onValueChange={(value) => {
            const selected = options.find(
              (option) => option.arbitrtorid === value
            );
            setSelectedOption(selected);
          }}
        >
          <Table className="pr-6">
            <TableHeader>
              <TableRow>
                <TableHead>Select</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="p-[0px]">Contact No.</TableHead>
                <TableHead className="text-right">Experties</TableHead>
                <TableHead className="text-right">Experience</TableHead>
              </TableRow>
            </TableHeader>
            {options
              .filter((el) => {
                if (!searchArbitrator) return true;
                return (
                  el.arbitratorName.toLowerCase().includes(searchArbitrator) ||
                  el.arbitratorEmail.toLowerCase().includes(searchArbitrator) ||
                  el.arbitratorContactNo
                    .toLowerCase()
                    .includes(searchArbitrator)
                );
              })
              .map((el, index) => (
                <TableBody key={el.arbitrtorid}>
                  <TableRow>
                    <TableCell>
                      <RadioGroupItem
                        type="radio"
                        value={el.arbitrtorid}
                        name="arbitrator"
                      />
                    </TableCell>
                    <TableCell>{el.arbitratorName}</TableCell>
                    <TableCell>{el.arbitratorEmail}</TableCell>
                    <TableCell>{el.arbitratorContactNo}</TableCell>
                    <TableCell className="text-right">
                      {el.arbitratorExperties}
                    </TableCell>
                    <TableCell className="text-right">
                      {el.arbitratorExperience}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
          </Table>
        </RadioGroup>

        <DialogFooter className="mt-6 flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            onClick={handleSelectArbitrator}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            {loading ? "Appointing..." : "Appoint"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignArbitratorProps;
