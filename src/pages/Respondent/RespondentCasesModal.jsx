import React from "react";

import { IoMdCloudDownload, IoMdDownload } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcStart } from "react-icons/fc";

const RespondentCasesModal = ({
  isOpen,
  setIsOpen,
  caseDetails,
  handleInputChange,
  handleMeeting,
  handleDownloadAllAttachment,
  closeDetailsFunc,
  convertToDateNow,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[300px] md:max-w-[380px] h-[90vh] overflow-y-auto scrollbar-hide px-4 rounded-md text-white bg-[#0f2d6b] border-none">
        <DialogHeader>
          <DialogTitle>Details</DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
        <div className="grid gap-2 py-0 mt-[-10px]">
          {/* case Id */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="ticketId" className="text-sm font-normal">
              case ID
            </Label>
            <Input
              value={caseDetails.id}
              disabled={true}
              id="ticketId"
              name="id"
              className="col-span h-[30px] text-black"
              onChange={handleInputChange}
            />
          </div>

          {/* Claimant Name */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="name" className="text-sm font-normal">
              Claimant Name
            </Label>
            <Input
              disabled={true}
              id="client name"
              value={caseDetails.cl_name}
              onChange={handleInputChange}
              className="col-span h-[30px] text-black"
            />
          </div>

          {/* Claimane Email */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="closername" className="text-sm font-normal">
              Claimant Email
            </Label>
            <Input
              id="cl_email"
              disabled={true}
              onChange={handleInputChange}
              name="cl_email"
              value={caseDetails.cl_email}
              className="col-span h-[30px] text-black"
            />
          </div>

          {/* Claimanet Number */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="closername" className="text-sm font-normal">
              Claimant Number
            </Label>
            <Input
              id="cl_email"
              disabled={true}
              onChange={handleInputChange}
              name="cl_num"
              value={caseDetails.cl_num}
              className="col-span h-[30px] text-black"
            />
          </div>

          {/* Respondent Name */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="res name" className="text-sm font-normal">
              Respondent Name
            </Label>
            <Input
              disabled={true}
              id="res_name"
              value={caseDetails.res_name}
              onChange={handleInputChange}
              className="col-span h-[30px] text-black"
            />
          </div>

          {/* Arbitrator Name */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="arb_name" className="text-sm font-normal">
              Arbitrator Name
            </Label>
            <Input
              disabled={true}
              id="arb_name"
              value={caseDetails.arb_name}
              onChange={handleInputChange}
              className="col-span h-[30px] text-black"
            />
          </div>

          {/* Arbitrator Email */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="arb_name" className="text-sm font-normal">
              Arbitrator Email
            </Label>
            <Input
              disabled={true}
              id="arb_email"
              value={caseDetails.arb_email}
              onChange={handleInputChange}
              className="col-span h-[30px] text-black"
            />
          </div>

          <div>
            {/* Attachment */}
            <div className="flex justify-between px-4 border-b-[2px] border-gray-700 border-spacing-1 mt-4 mb-2">
              <Label htmlFor="attachment" className="text-sm font-normal">
                Attachment
              </Label>
              {caseDetails.attach.length > 0 ? (
                <IoMdDownload
                  className="cursor-pointer text-[20px]"
                  onClick={() =>
                    handleDownloadAllAttachment(caseDetails.attach)
                  }
                />
              ) : (
                <p className="text-sm">No Attachment</p>
              )}
            </div>
          </div>

          <div>
            {/* Meetings */}
            <div className="flex justify-between px-4 border-b-[2px] border-gray-700 border-spacing-1 mt-4">
              <Label htmlFor="awards" className="text-sm font-normal">
                Meetings
              </Label>

              {caseDetails.meetings.length > 0 &&
              convertToDateNow(
                caseDetails.meetings[caseDetails?.meetings.length - 1].end
              ) > Date.now() ? (
                <div
                  onClick={() =>
                    handleMeeting(
                      caseDetails.meetings[caseDetails?.meetings.length - 1]
                    )
                  }
                  className="flex cursor-pointer"
                >
                  <FcStart className="text-3xl" />
                  <span className="font-md font-semibold">Start</span>
                </div>
              ) : caseDetails.meetings.length > 0 ? (
                <p className="text-sm">Completed</p>
              ) : (
                <p className="text-sm">Not Scheduled</p>
              )}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={closeDetailsFunc}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RespondentCasesModal;
