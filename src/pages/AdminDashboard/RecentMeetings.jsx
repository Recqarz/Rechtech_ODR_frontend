import RecentMeetProps from "@/components/RecentMeetProp/RecentMeetProps";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const RecentMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    getRecentMeetingData();
  }, []);

  const getRecentMeetingData = async () => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_BASEURL
        }/webex/recent-fullMeetingDataWithCaseDetails`
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
    <div className="w-[100%] lg:w-[80%] mt-6 pr-2 bg-blue-50 py-2 mr-4 rounded-md">
      <h2 className="text-xl font-bold ml-3 ">Recent Meetings</h2>
      {meetings.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th className="text-xs font-semibold">ID</th>
              <th className="text-xs font-semibold">Cl. Name</th>
              <th className="text-xs font-semibold">Res. Name</th>
              <th className="text-xs font-semibold">D&T</th>
              <th className="text-xs font-semibold">Arbitrator</th>
            </tr>
          </thead>
          {meetings.map((recent, ind) => (
            <RecentMeetProps
              key={ind}
              arb_name={recent.arbitratorName.split(" ")[0]}
              time={formatDateTime(recent.startTime)}
              res_name={recent.respondentName}
              com_name={recent.clientName}
              case_name={recent.caseId}
            />
          ))}
        </table>
      ) : (
        <h2 className="text-lg font-bold text-center mt-10 mb-10 text-gray-500">No recent meetings found.</h2>
      )}
    </div>
  );
};

export default RecentMeetings;
