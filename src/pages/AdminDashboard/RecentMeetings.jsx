import RecentMeetProps from "@/components/RecentMeetProp/RecentMeetProps";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit3 } from "react-icons/fi";
import { IoIosSettings } from "react-icons/io";

const RecentMeetings = () => {
  const [meetings, setMeetings] = useState([]);
  console.log(meetings);

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
        // console.log(res.data.data);
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
    const seconds = String(date.getSeconds()).padStart(2, "0");

    // Construct the formatted string
    const formattedDateTime = `${day} ${month},${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  }

  return (
    <div className="w-[100%] lg:w-[70%] mt-5">
      <table>
        <thead>
          <tr>
            <th>Case ID</th>
            <th>Company Name</th>
            <th>Respondent Name</th>
            <th>Date & Time</th>
            <th>Arbitrator</th>
            <th>Settings</th>
          </tr>
        </thead>
        {meetings.map((recent) => (
          <RecentMeetProps
            key={recent._id}
            arb_name={recent.arbitratorName}
            time={formatDateTime(recent.startTime)}
            res_name={recent.respondentName}
            com_name={recent.clientName}
            case_name={recent.caseId}
            settings=<FiEdit3
              style={{
                color: "blue",
                fontSize: "24px",
                cursor: "pointer",
              }}
            />
          />
        ))}
      </table>
    </div>
  );
};

export default RecentMeetings;
