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
import { ExportToExcel } from "../AdminDashboard/UploadCases/ExportToExcel";
import Pagination from "@/components/Pagination";

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

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  //export file
  const [exportFileStatus, setExportFileStatus] = useState(false);
  const [allcaseId, setAllcaseId] = useState([]);

  function convertToDateNow(isoTimestamp) {
    const date = new Date(isoTimestamp);
    return date.getTime();
  }

  const getArbitratorCaseData = (page, limit) => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/cases/clientcases`, {
        headers: {
          token: token,
        },
        params: { page, limit },
      })
      .then((res) => {
        setClientOwnData(res.data.caseData);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  useEffect(() => {
    getArbitratorCaseData(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

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

  // download all the cases before confirm
  const DownloadAllDataOfCase = () => {
    setExportFileStatus(true);
    const allCaseDataDownload = clientOwnData.map((el) => el._id);
    setAllcaseId(allCaseDataDownload);
  };

  // handle to download cases by checkbox
  const handleSelectMultipleClientForCases = (id) => {
    setAllcaseId((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((existingId) => existingId !== id)
        : [...prevIds, id]
    );
  };

  const ConfirmDownloadAllDataOfCase = () => {
    // Define a function to dynamically filter the data
    const applyFilters = (data, filters) => {
      return data.filter((el) => {
        // Dynamically apply all filters
        return filters.every((filter) => filter(el));
      });
    };

    // Define the filters (example: add/remove filters as needed)
    const filters = [
      (el) =>
        !searchByFileName ||
        searchByFileName === "all" ||
        (searchByFileName === "singlecase" && el.fileName === "") ||
        el.fileName?.toLowerCase().includes(searchByFileName.toLowerCase()),

      (el) =>
        !assignNotAssignArbitrator ||
        assignNotAssignArbitrator === "all" ||
        (assignNotAssignArbitrator === "notassigned" &&
          !el.isArbitratorAssigned) ||
        (assignNotAssignArbitrator === "assigned" && el.isArbitratorAssigned),
      (el) =>
        !searchByData ||
        el.clientName.toLowerCase().includes(searchByData.toLowerCase()) ||
        el.clientMobile.toLowerCase().includes(searchByData.toLowerCase()) ||
        el.respondentName.toLowerCase().includes(searchByData.toLowerCase()) ||
        el.respondentMobile
          .toLowerCase()
          .includes(searchByData.toLowerCase()) ||
        el.disputeType.toLowerCase().includes(searchByData.toLowerCase()),
    ];

    const filterdatatoexport = allcaseId
      .map((id) => {
        const filteredData = applyFilters(clientOwnData, filters);
        const matchedCase = filteredData.find((el) => el._id === id);

        if (matchedCase) {
          return {
            clientName: matchedCase.clientName,
            clientEmail: matchedCase.clientEmail,
            clientMobile: matchedCase.clientMobile,
            clientAddress: matchedCase.clientAddress,
            respondentName: matchedCase.respondentName,
            respondentEmail: matchedCase.respondentEmail,
            respondentMobile: matchedCase.respondentMobile,
            respondentAddress: matchedCase.respondentAddress,
            attachments: matchedCase.attachments || "NA",
            arbitratorName: matchedCase.arbitratorName || "NA",
            arbitratorEmail: matchedCase.arbitratorEmail || "NA",
            accountNumber: matchedCase.accountNumber || "NA",
            cardNo: matchedCase.cardNo || "NA",
            amount: matchedCase.amount || "NA",
            awards:
              matchedCase.awards[0] !== "No URL"
                ? {
                    t: "s", // String type
                    v: matchedCase.awards[0] ? matchedCase.awards[0] : "NA", // Value for the hyperlink
                    l: {
                      Target: matchedCase.awards[0], // Target URL
                      Tooltip: "Click to open", // Tooltip for the hyperlink
                    },
                  }
                : "NA",
            orderSheet:
              matchedCase.orderSheet[0] !== "No URL"
                ? {
                    t: "s", // String type
                    v: matchedCase.orderSheet[0]
                      ? matchedCase.orderSheet[0]
                      : "NA", // Value for the hyperlink
                    l: {
                      Target: matchedCase.orderSheet[0], // Target URL
                      Tooltip: "Click to open", // Tooltip for the hyperlink
                    },
                  }
                : "NA",
          };
        }
        return null;
      })
      .filter(Boolean); // Remove null values

    // Update state and trigger export
    ExportToExcel(filterdatatoexport, "Client_CaseData");
    setAllcaseId("");
    setExportFileStatus(false);
  };

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

          <div className="flex flex-col md:flex-row mt-2 justify-end mr-0 md:mr-2 ml-4 md:ml-0">
            {/* Download all cases in excel */}
            <div>
              <button
                type="button"
                className="text-white bg-[#22c55e] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
                onClick={DownloadAllDataOfCase}
              >
                <svg
                  className="h-5 w-8 text-white"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />{" "}
                  <polyline points="7 11 12 16 17 11" />{" "}
                  <line x1="12" y1="4" x2="12" y2="16" />
                </svg>
                Export
              </button>
            </div>

            {/*Confirm to download all cases in excel */}
            {exportFileStatus ? (
              <div>
                <button
                  type="button"
                  className="text-white bg-[#16a34a] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 w-28 md:w-40"
                  onClick={ConfirmDownloadAllDataOfCase}
                >
                  <svg
                    className="h-5 text-white"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" />{" "}
                    <polyline points="7 11 12 16 17 11" />{" "}
                    <line x1="12" y1="4" x2="12" y2="16" />
                  </svg>
                  Confrm Export
                </button>
              </div>
            ) : null}
          </div>

          {clientOwnData.length > 0 ? (
            <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
              <div
                className={`grid mt-5 font-semibold lg:px-3 rounded-md ${
                  exportFileStatus
                    ? "grid-cols-[40px,1fr,70px,50px]"
                    : "grid-cols-[1fr,70px,60px]"
                } ${
                  exportFileStatus
                    ? "md:grid-cols-[40px,100px,100px,80px,80px,60px]"
                    : "md:grid-cols-[110px,100px,120px,90px,60px]"
                }  ${
                  exportFileStatus
                    ? "lg:grid-cols-[40px,160px,140px,110px,1fr,1fr,1fr,50px]"
                    : "lg:grid-cols-[160px,140px,110px,1fr,1fr,1fr,50px]"
                } text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]`}
              >
                <p
                  className={`truncate ${
                    exportFileStatus ? "block" : "hidden"
                  }`}
                >
                  Select
                </p>
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
                    className={`grid mt-1 rounded-md ${
                      exportFileStatus
                        ? "grid-cols-[40px,1fr,70px,60px]"
                        : "grid-cols-[1fr,70px,60px]"
                    } ${
                      exportFileStatus
                        ? "md:grid-cols-[40px,100px,100px,80px,80px,60px]"
                        : "md:grid-cols-[110px,100px,120px,90px,60px]"
                    }  text-sm text-white gap-4 px-2 py-2  ${
                      exportFileStatus
                        ? "lg:grid-cols-[40px,160px,140px,110px,1fr,1fr,1fr,55px]"
                        : "lg:grid-cols-[160px,140px,110px,1fr,1fr,1fr,55px]"
                    } shadow-lg bg-[#0f2d6b]`}
                  >
                    <p
                      className={`truncate ${
                        exportFileStatus ? "block" : "hidden"
                      }`}
                    >
                      {" "}
                      {exportFileStatus ? (
                        <input
                          type="checkbox"
                          value={ele._id}
                          onChange={() =>
                            handleSelectMultipleClientForCases(ele._id)
                          }
                          checked={allcaseId.includes(ele._id || "")}
                          className="checkbox-small w-[12px] h-[12px]"
                        />
                      ) : null}
                    </p>
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

      {/* Pagination*/}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      {/* Modal for Details  */}

      <ClientDetailsModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        caseDetails={caseDetails}
        handleInputChange={handleInputChange}
        handleDownloadAllAttachment={handleDownloadAllAttachment}
        handleDownloadAllorder={handleDownloadAllorderSheet}
        handleDownloadAward={handleDownloadAward}
        handleRecordings={() => handleRecordings(documentDetail.recording)}
        closeDetailsFunc={closeDetailsFunc}
        convertToDateNow={convertToDateNow}
        handleMeeting={handleMeeting}
      />
    </div>
  );
};

export default ClientCases;
