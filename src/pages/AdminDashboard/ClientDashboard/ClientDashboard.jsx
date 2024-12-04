import { FiEdit3 } from "react-icons/fi";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
import TableProps from "@/components/ArbitratorUserTable/TableProps";
import UpdateClientDetailsProps from "./UpdateClientDetailsProps";

const ClientDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleOpen = (client) => {
    setIsOpen(true);
    setEditData(client);
  };
  const handleClose = () => {
    // console.log(editData);
    axios
      .put(
        `${import.meta.env.VITE_API_BASEURL}/client/update/${editData._id}`,
        editData
      )
      .then((res) => {
        setIsOpen(false);
        getData();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
    // setIsOpen(false);
  };
  const [data, setData] = useState([]);
  const [searchdata, setSearchdata] = useState("");
  const [filterstatus, setFilterstatus] = useState("all");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");

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
      .get(`${import.meta.env.VITE_API_BASEURL}/client/all`)
      .then((res) => {
        // console.log(res.data.user);
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
      <div className="mx-auto px-4 py-3">
        <div className="flex justify-between items-center ml-12 md:ml-0 mb-4 bg-white p-2 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                User
              </span>
              <span>›</span>
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                Client
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
            <div className="w-[30%] md:w-[20%] flex items-center border rounded-md p-1 bg-blue-50 border-black">
              <input
                type="text"
                placeholder="Search here"
                className="flex-grow outline-none bg-transparent px-2 py-0.5 text-sm"
                onChange={(e) => setSearchdata(e.target.value)}
              />
              <button className="text-gray-500 hover:text-gray-700 hidden md:hidden lg:block">
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
          <Link to={"/client/addclient"}>
            <button className="bg-[#B9DCFD] hover:bg-blue-500 font-semibold text-[16px] p-2 text-black py-2 px-4 flex items-center gap-0 border-1 border-slate-950">
              <span>Add</span>
            </button>
          </Link>
        </div>

        {/* Client data in the table*/}

        {data.length > 0 ? (
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact No.</th>
                <th>Email ID</th>
                <th>Cases Added</th>
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
              .map((client) => (
                <TableProps
                  key={client._id}
                  id_body={client.uid}
                  name_body={client.name}
                  number_body={client.contactNo}
                  email_body={client.emailId}
                  noOfAssginCases_body={client.caseAdded}
                  address_body={client.address.slice(0, 10)}
                  status_body={client.status == false ? "InActive" : "Active"}
                  action_body=<FiEdit3
                    style={{
                      color: "blue",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  />
                  handleOpen={() => handleOpen(client)}
                />
              ))}
          </table>
        ) : (
          <NoDataFound />
        )}
      </div>

      {/* Modal for update status */}

      <UpdateClientDetailsProps
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editData={editData}
        setEditData={setEditData}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ClientDashboard;
