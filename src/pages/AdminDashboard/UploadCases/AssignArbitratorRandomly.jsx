import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AssignArbitratorRandomly = ({
  isOpen2,
  setIsOpen2,
  handleArbitratorNotAssignForPendingCases,
  handleArbitratorAssignForPendingCases,
}) => {
  return (
    <Dialog open={isOpen2} onOpenChange={setIsOpen2}>
      <DialogContent className="max-w-[300px] md:max-w-[480px] p-6 rounded-lg shadow-lg h-auto overflow-y-auto scrollbar-hide">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold text-gray-800">
            Are you sure, You want to select arbitrator randomly?
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="mt-6 flex justify-end gap-2">
          <Button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            onClick={handleArbitratorNotAssignForPendingCases}
          >
            No
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            onClick={handleArbitratorAssignForPendingCases}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssignArbitratorRandomly;
