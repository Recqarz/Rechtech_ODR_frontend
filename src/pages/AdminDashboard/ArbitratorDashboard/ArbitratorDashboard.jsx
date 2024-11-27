import styles from "./ArbitratorDashboard.module.css";
import { FiEdit3 } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import NoDataFound from "@/components/NoDataFound";

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
import toast from "react-hot-toast";


const ArbitratorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [data, setData] = useState([]);
  const [searchdata, setSearchdata] = useState("");
  const [filterstatus, setFilterstatus] = useState("all");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");

  const handleOpen = (arbitratior) => {
    setIsOpen(true);
    setEditData(arbitratior);
  };
  const handleClose = () => {
    console.log(editData);
    axios
      .put(`${import.meta.env.VITE_API_BASEURL}/arbitrator/update/${editData._id}`, editData)
      .then((res) => {
        setIsOpen(false);
        getData();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
    // setIsOpen(false);
  };
 

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "InActive" },
  ];

  const handleStatusSelect = (value, label) => {
    setSelectedStatus(label);
    setFilterstatus(value);
    setIsStatusOpen(false);
  };

  const getData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/arbitrator/all`)
      .then((res) => {
        console.log(res.data.user);
        setData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className=" flex justify-between items-center mb-4 bg-white p-2 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                User
              </span>
              <span>›</span>
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                Arbitrator
              </span>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">
            <LuUser className="text-blue-600 text-xl" />
          </div>
        </div>

        {/* Search button */}
        {data.length == 0 ? (
          ""
        ) : (
          <div className="mt-6 sm:mt-10 flex gap-4 sm:items-center">
            <div className="w-[30%] relative md:w-[25%] flex items-center border rounded-md p-1 bg-blue-50 border-black">
              <input
                type="text"
                placeholder="Search here"
                className="flex-grow outline-none bg-transparent px-2 py-0.5 text-sm"
                onChange={(e) => setSearchdata(e.target.value)}
              />
              <button className="p-0 absolute right-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
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

            <div className="relative w-[15%] md:w-[21%] sm:w-auto">
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="flex items-center justify-between w-32 px-4 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
              >
                <span>{selectedStatus}</span>
                {isStatusOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {isStatusOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
                  {statusOptions.map((option) => (
                    <div
                      key={option.value}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() =>
                        handleStatusSelect(option.value, option.label)
                      }
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Add Arbitrator */}
        <div className="flex justify-end w-[97%] mx-auto mt-6">
          <Link to={"/arbitrator/addarbitrator"}>
            <button className="bg-[#B9DCFD] hover:bg-blue-500 font-semibold text-[16px] p-2 text-black py-2 px-4 flex items-center gap-0 border-1 border-slate-950">
              <span>Add</span>
            </button>
          </Link>
        </div>

        {/* Table Data */}

        {data.length > 0 ? (
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact No.</th>
                <th>Email ID</th>
                <th>No Of Assign Case</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {data
              .filter((item) => {
                if (item === "All") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(searchdata.toLowerCase()) ||
                  item.contactNo
                    .toLowerCase()
                    .includes(searchdata.toLowerCase()) ||
                  item.emailId.toLowerCase().includes(searchdata.toLowerCase())
                ) {
                  return item;
                }
              })
              .filter((stat) => {
                if (filterstatus == "all") {
                  return stat;
                } else if (filterstatus == "active") {
                  return stat.status == true;
                } else {
                  return stat.status == false;
                }
              })
              .map((arbitratior) => (
                <tbody key={arbitratior._id}>
                  <tr className={styles.trbody}>
                    <td data-label="ID">{arbitratior.uid}</td>
                    <td data-label="Name">{arbitratior.name}</td>
                    <td data-label="Contact No." className={styles.number}>
                      {arbitratior.contactNo}
                    </td>
                    <td data-label="Email ID">{arbitratior.emailId}</td>
                    <td data-label="No. of assign Case">
                      {arbitratior.noOfAssignCase}
                    </td>
                    <td data-label="address">
                      {arbitratior.address.slice(0,10)}
                    </td>
                    <td data-label="Status" className={arbitratior.status == true ? styles.status : styles.status2}>
                      {arbitratior.status == false ? "InActive" : "Active"}
                    </td>
                    <td data-label="Action">
                    <FiEdit3
                        style={{
                          color: "blue",
                          fontSize: "24px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleOpen(arbitratior)}
                      />
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        ) : (
          <NoDataFound />
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Clinet</DialogTitle>
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
                onInput={(e) =>
                  setEditData((editData.emailId = e.target.value))
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
    </div>
  );
};

export default ArbitratorDashboard;