import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { FcStart, FcVideoCall } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDone } from "react-icons/md";
import { SiGoogleforms } from "react-icons/si";
import { IoEye, IoSearch } from "react-icons/io5";
import { FaAward } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { recordingData } from "@/global/action";
import OrderSheet from "./OrderSheet";
import GenerateAward from "./GenerateAward";
import DoneWithMeet from "./DoneWithMeet";
import ScheduleMeeting from "./ScheduleMeeting";
import { IoMdCloudDownload, IoMdDownload } from "react-icons/io";
import ArbitratorDetailsModal from "./ArbitratorDetailsModal";
import FilterAllData from "./FilterAllData";

const ArbitratorCases = () => {
  const [loading, setLoading] = useState(false);
  const [searchByData, setSearchByData] = useState("");
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [arbitratorCaseData, setArbitratorCaseData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);
  const [selectStartDate, setSelectStartDate] = useState(new Date());
  const [selectEndDate, setSelectEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  const [searchByFileName, setSearchByFileName] = useState("");
  const [caseId, setCaseId] = useState("");

  // meeting schedule for multiple client
  const [isClickedForMultiple, setIsClickedForMultiple] = useState(false);
  const [caseIdForMeeting, setCaseIdForMeeting] = useState([]);
  const [selectAllClientStatus, setSelectAllClientStatus] = useState(false);
  const [isCompletedMeetPopUp, setIsCompletedMeetPopUp] = useState("");

  //Award generation
  const [idForAward, setIdForAward] = useState("");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    caseIDForAward: "",
  });
  // Generate Order Sheet
  const [idForOrderSheet, setIdForOrderSheet] = useState("");
  const [fileForOrderSheet, setFileForOrderSheet] = useState("");

  // details data
  const [isOpen5, setIsOpen5] = useState(false);
  const [caseDetails, setCaseDetails] = useState({
    id: "",
    cl_name: "",
    cl_email: "",
    cl_num: "",
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

  let token = JSON.parse(localStorage.getItem("rechtechtoken"));

  const getArbitratorCaseData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/cases/arbitratorcases`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setArbitratorCaseData(res.data.caseData);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    getArbitratorCaseData();
  }, []);

  function convertToDateNow(isoTimestamp) {
    const date = new Date(isoTimestamp);
    return date.getTime();
  }

  useEffect(() => {
    if (!isOpen) {
      setCaseId("");
      setTitle("");
    }
    if (isOpen) {
      setSelectStartDate(new Date());
    }
  }, [isOpen]);

  // Schedule meeting modal
  const handleMeetingModal = (id) => {
    setCaseId(id);
    setIsOpen(true);
  };

  function getFormattedDateTime(dates) {
    const inputDate = new Date(dates);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0");
    const day = String(inputDate.getDate()).padStart(2, "0");
    const hours = String(inputDate.getHours()).padStart(2, "0");
    const minutes = String(inputDate.getMinutes()).padStart(2, "0");
    const seconds = String(inputDate.getSeconds()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDate;
  }

  const handleScheduleFunc = () => {
    const startDate = getFormattedDateTime(selectStartDate);
    const minutes = parseInt(timeDuration, 10);
    if (isNaN(minutes)) {
      toast.error("Invalid time duration");
      return;
    }
    const endDate = new Date(selectStartDate.getTime());
    endDate.setMinutes(endDate.getMinutes() + minutes);
    setSelectEndDate(endDate);
    const formattedEndDate = getFormattedDateTime(endDate);

   

    if (!isClickedForMultiple) {
      let obj = {
        caseId: caseId,
        title: title,
        startTime: startDate,
        endTime: formattedEndDate,
      };
      setLoading(true);
      axios
        .post(`${import.meta.env.VITE_API_BASEURL}/webex/create-meeting`, obj)
        .then((res) => {
          toast.success("Meeting Scheduled successfully");
          setTitle("");
          setSelectStartDate(new Date());
          setIsOpen(false);
          setCaseId("");
          setTimeout(() => {
            getArbitratorCaseData();
          }, 2000);
          setLoading(false);
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setLoading(false);
        });
    } else {
      let obj = {
        caseId: caseIdForMeeting,
        title: title,
        startTime: startDate,
        endTime: formattedEndDate,
      };
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_API_BASEURL}/webex/create-meeting-bulk`,
          obj
        )
        .then((res) => {
          toast.success("Meeting Scheduled successfully");
          setTitle("");
          setSelectStartDate(new Date());
          setIsOpen(false);
          setCaseId("");
          setTimeout(() => {
            getArbitratorCaseData();
          }, 2000);
          setLoading(false);
          setIsClickedForMultiple(false);
          setCaseIdForMeeting([]);
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setLoading(false);
        });
    }
  };

  function handleMeeting(meet) {
    window.open(meet.webLink, "_blank");
  }

  const handleDurationChange = (value) => {
    setTimeDuration(value);
  };
  useEffect(() => {
    console.log("End Date updated:", selectEndDate);
  }, [selectEndDate]);

  function handleMeetComplete(id) {
    axios
      .put(`${import.meta.env.VITE_API_BASEURL}/cases/updatemeetstatus`, { id })
      .then((res) => {
        toast.success("Case Updated");
        getArbitratorCaseData();
      })
      .catch((err) => {
        toast.error("Error in updating case");
      });
  }

  //download files
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

  //function to handle individual case selection
  const handleSelectMultipleClientForArbitrator = (id) => {
    setCaseIdForMeeting((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((existingId) => existingId !== id)
        : [...prevIds, id]
    );
  };

  //function to handle select all functionality
  const handleAllClientForMeeting = () => {
    const newSelectAllStatus = !selectAllClientStatus;
    setSelectAllClientStatus(newSelectAllStatus);

    if (newSelectAllStatus) {
      const unassignedCaseIds = arbitratorCaseData
        .filter((file) => {
          // File name filter
          if (!searchByFileName || searchByFileName === "all") return true;
          else if (searchByFileName === "singlecase")
            return file.fileName === "";
          return file.fileName
            ?.toLowerCase()
            .includes(searchByFileName.toLowerCase());
        })
        .filter((el) => {
          return el.isMeetCompleted == false;
        }) // Only unassigned cases
        .filter((ele) => {
          if (ele.meetings.length > 0) {
            const lastMeetingEnd = convertToDateNow(
              ele.meetings[ele.meetings.length - 1].end
            );
            if (lastMeetingEnd < Date.now()) {
              return true; // Include this element
            }
          } else {
            return true; // Include this element
          }
          return false; // Exclude this element
        })
        .map((ele) => ele._id); // Extr);
      // .map((el) => el._id);
      setCaseIdForMeeting(unassignedCaseIds);
    } else {
      // If deselecting, clear all selected cases
      setCaseIdForMeeting([]);
    }
  };

  const handleUploadFunctionbulk = () => {
    setIsOpen(true);
  };

  // to get unique file name in the filter
  const uniqueFileName = [];
  const seeFileName = new Set();
  arbitratorCaseData.forEach((item) => {
    if (!seeFileName.has(item.fileName)) {
      seeFileName.add(item.fileName);
      uniqueFileName.push(item);
    }
  });

  // All meetings completed
  const handleAllMeetingCompleted = (id) => {
    setIsOpen2(true);
    setIsCompletedMeetPopUp(id);
  };

  const handleMeetingNotCompleted = () => {
    setIsOpen2(false);
  };

  const handleMeetCompletedFunc = () => {
    handleMeetComplete(isCompletedMeetPopUp);
    setIsOpen2(false);
  };

  // Generate Award Sheet
  const generateAwardFunc = (id) => {
    setIsOpen3(true);
    setIdForAward(id);
  };

  const handleAwardGenerateFunc = (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file");
      return;
    }
    if (!file.name.includes("pdf")) {
      toast.error("Only pdf files is allowed");
      return;
    }
    const submitData = new FormData();
    submitData.append("file", file);
    submitData.append("caseId", idForAward);
    axios
      .post(
        `${import.meta.env.VITE_API_BASEURL}/cases/uploadawards`,
        submitData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success("Award sheet uploaded");
        setIsOpen3(false);
        setCaseId("");
        setTimeout(() => {
          getArbitratorCaseData();
        }, 2000);
      })
      .catch((err) => {
        toast.error("Some error happen");
      });
  };
  function handleDownloadAward(link) {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    anchor.download = "";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  const generateOrderSheet = (id) => {
    setIsOpen4(true);
    setIdForOrderSheet(id);
  };

  const handleOrderSheet = (e) => {
    e.preventDefault();
    if (!fileForOrderSheet) {
      toast.error("Please select a file");
      return;
    }

    if (!fileForOrderSheet.name.includes("pdf")) {
      toast.error("Only Pdf file is allowed");
      return;
    }
    const submitOrderSheetData = new FormData();
    submitOrderSheetData.append("file", fileForOrderSheet);
    submitOrderSheetData.append("caseId", idForOrderSheet);
    axios
      .post(
        `${import.meta.env.VITE_API_BASEURL}/cases/uploadordersheet`,
        submitOrderSheetData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success("Order sheet uploaded");
        setIsOpen4(false);
        setIdForOrderSheet("");
        setTimeout(() => {
          getArbitratorCaseData();
        }, 2000);
      })
      .catch((err) => {
        toast.error("Some error happen");
      });
  };

  // navigate the recordings
  function handleRecordings(cases) {
    dispatch(recordingData(cases.recordings));
    navigate("/arbitrator/cases/recordings");
  }

  //Details modal
  const handleDetailsFunc = (el) => {
    setCaseDetails({
      id: el?.caseId,
      cl_name: el?.clientName,
      cl_email: el?.clientEmail,
      cl_num: el?.clientMobile,
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
    setIsOpen5(true);
  };

  const closeDetailsFunc = () => {
    setIsOpen5(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocumentDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="bg-[#012061] min-h-[100vh]">
        <div className="max-w-[1070px] mx-auto bg-[#012061] min-h-[100%] py-3">
          <FilterAllData
            setSearchByFileName={setSearchByFileName}
            uniqueFileName={uniqueFileName}
            searchByData={searchByData}
            setSearchByData={setSearchByData}
            arbitratorCaseData={arbitratorCaseData}
            setCaseId={setCaseId}
            setCaseIdForMeeting={setCaseIdForMeeting}
            selectAllClientStatus={selectAllClientStatus}
            setSelectAllClientStatus={setSelectAllClientStatus}
            isClickedForMultiple={isClickedForMultiple}
            setIsClickedForMultiple={setIsClickedForMultiple}
            handleAllClientForMeeting={handleAllClientForMeeting}
            handleUploadFunctionbulk={handleUploadFunctionbulk}
            caseIdForMeeting={caseIdForMeeting}
          />

          {arbitratorCaseData.length > 0 ? (
            <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
              <div
                className={`grid mt-5 font-semibold lg:px-3 rounded-md ${
                  isClickedForMultiple
                    ? "grid-cols-[40px,1fr,70px,50px]"
                    : "grid-cols-[1fr,70px,60px]"
                } ${
                  isClickedForMultiple
                    ? "md:grid-cols-[40px,1fr,1fr,80px,60px]"
                    : "md:grid-cols-[1fr,1fr,80px,60px]"
                }  ${
                  isClickedForMultiple
                    ? "lg:grid-cols-[40px,160px,140px,110px,1fr,1fr,1fr,50px]"
                    : "lg:grid-cols-[160px,140px,110px,1fr,1fr,1fr,50px]"
                } text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]`}
              >
                <p
                  className={`truncate ${
                    isClickedForMultiple ? "block" : "hidden"
                  }`}
                >
                  Select
                </p>
                <p className="truncate min-w-[60px]">Cl. Name</p>
                <p className="truncate hidden lg:block">Res. Name</p>
                <p className="truncate hidden lg:block">Attachment</p>
                <p className="truncate ml-0 md:ml-3 lg:ml-0 hidden md:block">
                  File
                </p>
                <p className="truncate hidden lg:block">Recording</p>
                <p className="truncate">Action</p>
                <p className="truncate">Details</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-24 text-white text-2xl font-semibold">
              No Docs Available
            </div>
          )}

          <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
            {arbitratorCaseData
              .filter((el) => {
                if (!searchByData) return true;
                return (
                  el.clientName.toLowerCase().includes(searchByData) ||
                  el.clientEmail.toLowerCase().includes(searchByData) ||
                  el.clientMobile.toLowerCase().includes(searchByData) ||
                  el.respondentName.toLowerCase().includes(searchByData) ||
                  el.respondentEmail.toLowerCase().includes(searchByData) ||
                  el.respondentMobile.toLowerCase().includes(searchByData) ||
                  el.disputeType.toLowerCase().includes(searchByData)
                );
              })
              .filter((file) => {
                if (!searchByFileName || searchByFileName === "all")
                  return true;
                else if (searchByFileName === "singlecase")
                  return file.fileName == "";
                return file.fileName
                  ?.toLowerCase()
                  .includes(searchByFileName.toLowerCase());
              })
              .map((ele) => {
                return (
                  <div
                    key={ele._id}
                    className={`grid mt-1 rounded-md ${
                      isClickedForMultiple
                        ? "grid-cols-[40px,1fr,70px,60px]"
                        : "grid-cols-[1fr,70px,60px]"
                    } ${
                      isClickedForMultiple
                        ? "md:grid-cols-[40px,1fr,1fr,80px,60px]"
                        : "md:grid-cols-[1fr,1fr,80px,60px]"
                    }  text-sm text-white gap-4 px-2 py-2  ${
                      isClickedForMultiple
                        ? "lg:grid-cols-[40px,160px,140px,110px,1fr,1fr,1fr,55px]"
                        : "lg:grid-cols-[160px,140px,110px,1fr,1fr,1fr,55px]"
                    } shadow-lg bg-[#0f2d6b]`}
                  >
                    <p
                      className={`truncate ${
                        isClickedForMultiple ? "block" : "hidden"
                      }`}
                    >
                      {" "}
                      {isClickedForMultiple ? (
                        <input
                          type="checkbox"
                          value={ele._id}
                          disabled={
                            ele.isMeetCompleted ||
                            (!ele.isMeetCompleted &&
                              ele.meetings.length > 0 &&
                              convertToDateNow(
                                ele.meetings[ele.meetings.length - 1].end
                              ) > Date.now())
                          }
                          onChange={() =>
                            handleSelectMultipleClientForArbitrator(ele._id)
                          }
                          checked={caseIdForMeeting.includes(ele._id)}
                          className="checkbox-small w-[12px] h-[12px]"
                        />
                      ) : null}
                    </p>
                    <p className="truncate min-w-[60px]">{ele?.clientName}</p>
                    <p className="truncate ml-3 hidden lg:block">
                      {ele?.respondentName}
                    </p>

                    <p className="truncate ml-3 hidden lg:block">
                      {ele.attachments.length > 0 ? (
                        <IoMdDownload
                          className="cursor-pointer text-sm ml-6 text-green-600"
                          onClick={() =>
                            handleDownloadAllAttachment(ele.attachments)
                          }
                        />
                      ) : (
                        "No Attach."
                      )}
                    </p>

                    <p className="truncate hidden md:block">
                      {ele.isFileUpload ? ele.fileName : "Single Case"}
                    </p>

                    <p className="truncate hidden lg:block">
                      {ele.recordings.length > 0 ? (
                        <IoEye
                          onClick={() => handleRecordings(ele)}
                          className="ml-4 text-xl cursor-pointer text-green-500"
                        />
                      ) : (
                        <span className="font-semibold ml-2">No Meet.</span>
                      )}
                    </p>

                    <p className="truncate text-[25px] cursor-pointer">
                      {!ele.isMeetCompleted ? (
                        ele.meetings.length < 1 ? (
                          <FcVideoCall
                           className="text-green-500"
                            onClick={() =>
                              isClickedForMultiple
                                ? null
                                : handleMeetingModal(ele._id)
                            }
                          />
                        ) : convertToDateNow(
                            ele.meetings[ele?.meetings.length - 1].end
                          ) > Date.now() ? (
                          <span className="flex gap-1">
                            <FcStart
                             className="text-green-500"
                              onClick={() =>
                                handleMeeting(
                                  ele.meetings[ele?.meetings.length - 1]
                                )
                              }
                            />
                            <MdOutlineDone
                            className="text-green-500"
                              onClick={() => {
                                handleAllMeetingCompleted(ele._id);
                              }}
                            />
                          </span>
                        ) : (
                          <span className="flex gap-1 items-center">
                            <FcVideoCall
                            className="text-green-500"
                              onClick={() =>
                                isClickedForMultiple
                                  ? null
                                  : handleMeetingModal(ele._id)
                              }
                            />
                            <SiGoogleforms
                              className="text-[16px] text-green-500"
                              onClick={() => generateOrderSheet(ele._id)}
                            />
                            <MdOutlineDone
                            className="text-green-500"
                              onClick={() => handleAllMeetingCompleted(ele._id)}
                            />
                          </span>
                        )
                      ) : null}
                      {ele.isMeetCompleted && !ele.isAwardCompleted ? (
                        <FaAward className="text-green-500" onClick={() => generateAwardFunc(ele._id)} />
                      ) : null}
                      {ele.isAwardCompleted ? (
                        <span
                          className="flex items-center text-[18px] gap-1"
                          onClick={() => handleDownloadAward(ele.awards[0])}
                        >
                          <IoMdCloudDownload className="text-green-500"/>{" "}
                          <span className="text-[12px] font-semibold">
                            Awards
                          </span>
                        </span>
                      ) : null}
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

      {/* Schedule Meeting */}
      <ScheduleMeeting
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={title}
        setTitle={setTitle}
        selectStartDate={selectStartDate}
        setSelectStartDate={setSelectStartDate}
        handleDurationChange={handleDurationChange}
        loading={loading}
        handleScheduleFunc={handleScheduleFunc}
      />

      {/* Are you sure you want to end the meet always*/}
      <DoneWithMeet
        isOpen2={isOpen2}
        setIsOpen2={setIsOpen2}
        handleMeetingNotCompleted={handleMeetingNotCompleted}
        handleMeetCompletedFunc={handleMeetCompletedFunc}
      />

      {/* Upload Award  */}
      <GenerateAward
        isOpen3={isOpen3}
        setIsOpen3={setIsOpen3}
        file={file}
        setFile={setFile}
        handleAwardGenerateFunc={handleAwardGenerateFunc}
      />

      {/* Genetate Order Sheet */}
      <OrderSheet
        isOpen4={isOpen4}
        setIsOpen4={setIsOpen4}
        fileForOrderSheet={fileForOrderSheet}
        setFileForOrderSheet={setFileForOrderSheet}
        handleOrderSheet={handleOrderSheet}
      />

      {/* Modal for Details  */}

      <ArbitratorDetailsModal
        isOpen5={isOpen5}
        setIsOpen5={setIsOpen5}
        caseDetails={caseDetails}
        handleInputChange={handleInputChange}
        handleDownloadAllAttachment={handleDownloadAllAttachment}
        handleDownloadAllorder={handleDownloadAllorder}
        handleDownloadAward={handleDownloadAward}
        handleMeeting={handleMeeting}
        handleRecordings={()=>handleRecordings(documentDetail.recording)}
        closeDetailsFunc={closeDetailsFunc}
        convertToDateNow={convertToDateNow}
      />
      </div>
  );
};

export default ArbitratorCases;
