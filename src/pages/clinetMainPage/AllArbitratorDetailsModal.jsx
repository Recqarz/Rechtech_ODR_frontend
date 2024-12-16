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

const AllArbitratorDetailsModal = ({
  isOpen,
  setIsOpen,
  caseDetails,
  handleInputChange,
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
            <Label htmlFor="arb_email" className="text-sm font-normal">
              Arbitrator Email
            </Label>
            <Input
              id="arb_email"
              disabled={true}
              onChange={handleInputChange}
              value={caseDetails.arb_email}
              className="col-span h-[30px] text-black"
            />
          </div>

          {/* Arbitrator Number */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="closername" className="text-sm font-normal">
              Arbitrator Number
            </Label>
            <Input
              id="arb_num"
              disabled={true}
              onChange={handleInputChange}
              value={caseDetails.arb_num}
              className="col-span h-[30px] text-black"
            />
          </div>

          {/* Assigned Cases */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="arb_noOfAssignCase" className="text-sm font-normal">
              Assigned Cases
            </Label>
            <Input
              disabled={true}
              id="arb_noOfAssignCase"
              value={caseDetails.assignedCases}
              onChange={handleInputChange}
              className="col-span h-[30px] text-black"
            />
          </div>

          {/* Experties */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="arb_experties" className="text-sm font-normal">
              Experties
            </Label>
            <Input
              disabled={true}
              id="arb_experties"
              value={caseDetails.experties}
              onChange={handleInputChange}
              className="col-span h-[30px] text-black"
            />
          </div>

          {/* Experience  */}
          <div className="grid grid-cols-1 items-center gap-1">
            <Label htmlFor="arb_experience" className="text-sm font-normal">
              Experience(in Years)
            </Label>
            <Input
              disabled={true}
              id="arb_experience"
              value={caseDetails.experience}
              onChange={handleInputChange}
              className="col-span h-[30px] text-black"
            />
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

export default AllArbitratorDetailsModal;
