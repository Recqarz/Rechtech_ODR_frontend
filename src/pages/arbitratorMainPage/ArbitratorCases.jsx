import React, { useEffect, useState } from "react";
import styles from "../AdminDashboard/ArbitratorDashboard/ArbitratorDashboard.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { FcStart, FcVideoCall } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { CgRecord } from "react-icons/cg";
import { MdOutlineDone } from "react-icons/md";
import { SiGoogleforms } from "react-icons/si";
import { IoMdCloudDownload } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";
import NoDataFound from "@/components/NoDataFound";
import { IoMdDownload } from "react-icons/io";
import { Checkbox } from "@/components/ui/checkbox";
import { FaAward } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { recordingData } from "@/global/action";

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
      console.error("Invalid time duration");
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
  const handleDownloadAll = (links) => {
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

  // Generate order sheet
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
      toast.error("Only pdf files is allowed");
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

  function handleDownloadAward(link) {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    anchor.download = "";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  function handleRecordings(cases) {
    dispatch(recordingData(cases.recordings));
    navigate("/arbitrator/cases/recordings");
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

  return (
    <div>
      <div className="w-[100%] mx-auto mt-10 px-2">
        <div className="flex gap-4">
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

          {/* Filter by file name */}
          <div className="sm:w-[15%] bg-blue-50">
            <Select
              id="name"
              className="w-full"
              onValueChange={(e) => setSearchByFileName(e)}
            >
              <SelectTrigger className="w-full bg-blue-50">
                <SelectValue placeholder="File Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key="all" value="all">
                    All
                  </SelectItem>
                  <SelectItem key="Single Case" value="singlecase">
                    Single Case
                  </SelectItem>
                  {uniqueFileName?.map((item) => {
                    if (item.isFileUpload) {
                      return (
                        <SelectItem key={item._id} value={item.fileName}>
                          {item.fileName}
                        </SelectItem>
                      );
                    }
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 items-center ml-3">
            <Checkbox
              onClick={() => setIsClickedForMultiple(!isClickedForMultiple)}
              checked={isClickedForMultiple}
            />
            <p>Select Multiple</p>
          </div>

          {isClickedForMultiple ? (
            <div className="flex gap-2 items-center ml-1">
              <Checkbox
                value="allclient"
                checked={selectAllClientStatus}
                onClick={handleAllClientForMeeting}
              />
              <p>Select All</p>
            </div>
          ) : null}

          {caseIdForMeeting.length > 0 ? (
            <div className="flex gap-1 items-center">
              <FcVideoCall
                onClick={handleUploadFunctionbulk}
                style={{
                  fontSize: "30px",
                  cursor: "pointer",
                }}
              />
              <p>Schedule Meeting</p>
            </div>
          ) : null}
        </div>

        {arbitratorCaseData.length > 0 ? (
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>{isClickedForMultiple ? "Status" : null}</th>
                <th>Client Name</th>
                <th>Client No.</th>
                <th>Res. Name</th>
                <th>Res. No.</th>
                <th>Type</th>
                <th>File</th>
                <th>Attachment</th>
                <th>Recordings</th>
                <th>Order</th>
                <th>Action</th>
              </tr>
            </thead>
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
              .map((cases) => (
                <tbody key={cases._id}>
                  <tr className={styles.trbody}>
                    <td data-label="checkbox">
                      {isClickedForMultiple ? (
                        <input
                          type="checkbox"
                          value={cases._id}
                          disabled={
                            cases.isMeetCompleted ||
                            (!cases.isMeetCompleted &&
                              cases.meetings.length > 0 &&
                              convertToDateNow(
                                cases.meetings[cases.meetings.length - 1].end
                              ) > Date.now())
                          }
                          onChange={() =>
                            handleSelectMultipleClientForArbitrator(cases._id)
                          }
                          checked={caseIdForMeeting.includes(cases._id)}
                          className="checkbox-small w-[12px] h-[12px]"
                        />
                      ) : null}
                    </td>
                    <td data-label="client name">{cases.clientName}</td>
                    <td data-label="client number">{cases.clientMobile}</td>
                    <td data-label="respondant name">{cases.respondentName}</td>
                    <td data-label="respondence number">
                      {cases.respondentMobile}
                    </td>
                    <td data-label="dispute type">{cases.disputeType}</td>
                    <td data-label="case type">
                      {cases.isFileUpload ? cases.fileName : "Single Case"}
                    </td>

                    <td data-label="attachment">
                      <div className="flex items-center">
                        {cases.attachments.length > 0 ? (
                          <IoMdDownload
                            className="cursor-pointer text-sm ml-6"
                            onClick={() => handleDownloadAll(cases.attachments)}
                          />
                        ) : (
                          "No attach"
                        )}
                      </div>
                    </td>
                    <td>
                      {cases.recordings.length > 0 ? (
                        <IoEye
                          onClick={() => handleRecordings(cases)}
                          className="ml-4 text-xl cursor-pointer"
                        />
                      ) : (
                        <p className="font-semibold ml-2">No Meet.</p>
                      )}
                    </td>

                    <td>
                      {cases.orderSheet.length > 0 ? (
                        <IoMdDownload
                          className="cursor-pointer text-sm ml-6"
                          onClick={() =>
                            handleDownloadAllorder(cases.orderSheet)
                          }
                        />
                      ) : (
                        <p className="font-semibold ml-2">No Order.</p>
                      )}
                    </td>

                    <td
                      data-label="Meeting Schedule"
                      style={{
                        color: "blue",
                        fontSize: "24px",
                        cursor: "pointer",
                      }}
                    >
                      {!cases.isMeetCompleted ? (
                        cases.meetings.length < 1 ? (
                          <FcVideoCall
                            onClick={() =>
                              isClickedForMultiple
                                ? null
                                : handleMeetingModal(cases._id)
                            }
                          />
                        ) : convertToDateNow(
                            cases.meetings[cases?.meetings.length - 1].end
                          ) > Date.now() ? (
                          <div className="flex gap-1">
                            <FcStart
                              onClick={() =>
                                handleMeeting(
                                  cases.meetings[cases?.meetings.length - 1]
                                )
                              }
                            />
                            <MdOutlineDone
                              onClick={() => {
                                handleAllMeetingCompleted(cases._id);
                                // handleMeetComplete(cases._id)
                              }}
                            />
                          </div>
                        ) : (
                          <div className="flex gap-1 items-center">
                            <FcVideoCall
                              onClick={() =>
                                isClickedForMultiple
                                  ? null
                                  : handleMeetingModal(cases._id)
                              }
                            />
                            <SiGoogleforms
                              className="text-[16px]"
                              onClick={() => generateOrderSheet(cases._id)}
                            />
                            <MdOutlineDone
                              onClick={
                                () => handleAllMeetingCompleted(cases._id)
                                // handleMeetComplete(cases._id)
                              }
                            />
                          </div>
                        )
                      ) : null}
                      {cases.isMeetCompleted && !cases.isAwardCompleted ? (
                        <FaAward onClick={() => generateAwardFunc(cases._id)} />
                      ) : null}
                      {cases.isAwardCompleted ? (
                        <p
                          className="flex items-center text-[18px]"
                          onClick={() => handleDownloadAward(cases.awards[0])}
                        >
                          <IoMdCloudDownload />{" "}
                          <span className="text-[12px] font-semibold">
                            Awards
                          </span>
                        </p>
                      ) : null}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        ) : (
          <NoDataFound />
        )}
      </div>

      {/* Schedule Meeting */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-lg shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Schedule Meeting
            </DialogTitle>
            <div className="space-y-4">
              <DialogDescription className="text-sm text-gray-600">
                <Label className="block text-sm font-medium text-gray-700">
                  Title:
                </Label>
                <Input
                  type="text"
                  className="mt-3"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </DialogDescription>
            </div>
          </DialogHeader>

          <DialogHeader className="space-y-4">
            {/* Start Date Picker */}
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Time
            </DialogTitle>
            <div className="flex gap-10 items-center">
              <Label className="text-sm font-medium text-gray-700 my-2">
                Start Date and Time
              </Label>
              <DatePicker
                selected={selectStartDate}
                onChange={(date) => setSelectStartDate(date)}
                showTimeSelect
                dateFormat="Pp"
                minDate={new Date()}
                minTime={
                  selectStartDate &&
                  selectStartDate.toDateString() === new Date().toDateString()
                    ? new Date()
                    : new Date().setHours(0, 0)
                }
                maxTime={new Date().setHours(23, 59)}
                customInput={<Input type="datetime" />}
              />
            </div>

            {/* End Time Picker */}
            <div className="flex gap-20 items-center">
              <Label className="text-sm font-medium text-gray-700 my-2">
                Time Duration
              </Label>
              <Select onValueChange={handleDurationChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DialogHeader>

          <DialogFooter className="mt-6 flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={handleScheduleFunc}
            >
              {loading ? "Scheduling..." : "Schedule"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Are you sure you want to end the meet always*/}
      <Dialog open={isOpen2} onOpenChange={setIsOpen2}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-lg shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Are you sure, You want to end up meet for ever?
            </DialogTitle>
          </DialogHeader>

          <DialogFooter className="mt-6 flex justify-end">
            <Button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={handleMeetingNotCompleted}
            >
              No
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={handleMeetCompletedFunc}
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Upload Award  */}
      <Dialog open={isOpen3} onOpenChange={setIsOpen3}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-lg shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Upload the Award sheet.
            </DialogTitle>

            <div className="space-y-4">
              <DialogDescription className="text-sm text-red-500 font-semibold">
                Only PDF file is Allowed!
              </DialogDescription>
            </div>

            <div className="flex flex-col">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                PDF File <span className="text-red-500">*</span>
              </Label>
              <label
                htmlFor="uploadFile1"
                className="w-[200px] md:w-[300px] ml-[100px] md:ml-[120px] lg:ml-[120px] mt-[-15px] bg-white text-gray-500 font-semibold text-base rounded h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-11 mb-2 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Upload file
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                  id="uploadFile1"
                  className="hidden"
                />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  Only .pdf file is allowed.
                </p>
              </label>
              {file ? (
                <div className="text-sm text-gray-600 mt-2 text-center">
                  Selected file: {file.name}
                </div>
              ) : null}
            </div>
          </DialogHeader>

          <DialogFooter className="mt-6 flex justify-end">
            <Button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={handleAwardGenerateFunc}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Genetate Order Sheet */}

      <Dialog open={isOpen4} onOpenChange={setIsOpen4}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-lg shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Generate Order sheet.
            </DialogTitle>

            {/* <div className="space-y-4">
              <DialogDescription className="relative group mt-6 text-sm text-gray-600">
                <textarea
                  name="textForOrderSheet"
                  value={textForOrderSheet}
                  onChange={(e)=>setTextForOrderSheet(e.target.value)}
                  rows="4"
                  className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                  About (Max 500 Characters)
                </label>
              </DialogDescription>
            </div> */}

            <div className="space-y-4">
              <DialogDescription className="text-sm text-red-500 font-semibold">
                Only PDF file is Allowed!
              </DialogDescription>
            </div>

            <div className="flex flex-col">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                PDF File <span className="text-red-500">*</span>
              </Label>
              <label
                htmlFor="uploadOrdersheetFile1"
                className="w-[200px] md:w-[300px] ml-[100px] md:ml-[120px] lg:ml-[120px] mt-[-15px] bg-white text-gray-500 font-semibold text-base rounded h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-11 mb-2 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Upload file
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    setFileForOrderSheet(e.target.files[0]);
                  }}
                  id="uploadOrdersheetFile1"
                  className="hidden"
                />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  Only .pdf file is allowed.
                </p>
              </label>
              {fileForOrderSheet ? (
                <div className="text-sm text-gray-600 mt-2 text-center">
                  Selected file: {fileForOrderSheet.name}
                </div>
              ) : null}
            </div>
          </DialogHeader>
          <DialogFooter className="mt-6 flex justify-end">
            <Button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={handleOrderSheet}
            >
              Generate Order Sheet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArbitratorCases;
