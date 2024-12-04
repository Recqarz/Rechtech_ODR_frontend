import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../components/ArbitratorUserTable/TableProps.module.css";
import { FcStart, FcVideoCall } from "react-icons/fc";
import NoDataFound from "@/components/NoDataFound";
import toast from "react-hot-toast";
import { IoMdCloudDownload, IoMdDownload } from "react-icons/io";
import { MdVideocamOff } from "react-icons/md";

const ClientCases = () => {
  const [searchByData, setSearchByData] = useState("");
  const navigate = useNavigate();
  const [clientOwnData, setClientOwnData] = useState([]);
  let token = JSON.parse(localStorage.getItem("rechtechtoken"));

  function convertToDateNow(isoTimestamp) {
    const date = new Date(isoTimestamp);
    return date.getTime();
  }

  const getArbitratorCaseData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/cases/clientcases`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setClientOwnData(res.data.caseData);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    getArbitratorCaseData();
  }, []);

  // start meeting
  const handleMeeting = (link) => {
    window.open(link.webLink, "_blank");
  };

  // download all attachments
  const handleDownloadAllAttachment = (links) => {
    links.forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.download = "";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    });
  };

  // download ordersheet
  const handleDownloadAllorderSheet = (links) => {
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

  // download awards
  function handleDownloadAward(link) {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    anchor.download = "";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  return (
    <div>
      <div className="flex gap-4 mt-5">
        <div className="mx-10 flex items-center w-[25%] lg:w-[20%] border rounded-xl p-2 bg-blue-50 border-gray-300">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow outline-none bg-transparent text-sm"
            onChange={(e) => setSearchByData(e.target.value)}
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
      </div>

      <div className="w-[95%] mx-auto mt-3">
        {clientOwnData.length > 0 ? (
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Res. Name</th>
                <th>Res. Email</th>
                <th>File Name</th>
                <th>Uploaded Date</th>
                <th>Arb. Name</th>
                <th>Attach.</th>
                <th>Meeting Status</th>
                <th>OrderSheet</th>
                <th>Award</th>
              </tr>
            </thead>
            {clientOwnData
              .filter((el) => {
                if (!searchByData) return true;
                const searchTerm = searchByData.toLowerCase();
                if (
                  /^s(i(n(g(l(e(( )||( case))?)?)?)?)?)?$/i.test(searchTerm)
                ) {
                  return el.fileName === "";
                }
                return (
                  el.respondentName.toLowerCase().includes(searchByData) ||
                  el.respondentEmail.toLowerCase().includes(searchByData) ||
                  el.arbitratorName.toLowerCase().includes(searchByData) ||
                  el.fileName.toLowerCase().includes(searchByData)
                );
              })
              .map((clientcase) => (
                <tbody key={clientcase._id}>
                  <tr className={styles.trbody}>
                    <td data-label="Name">{clientcase.respondentName}</td>
                    <td data-label="Email ID">{clientcase.respondentEmail}</td>
                    <td data-label="File Name">
                      {clientcase.fileName
                        ? clientcase.fileName
                        : "Single Case"}
                    </td>

                    <td data-label="Uploaded">
                      {clientcase.createdAt
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>

                    <td data-label="Arbitrator name">
                      {clientcase.arbitratorName
                        ? clientcase.arbitratorName.split(" ")[0]
                        : "Not assgn"}
                    </td>
                    <td data-label="Attachment">
                      {clientcase.attachments.length > 0 ? (
                        <IoMdDownload
                          style={{ fontSize: "16px" }}
                          className="cursor-pointer"
                          onClick={() =>
                            handleDownloadAllAttachment(clientcase.attachments)
                          }
                        />
                      ) : (
                        "NA"
                      )}
                    </td>
                    <td>
                      {clientcase.meetings.length < 1 ? (
                        "Not Scheduled"
                      ) : convertToDateNow(
                          clientcase.meetings[clientcase?.meetings.length - 1]
                            .end
                        ) > Date.now() ? (
                        <div className="flex gap-1 text-[24px] cursor-pointer">
                          <FcStart
                            onClick={() =>
                              handleMeeting(
                                clientcase.meetings[
                                  clientcase?.meetings.length - 1
                                ]
                              )
                            }
                          />
                        </div>
                      ) : (
                        <MdVideocamOff style={{ fontSize: "20px" }} />
                      )}
                    </td>
                    <td data-label="Ordersheet">
                      {clientcase.orderSheet.length > 0 ? (
                        <IoMdDownload
                          style={{ fontSize: "16px" }}
                          className="cursor-pointer"
                          onClick={() =>
                            handleDownloadAllorderSheet(clientcase.orderSheet)
                          }
                        />
                      ) : (
                        <p className="font-semibold">NA</p>
                      )}
                    </td>
                    <td data-label="Award">
                      {" "}
                      {clientcase.awards.length > 0 ? (
                        <IoMdCloudDownload
                          className="cursor-pointer"
                          style={{ fontSize: "20px" }}
                          onClick={() => handleDownloadAward(clientcase.awards)}
                        />
                      ) : (
                        <p className="font-semibold">NA</p>
                      )}
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
  );
};

export default ClientCases;
