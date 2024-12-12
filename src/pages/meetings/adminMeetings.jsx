import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoSearch } from "react-icons/io5";

const AdminMeetings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);

  function fetchData() {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/webex/all-meetings`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        toast.error("Error fetching meetings");
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  function handleMeet(link){
    window.open(link, "_blank");
  }

  return (
    <div className="w-full bg-[#012061] min-h-[100vh]">
      <div className="max-w-[1070px] mx-auto bg-[#012061] min-h-[100%] py-3">
        <div className="flex justify-end px-3">
          <div className="relative w-[230px] md:w-[280px] h-[32px] mt-[5px] md:mt-0">
            <Input
              className="w-full h-full  rounded-md placeholder:font-semibold"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoSearch className="absolute top-[25%] right-4 text-lg text-blue-700" />
          </div>
        </div>

        {data.length > 0 ? (
          <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
            <div className="grid mt-5  lg:px-3 rounded-md grid-cols-[60px,1fr,50px,60px] md:grid-cols-[60px,1fr,1fr,50px,100px,60px]  lg:grid-cols-[60px,1fr,1fr,1fr,50px,100px,60px] text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]">
              <p className="truncate min-w-[60px]">Case Id</p>
              <p className="truncate hidden lg:block">Res. Name</p>
              <p className="truncate">Cl. Name</p>
              <p className="truncate hidden md:block">Arb. Name</p>
              <p>Time</p>
              <p className="truncate hidden md:block">Date</p>
              <p>Action</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-24 text-white text-2xl font-semibold">
            No Meetings Available
          </div>
        )}

        <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
          {data
            .filter((ele) => {
              if (searchTerm == "") {
                return true;
              }
              return (
                ele.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                ele.clientName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                ele.respondentName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                ele.arbitratorName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                ele.disputeType.toLowerCase().includes(searchTerm.toLowerCase())
              );
            })
            .map((ele, index) => {
              return (
                <div
                  key={index}
                  className="grid rounded-md grid-cols-[60px,1fr,50px,60px] md:grid-cols-[60px,1fr,1fr,50px,100px,60px]  lg:grid-cols-[60px,1fr,1fr,1fr,50px,100px,60px] text-sm text-white gap-4 px-2 py-2 shadow-lg bg-[#0f2d6b]"
                >
                  <p className="truncate min-w-[60px]">{ele.caseId}</p>
                  <p className="truncate">{ele.respondentName}</p>
                  <p className="truncate hidden md:block">{ele.clientName}</p>
                  <p className="truncate hidden lg:block">
                    {ele.arbitratorName}
                  </p>
                  <p>{ele.meetings?.start?.split("T")[1].slice(0, 5)} </p>
                  <p className="truncate hidden md:block">
                    {ele.meetings.end.split("T")[0]}
                  </p>
                  <p
                  onClick={()=>handleMeet(ele.meetings.webLink)}
                   className="cursor-pointer px-4 bg-green-500 py-1 rounded-md">Start</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default AdminMeetings;
