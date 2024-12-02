import React, { useEffect, useState } from "react";
import styles from "../AdminDashboard/ArbitratorDashboard/ArbitratorDashboard.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { FcStart, FcVideoCall } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { CgRecord } from "react-icons/cg";
import { MdOutlineDone } from "react-icons/md";
import { SiGoogleforms } from "react-icons/si";
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

const ArbitratorCases = () => {
  const [loading, setLoading] = useState(false);
  const [searchByData, setSearchByData] = useState("");
  const navigate = useNavigate();
  const [arbitratorCaseData, setArbitratorCaseData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectStartDate, setSelectStartDate] = useState(new Date());
  const [selectEndDate, setSelectEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [timeDuration, setTimeDuration] = useState("");
  // const [description, setDescription] = useState("");
  // const [meetingStatus, setMeetingStatus] = useState(false);
  const [caseId, setCaseId] = useState("");

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
        console.log("all", res.data.caseData);
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
      // setDescription("");
    }
    if (isOpen) {
      setSelectStartDate(new Date());
    }
  }, [isOpen]);

  const handleMeetingModal = (id) => {
    setCaseId(id);
    setIsOpen(true);
  };

  function getFormattedDateTime(dates) {
    const inputDate = new Date(dates);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
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
    // console.log("Minutes:", minutes);
    // console.log("Start Date:", selectStartDate);
    const endDate = new Date(selectStartDate.getTime());
    endDate.setMinutes(endDate.getMinutes() + minutes);
    setSelectEndDate(endDate);
    const formattedEndDate = getFormattedDateTime(endDate); // Corrected function name
    console.log("End Date Object:", formattedEndDate, startDate);
    let obj = {
      caseId: caseId,
      title: title,
      // description: description,
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

  return (
    <div>
      <div className="w-[100%] mx-auto mt-2 px-2">
        <div className="flex flex-shrink-0 w-[80%] ml-14 mt-6 md:ml-0 md:mt-0 items-center sm:w-[20%] border rounded-xl p-2 bg-blue-50 border-gray-300">
          <input
            type="text"
            placeholder="Search"
            className="flex-grow outline-none bg-transparent text-sm"
            onChange={(e) => setSearchByData(e.target.value)}
          />
          <button className="text-gray-500 hover:text-gray-700">
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

        {arbitratorCaseData.length > 0 ? (
          <table cellSpacing="0">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Client No.</th>
                <th>Res. Name</th>
                <th>Res. No.</th>
                <th>Type</th>
                <th>File</th>
                <th>Attachment</th>
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
              .map((cases) => (
                <tbody key={cases._id}>
                  <tr className={styles.trbody}>
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
                      <div className="flex gap-1">
                        {cases.attachments.length > 0 ? (
                          <IoMdDownload
                            className="cursor-pointer text-sm"
                            onClick={() => handleDownloadAll(cases.attachments)}
                          />
                        ) : (
                          "No attach"
                        )}
                      </div>
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
                            onClick={() => handleMeetingModal(cases._id)}
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
                              onClick={() => handleMeetComplete(cases._id)}
                            />
                          </div>
                        ) : (
                          <div className="flex gap-1 justify-center items-center">
                            <FcVideoCall
                              onClick={() => handleMeetingModal(cases._id)}
                            />
                            <SiGoogleforms className="text-[16px]" />
                            <MdOutlineDone
                              onClick={() => handleMeetComplete(cases._id)}
                            />
                          </div>
                        )
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
    </div>
  );
};

export default ArbitratorCases;
