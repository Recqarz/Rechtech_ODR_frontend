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

const RespondentModal = ({
  isOpen,
  setIsOpen,
  documentDetail,
  handleInputChange,
  handleDownloadAll,
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
                className="cursor-pointer text-[20px] text-green-500"
                onClick={() => handleDownloadAll(documentDetail.attach)}
              />
            ) : (
              <p className="text-sm">No Attach</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            className="h-8 bg-green-500"
            type="submit"
            onClick={closeDetailsFunc}
          >
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RespondentModal;
