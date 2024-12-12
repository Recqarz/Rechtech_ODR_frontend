import React from "react";
import { Input } from "@/components/ui/input";
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
import { IoMdCloudDownload, IoMdDownload } from "react-icons/io";
import { IoEye, IoSearch } from "react-icons/io5";

const DocumentsModal = ({
  isOpen,
  
  setIsOpen,
  documentDetail,
  handleInputChange,
  handleDownloadAll,
  handleDownloadAllorder,
  handleDownloadAward,
  handleRecordings,
  closeDetailsFunc,
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
              value={documentDetail.id}
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
              value={documentDetail.cl_name}
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
              value={documentDetail.cl_email}
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
              value={documentDetail.cl_num}
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
              value={documentDetail.res_name}
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
              value={documentDetail.arb_name}
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
              value={documentDetail.arb_email}
              onChange={handleInputChange}
              className="col-span h-[30px] text-black"
            />
          </div>

          {/* Attachment */}
          <div className="flex justify-between px-4 border-b-[2px] border-gray-700 border-spacing-1 mt-4">
            <Label htmlFor="attachment" className="text-sm font-normal">
              Attachment
            </Label>
            {documentDetail.attach.length > 0 ? (
              <IoMdDownload
                className="cursor-pointer text-[20px]"
                onClick={() => handleDownloadAll(documentDetail.attach)}
              />
            ) : (
              <p className="text-sm">No Attach</p>
            )}
          </div>

          {/* OrderSheet */}
          <div className="flex justify-between px-4 border-b-[2px] border-gray-700 border-spacing-1 mt-4">
            <Label htmlFor="orderSheet" className="text-sm font-normal">
              OrderSheet
            </Label>
            {documentDetail.orderSheet.length > 0 ? (
              <IoMdDownload
                className="cursor-pointer text-[20px]"
                onClick={() =>
                  handleDownloadAllorder(documentDetail.orderSheet)
                }
              />
            ) : (
              <p className="text-sm">No OrderSheet</p>
            )}
          </div>

          {/* Awards */}
          <div className="flex justify-between px-4 border-b-[2px] border-gray-700 border-spacing-1 mt-4">
            <Label htmlFor="awards" className="text-sm font-normal">
              Awards
            </Label>
            {documentDetail.award.length > 0 ? (
              <div
                className="flex items-center text-[25px]"
                onClick={() => handleDownloadAward(documentDetail.award[0])}
              >
                <IoMdCloudDownload />{" "}
              </div>
            ) : (
              <p className="text-sm">No Award</p>
            )}
          </div>

          <div className="flex justify-between px-4 border-b-[2px] border-gray-700 border-spacing-1 mt-4">
            {/* Recording */}
            <Label htmlFor="recording" className="text-sm font-normal">
              Recordings
            </Label>
            {documentDetail.recording.length > 0 ? (
              <IoEye
                onClick={() => handleRecordings(recent)}
                className="ml-0 text-xl cursor-pointer text-[24px]"
              />
            ) : (
              <p className="text-sm">No Recording</p>
            )}
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

export default DocumentsModal;
