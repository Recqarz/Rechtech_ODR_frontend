import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RecentMeetingRespondent = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    getRecentMeetingData();
  }, []);

  const getRecentMeetingData = async () => {
    let token = JSON.parse(sessionStorage.getItem("rechtechtoken"));
    if (!token) {
      toast.error("Please login again");
      navigate("/");
      return;
    }

    axios
      .get(
        `${
          import.meta.env.VITE_API_BASEURL
        }/webex/recent-fullMeetingDataWithCaseDetails/respondent`,
        {
          headers: {
            "Content-Type": "application/json",
            token: `${token}`,
          },
        }
      )
      .then((res) => {
        setMeetings(res.data.data);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  function formatDateTime(startTime) {
    const date = new Date(startTime);

    // Extract day, month, and time parts
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    // Construct the formatted string
    const formattedDateTime = `${day}${month},${hours}:${minutes}`;

    return formattedDateTime;
  }

  return (
    <div className="w-[100%] lg:w-[80%] shadow-sm bg-[#0f2d6b]  mt-6 pr-2 py-2 mr-4 rounded-md">
      <h2 className="text-xl font-bold ml-3 text-white">Recent Meetings</h2>
      <div className="max-w-[1070px] mx-auto min-h-[100%] pb-3 ">
        {meetings.length > 0 ? (
          <div className="flex flex-col gap-2 mt-0 px-4 lg:px-3">
            <div className="grid mt-5  lg:px-3 rounded-md font-semibold grid-cols-[60px,1fr,1fr] md:grid-cols-[60px,1fr,1fr,80px]  lg:grid-cols-[60px,1fr,1fr,1fr,70px] text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#012061]">
              <p className="truncate min-w-[60px]">Id</p>
              <p className="truncate">Cl. Name</p>
              <p className="truncate hidden lg:block">Res. Name</p>
              <p className="truncate hidden md:block">D&T</p>
              <p>Arbitrator</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center mt-24 text-white text-2xl font-semibold">
            No Meetings Available
          </div>
        )}

        <div className="flex flex-col gap-2 mt-4 px-4 lg:px-3">
          {meetings.map((ele, index) => {
            return (
              <div
                key={index}
                className="grid rounded-md  grid-cols-[60px,1fr,1fr] md:grid-cols-[60px,1fr,1fr,80px]  lg:grid-cols-[60px,1fr,1fr,1fr,70px] text-sm text-white gap-4 px-2 py-2 shadow-lg bg-[#012061]"
              >
                <p className="truncate min-w-[60px]">{ele.caseId}</p>
                <p className="truncate hidden md:block">{ele.clientName}</p>
                <p className="truncate">{ele.respondentName}</p>
                <p className="truncate hidden lg:block">
                  {formatDateTime(ele.startTime)}
                </p>
                <p>{ele.arbitratorName.split(" ")[0]}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentMeetingRespondent;
