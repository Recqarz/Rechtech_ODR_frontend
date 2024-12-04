import React, { useEffect, useState } from "react";
import styles from "../AdminDashboard/ArbitratorDashboard/ArbitratorDashboard.module.css";
import { LuUser } from "react-icons/lu";
import NoDataFound from "@/components/NoDataFound";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FiEdit3 } from "react-icons/fi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AllArbitrator = () => {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [searchdata, setSearchdata] = useState("");
  const [filterstatus, setFilterstatus] = useState("all");

  const getData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/arbitrator/all`)
      .then((res) => {
        setData(res.data.user);
      })
      .catch((err) => {
        toast.error("Something went wrong.")
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
            <Link to="/client">
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                Client
              </span>
            </Link>
              <span>›</span>
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                All Arbitrator
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
          </div>
        )}
        
      

        {/* Table Data */}

        {data.length > 0 ? (
          <table cellSpacing="0">
            <thead>
              <tr className="text-[5px]">
                <th>ID</th>
                <th>Name</th>
                <th>Contact No.</th>
                <th>Email ID</th>
                <th>Handled Cases</th>
                <th>Experties</th>
                <th>Experience</th>
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
                    <td data-label="ExperienceField">
                      {arbitratior.areaOfExperties}
                    </td>
                    <td data-label="ExperienceYear">
                    {arbitratior.experienceInYears} Years
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        ) : (
          <NoDataFound />
        )}
      </div>
    </div>
  )
};

export default AllArbitrator;
