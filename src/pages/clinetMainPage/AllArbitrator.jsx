import React, { useEffect, useState } from "react";
import { LuUser } from "react-icons/lu";
import NoDataFound from "@/components/NoDataFound";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import SearchData from "@/components/SearchData";
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
import AllArbitratorDetailsModal from "./AllArbitratorDetailsModal";

const AllArbitrator = () => {
  const [data, setData] = useState([]);
  const [searchdata, setSearchdata] = useState("");

  //details modal
  const [isOpen, setIsOpen] = useState(false);
  const [caseDetails, setCaseDetails] = useState({
    id: "",
    arb_name: "",
    arb_email: "",
    arb_num: "",
    assignedCases: "",
    experties: "",
    experience: "",
  });

  const getData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/arbitrator/all`)
      .then((res) => {
        setData(res.data.user);
      })
      .catch((err) => {
        toast.error("Something went wrong.");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  //Details modal
  const handleDetailsFunc = (el) => {
    setCaseDetails({
      id: el?.uid,
      arb_name: el?.name,
      arb_email: el?.emailId,
      arb_num: el?.contactNo,
      assignedCases: el?.noOfAssignCase,
      experties: el?.areaOfExperties,
      experience: el?.experienceInYears,
    });
    setIsOpen(true);
  };

  const closeDetailsFunc = () => {
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocumentDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-[#012061]">
        <div className="flex justify-center items-center mt-2">
          <div className="w-[95%] flex justify-between items-center mb-4 bg-[#0f2d6b] p-2 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2 ml-10 md:ml-0">
              <div className="text-xs md:text-sm text-gray-500 flex items-center space-x-2">
                <Link to="/client">
                  <span className="cursor-pointer text-white font-semibold">
                    Client
                  </span>
                </Link>
                <span>›</span>
                <span className="cursor-pointer text-white font-semibold">
                  All Arbitrator
                </span>
              </div>
            </div>
            <div className="bg-blue-50 p-3 rounded-full">
              <LuUser className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <SearchData
          searchTerm={searchdata}
          setSearchTerm={(e) => setSearchdata(e.target.value)}
        />

        {data.length > 0 ? (
          <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
            <div
              className={`grid mt-5 font-semibold lg:px-3 rounded-md grid-cols-[1fr,100px,60px]
               md:grid-cols-[110px,100px,120px,90px,60px] lg:grid-cols-[160px,140px,110px,1fr,1fr,1fr,55px] text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]`}
            >
              <p className="truncate">Arbitrator</p>
              <p className="truncate min-w-[60px] hidden lg:block">
                Contact No.
              </p>
              <p className="truncate hidden md:block">Email ID</p>
              <p className="truncate ml-0 md:ml-3 lg:ml-0 hidden lg:block">
                Handled Cases
              </p>
              <p className="truncate hidden md:block">Experties</p>
              <p className="truncate">Experience</p>
              <p className="truncate">Details</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-24 text-white text-2xl font-semibold">
            No Docs Available
          </div>
        )}

        <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
          {data
            .filter((item) => {
              if (item === "All") {
                return item;
              } else if (
                item.name.toLowerCase().includes(searchdata.toLowerCase()) ||
                item.contactNo
                  .toLowerCase()
                  .includes(searchdata.toLowerCase()) ||
                item.emailId.toLowerCase().includes(searchdata.toLowerCase()) ||
                item.areaOfExperties
                  .toLowerCase()
                  .includes(searchdata.toLowerCase())
              ) {
                return item;
              }
            })
            .map((ele) => {
              return (
                <div
                  key={ele._id}
                  className={`grid mt-1 rounded-md grid-cols-[1fr,100px,60px] md:grid-cols-[110px,100px,120px,90px,60px]  text-sm text-white gap-4 px-2 py-2 lg:grid-cols-[160px,140px,110px,1fr,1fr,1fr,55px] shadow-lg bg-[#0f2d6b]`}
                >
                  <p className="truncate">{ele?.name}</p>
                  <p className="truncate min-w-[60px] hidden lg:block">
                    {ele.contactNo}
                  </p>
                  <p className="truncate hidden md:block">{ele?.emailId}</p>
                  <p className="truncate hidden lg:block text-center">
                    {ele.noOfAssignCase}
                  </p>
                  <p className="hidden md:block ml-1">{ele?.areaOfExperties}</p>
                  <p className="truncate">{ele?.experienceInYears} Years</p>
                  <p
                    onClick={() => handleDetailsFunc(ele)}
                    className="cursor-pointer px-2 bg-green-500 py-1 rounded-md text-xs font-semibold"
                  >
                    Details
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Modal for All Arbitrator Details */}
      <AllArbitratorDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        caseDetails={caseDetails}
        handleInputChange={handleInputChange}
        closeDetailsFunc={closeDetailsFunc}
      />
    </>
  );
};

export default AllArbitrator;
