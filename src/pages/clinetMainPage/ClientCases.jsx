import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcStart } from "react-icons/fc";
import toast from "react-hot-toast";
import { IoMdDownload } from "react-icons/io";
import { MdVideocamOff } from "react-icons/md";
import ClientFilter from "./ClientFilter";
import ClientDetailsModal from "./ClientDetailsModal";
import { recordingData } from "@/global/action";
import { useDispatch } from "react-redux";
import { IoEye } from "react-icons/io5";

const ClientCases = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clientOwnData, setClientOwnData] = useState([]);
  let token = JSON.parse(localStorage.getItem("rechtechtoken"));

  // Filter data(search, assign or not assign arbitrator and filter by file name )
  const [searchByFileName, setSearchByFileName] = useState("");
  const [assignNotAssignArbitrator, setAssignNotAssignArbitrator] =
    useState("");
  const [searchByData, setSearchByData] = useState("");

  // Modal for details
  const [isOpen, setIsOpen] = useState(false);
  const [caseDetails, setCaseDetails] = useState({
    id: "",
    res_name: "",
    arb_name: "",
    arb_email: "",
    arb_num: "",
    disputeType: "",
    attach: "",
    orderSheet: "",
    award: "",
    recording: "",
    meetings: "",
    fileName: "",
  });

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

  //handle Recording
  const handleRecordings = (link) => {
    dispatch(recordingData(cases.recordings));
    navigate("/arbitrator/cases/recordings");
  };

  //Modal For Details
  const handleDetailsFunc = (el) => {
    setCaseDetails({
      id: el?.caseId,
      res_name: el?.respondentName,
      arb_name: el.arbitratorName ? el.arbitratorName : "Not Assigned",
      arb_email: el.arbitratorEmail ? el.arbitratorEmail : "NA",
      disputeType: el?.disputeType,
      attach: el?.attachments,
      orderSheet: el?.orderSheet,
      award: el?.awards,
      recording: el?.recordings,
      meetings: el?.meetings,
      fileName: el?.fileName,
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

  // to get unique file name in the filter
  const uniqueFileName = [];
  const seeFileName = new Set();
  clientOwnData.forEach((item) => {
    if (!seeFileName.has(item.fileName)) {
      seeFileName.add(item.fileName);
      uniqueFileName.push(item);
    }
  });

  return (
    <div>
      <div className="bg-[#012061] min-h-[100vh]">
        <div className="max-w-[1070px] mx-auto bg-[#012061] min-h-[100%] py-3">
          {/* Search data */}
          <ClientFilter
            searchData={searchByData}
            handleSearchData={(e) => setSearchByData(e.target.value)}
            uniqueFileName={uniqueFileName}
            setSearchByFileName={setSearchByFileName}
            setAssignNotAssignArbitrator={setAssignNotAssignArbitrator}
          />

          {clientOwnData.length > 0 ? (
            <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
              <div
                className={`grid mt-5 font-semibold lg:px-3 rounded-md grid-cols-[1fr,100px,60px]
               md:grid-cols-[110px,100px,120px,90px,60px] lg:grid-cols-[160px,140px,110px,1fr,1fr,1fr,50px] text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]`}
              >
                <p className="truncate">Res. Name</p>
                <p className="truncate min-w-[60px] hidden lg:block">
                  Arbitrator
                </p>
                <p className="truncate hidden md:block">Attachment</p>
                <p className="truncate ml-0 md:ml-3 lg:ml-0 hidden lg:block">
                  File
                </p>
                <p className="truncate">Meeting</p>
                <p className="truncate hidden md:block">Recording</p>
                <p className="truncate">Details</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-24 text-white text-2xl font-semibold">
              No Docs Available
            </div>
          )}

          <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
            {clientOwnData
              .filter((file) => {
                if (!searchByFileName || searchByFileName === "all")
                  return true;
                else if (searchByFileName === "singlecase")
                  return file.fileName == "";
                return file.fileName
                  ?.toLowerCase()
                  .includes(searchByFileName.toLowerCase());
              })
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
                  el.arbitratorName.toLowerCase().includes(searchByData) ||
                  el.fileName.toLowerCase().includes(searchByData)
                );
              })
              .filter((el) => {
                if (assignNotAssignArbitrator === "assigned") {
                  return el.isArbitratorAssigned;
                } else if (assignNotAssignArbitrator == "notassigned") {
                  return !el.isArbitratorAssigned;
                }
                return el;
              })
              .map((ele) => {
                return (
                  <div
                    key={ele._id}
                    className={`grid mt-1 rounded-md grid-cols-[1fr,100px,60px] md:grid-cols-[110px,100px,120px,90px,60px]  text-sm text-white gap-4 px-2 py-2 lg:grid-cols-[160px,140px,110px,1fr,1fr,1fr,55px] shadow-lg bg-[#0f2d6b]`}
                  >
                    <p className="truncate">{ele?.respondentName}</p>
                    <p className="truncate min-w-[60px] hidden lg:block">
                      {ele.arbitratorName ? ele.arbitratorName : "Not Assigned"}
                    </p>

                    <p className="truncate ml-3 hidden md:block">
                      {ele.attachments.length > 0 ? (
                        <IoMdDownload
                          className="cursor-pointer text-sm ml-6 text-green-600"
                          onClick={() =>
                            handleDownloadAllAttachment(ele?.attachments)
                          }
                        />
                      ) : (
                        "No Attach."
                      )}
                    </p>

                    <p className="truncate hidden lg:block">
                      {ele.isFileUpload ? ele.fileName : "Single Case"}
                    </p>

                    <p className="truncate text-[25px] cursor-pointer">
                      {ele.meetings.length < 1 ? (
                        <span className="text-[12px] font-semibold">
                          Not Scheduled
                        </span>
                      ) : convertToDateNow(
                          ele.meetings[ele?.meetings.length - 1].end
                        ) > Date.now() ? (
                        <span className="flex gap-1 text-[24px] cursor-pointer">
                          <FcStart
                            onClick={() =>
                              handleMeeting(
                                ele.meetings[ele?.meetings.length - 1]
                              )
                            }
                          />
                        </span>
                      ) : (
                        <span className="flex gap-1">
                          <MdVideocamOff style={{ fontSize: "20px" }} />
                          <span className="text-[12px] font-semibold">
                            Ended
                          </span>
                        </span>
                      )}
                    </p>

                    <p className="truncate hidden md:block">
                      {ele.recordings.length > 0 ? (
                        <IoEye
                          onClick={() => handleRecordings(ele)}
                          className="ml-4 text-xl cursor-pointer text-green-500"
                        />
                      ) : (
                        <span className="text-[12px] font-semibold">
                          No Meet.
                        </span>
                      )}
                    </p>

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
      </div>

      {/* Modal for Details  */}

      <ClientDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        caseDetails={caseDetails}
        handleInputChange={handleInputChange}
        handleDownloadAllAttachment={handleDownloadAllAttachment}
        handleDownloadAllorder={handleDownloadAllorderSheet}
        handleDownloadAward={handleDownloadAward}
        handleRecordings={()=>handleRecordings(documentDetail.recording)}
        closeDetailsFunc={closeDetailsFunc}
        convertToDateNow={convertToDateNow}
      />
    </div>
  );
};

export default ClientCases;
