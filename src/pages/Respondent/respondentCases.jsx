import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcStart } from "react-icons/fc";
import { IoMdCloudDownload, IoMdDownload } from "react-icons/io";
import { useSelector } from "react-redux";

const RespondentCase = () => {
  const [data, setData] = useState([]);
  function fetchData() {
    let token = JSON.parse(sessionStorage.getItem("rechtechtoken"));
    if (!token) {
      toast.error("You are not logged in");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/cases/allrespondentcases`, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  const handleDownloadAll = (links) => {
    links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.download = ""; // Provide a filename if needed
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });
  };

  function convertToDateNow(isoTimestamp) {
    const date = new Date(isoTimestamp);
    return date.getTime();
  }

  function handleMeeting(meet) {
    window.open(meet.webLink, "_blank");
  }

  function handleDownloadAward(link) {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    anchor.download = "";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  const handleDownloadAllorder = (links) => {
    links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.target = "_blank";
      anchor.download = "";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });
  };

  if (!data || data.length === 0) {
    return (
      <div className="w-full p-4 text-center text-gray-500">
        No Case Data Available
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="rounded-lg max-w-6xl px-6 py-2 m-auto overflow-x-auto">
        <table className="text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-4 py-2">
                Case ID
              </th>
              <th scope="col" className="px-4 py-2">
                Respondent Name
              </th>
              <th scope="col" className="px-4 py-2">
                Respondent Email
              </th>
              <th scope="col" className="px-4 py-2">
                Arbitrator Name
              </th>
              <th scope="col" className="px-4 py-2">
                Attachments
              </th>
              <th scope="col" className="px-4 py-2">
                Meetings
              </th>
              <th scope="col" className="px-4 py-2">
                Order
              </th>
              <th scope="col" className="px-4 py-2">
                Awards
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item.caseId || index}
                className="bg-white border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-2">{item.caseId || "N/A"}</td>
                <td className="px-4 py-2">{item.respondentName || "N/A"}</td>
                <td className="px-4 py-2">{item.respondentEmail || "N/A"}</td>
                <td className="px-4 py-2">{item.arbitratorName || "N/A"}</td>
                <td className="px-4 py-2">
                  {item.attachments.length > 0 ? (
                    <IoMdDownload
                      className="cursor-pointer text-sm"
                      onClick={() => handleDownloadAll(item.attachments)}
                    />
                  ) : (
                    "NA"
                  )}
                </td>
                <td className="px-4 py-2">
                  {item.meetings.length > 0 &&
                  convertToDateNow(
                    item.meetings[item?.meetings.length - 1].end
                  ) > Date.now() ? (
                    <div
                      onClick={() =>
                        handleMeeting(item.meetings[item?.meetings.length - 1])
                      }
                      className="flex cursor-pointer"
                    >
                      <FcStart className="text-xl" />
                      <span className="font-sm font-semibold">Start</span>
                    </div>
                  ) : item.meetings.length > 0 ? (
                    "Completed"
                  ) : (
                    "Not Sch"
                  )}
                </td>
                <td className="px-4 py-2">
                  {item.orderSheet.length > 0 ? (
                    <p
                      className="flex items-center text-[18px] cursor-pointer"
                      onClick={() => handleDownloadAllorder(item.orderSheet)}
                    >
                      <IoMdDownload />
                    </p>
                  ) : (
                    "NA"
                  )}
                </td>
                <td className="px-4 py-2">
                  {item.isAwardCompleted ? (
                    <p
                      className="flex items-center text-[18px] cursor-pointer"
                      onClick={() => handleDownloadAward(item.awards[0])}
                    >
                      <IoMdCloudDownload />{" "}
                      <span className="text-[12px] font-semibold">Awards</span>
                    </p>
                  ) : (
                    "NA"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RespondentCase;
