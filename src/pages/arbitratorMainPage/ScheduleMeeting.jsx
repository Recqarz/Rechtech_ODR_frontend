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
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const ScheduleMeeting = ({
  isOpen,
  setIsOpen,
  title,
  setTitle,
  selectStartDate,
  setSelectStartDate,
  handleDurationChange,
  loading,
  handleScheduleFunc,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent 
      className="max-w-[300px] md:max-w-[480px] p-6 rounded-lg shadow-lg h-[90vh] lg:h-[70vh] overflow-y-auto scrollbar-hide"
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="mr-6 md:mr-0 text-lg font-semibold text-gray-800">
            Schedule Meeting
          </DialogTitle>
          <div className="space-y-4">
            <DialogDescription className="text-sm text-gray-900">
              <Label className="mr-4 md:mr-0 block text-sm font-medium">
                Title:
              </Label>
              <Input
                type="text"
                className="mt-3 w-[95%]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogHeader className="space-y-2 -ml-2 md:ml-0">
          <DialogTitle className="mr-2 md:mr-0 text-md text-gray-800">
            Time
          </DialogTitle>
          <div className="flex flex-col md:flex-row gap:0 md:gap-10 items-center w-[95%] ml-2 md:ml-0">
            <Label className="text-xs md:text-sm text-gray-700 my-2 w-[160px] md:w-auto">
              Start Date and Time
            </Label>
            <DatePicker
            className="w-[100%] md:w-auto text-xs md:text-sm"
              selected={selectStartDate}
              onChange={(date) => setSelectStartDate(date)}
              showTimeSelect
              dateFormat="Pp"
              minDate={new Date()}
              minTime={
                selectStartDate &&
                selectStartDate.toDateString() === new Date().toDateString()
                  ? new Date()
                  : new Date().setHours(0, 0)
              }
              maxTime={new Date().setHours(23, 59)}
              customInput={<Input type="datetime" />}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-20 items-center">
            <Label className="text-xs md:text-sm font-medium text-gray-700 w-[160px] md:w-auto">
              Time Duration
            </Label>
            <Select 
            onValueChange={handleDurationChange}>
              <SelectTrigger className="-mt-2 md:mt-2 ml-2 md:ml-0 w-[65%] md:w-[180px] text-xs md:text-sm">
                <SelectValue placeholder="Select Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </DialogHeader>

        <DialogFooter className="w-[50%] md:w-auto mt-6 flex justify-end ml-16 md:ml-0">
          <Button
            type="submit"
            disabled={loading}
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            onClick={handleScheduleFunc}
          >
            {loading ? "Scheduling..." : "Schedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleMeeting;
