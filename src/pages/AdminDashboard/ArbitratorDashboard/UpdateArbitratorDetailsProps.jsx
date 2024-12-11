import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const UpdateArbitratorDetailsProps = ({
  isOpen,
  setIsOpen,
  editData,
  setEditData,
  handleClose,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[300px] h-[90vh] scrollbar-hide rounded-md overflow-y-auto md:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Arbitrator</DialogTitle>
          <DialogDescription>
            Make changes to client profile. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="uid" className="text-right">
              ID
            </Label>
            <Input
              id="uid"
              value={editData?.uid}
              onInput={(e) => setEditData((editData.uid = e.target.value))}
              className="col-span-3"
              disabled={true}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={editData?.name}
              onInput={(e) => setEditData((editData.name = e.target.value))}
              className="col-span-3"
              disabled={true}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="contactNo" className="text-right">
              Contact No.
            </Label>
            <Input
              id="contactNo"
              value={editData?.contactNo}
              onInput={(e) =>
                setEditData((editData.contactNo = e.target.value))
              }
              className="col-span-3"
              disabled={true}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="emailId" className="text-right">
              Email
            </Label>
            <Input
              id="emailId"
              value={editData?.emailId}
              onInput={(e) => setEditData((editData.emailId = e.target.value))}
              className="col-span-3"
              disabled={true}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="areaOfExperties" className="text-right">
              Experties
            </Label>
            <Input
              id="experties"
              value={editData?.areaOfExperties}
              onInput={(e) =>
                setEditData((editData.areaOfExperties = e.target.value))
              }
              className="col-span-3"
              disabled={true}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              id="status"
              onValueChange={(value) =>
                setEditData({ ...editData, status: value === "active" })
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleClose}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateArbitratorDetailsProps;
