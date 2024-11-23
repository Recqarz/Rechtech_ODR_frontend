import React, { useEffect, useState } from "react";
import styles from "../AdminDashboard/ArbitratorDashboard/ArbitratorDashboard.module.css";
import toast from "react-hot-toast";
import axios from "axios";
import { FcStart, FcVideoCall } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { CgRecord } from "react-icons/cg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { cn } from "@/lib/utils";

const ArbitratorCases = () => {
  const navigate = useNavigate();
  const [arbitratorCaseData, setArbitratorCaseData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectStartDate, setSelectStartDate] = useState(new Date());
  const [selectEndDate, setSelectEndDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [meetingStatus, setMeetingStatus] = useState(false);
  const [caseId, setCaseId] = useState("");

  let token = JSON.parse(localStorage.getItem("rechtechtoken"));

  const getArbitratorCaseData = () => {
    axios
      .get("http://localhost:3000/uploadcasedata/arbitratorcases", {
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

  useEffect(() => {
    if (!isOpen) {
      setCaseId("");
      setTitle("");
      setDescription("");
    }
    if (isOpen) {
      setSelectStartDate(new Date());
      setSelectEndDate(new Date());
    }
  }, [isOpen]);

  const handleMeetingModal = (id) => {
    setCaseId(id);
    setIsOpen(true);
  };

  function getformayyeddatetime(dates) {
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
    const startdate = getformayyeddatetime(selectStartDate);
    const enddate = getformayyeddatetime(selectEndDate);
    let obj = {
      caseId: caseId,
      title: title,
      description: description,
      startTime: startdate,
      endTime: enddate,
    };
    axios
      .post("http://localhost:3000/meeting", obj)
      .then((res) => {
        toast.success("Meeting Scheduled successfully");
        setTitle("");
        setDescription("");
        setSelectStartDate(new Date());
        setSelectEndDate(new Date());
        setIsOpen(false);
        setCaseId("");
        setTimeout(() => {
          getArbitratorCaseData();
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  function handleMeeting(meet) {
    // console.log(meet)
    // console.log(link)
    window.open(meet[meet.length - 1], "_blank");
  }

  // :clientcase.meetLinks.length > 0 && selectEndDate < new Date()? (
  //   <CgRecord
  //   />
  // )




  return (
    <div>
      <div className="w-[100%] mx-auto mt-2 px-2">
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>File Name</th>
              <th>Uploaded Date</th>
              <th>Action</th>
            </tr>
          </thead>
          {arbitratorCaseData.map((clientcase) => (
            <tbody key={clientcase._id}>
              <tr className={styles.trbody}>
                <td data-label="Name">{clientcase.clientName}</td>
                <td data-label="Email ID">{clientcase.clientEmail}</td>
                <td
                  data-label="File Nmae"
                  className={styles.number}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/defaulter/${clientcase._id}`)}
                >
                  {clientcase.fileName}
                </td>

                <td data-label="No. of assign Case">
                  {clientcase.uploadDate
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </td>

                <td
                  data-label="Meeting Schedule"
                  style={{
                    color: "blue",
                    fontSize: "24px",
                    cursor: "pointer",
                  }}
                >
                  {/* {clientcase?.meetLinks.length>0? "Start meeting" : "Schedule meeting"} */}
                  {!clientcase.meetLinks.length > 0 ? (
                    <FcVideoCall
                      onClick={() => handleMeetingModal(clientcase._id)}
                    />
                  ):(
                    <FcStart
                      onClick={() => handleMeeting(clientcase.meetLinks)}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </table>
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
              <DialogDescription className="text-sm text-gray-600">
                <Label className="block text-sm font-medium text-gray-700">
                  Description:
                </Label>
                <Textarea
                  type="text"
                  className="mt-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                minTime={new Date().setHours()}
                customInput={<Input type="datetime" />}
              />
            </div>

            {/* End Date Picker */}
            <div className="flex gap-11 items-center">
              <Label className="text-sm font-medium text-gray-700 my-2">
                End Date and Time
              </Label>
              <DatePicker
                selected={selectEndDate}
                onChange={(date) => setSelectEndDate(date)}
                showTimeSelect
                dateFormat="Pp"
                minDate={selectStartDate || new Date()}
                customInput={<Input type="datetime" />}
              />
            </div>
          </DialogHeader>

          <DialogFooter className="mt-6 flex justify-end">
            <Button
              type="submit"
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              onClick={handleScheduleFunc}
            >
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArbitratorCases;
