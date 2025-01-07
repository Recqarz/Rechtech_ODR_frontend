import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcStart } from "react-icons/fc";
import { IoSearch } from "react-icons/io5";
import RespondentCasesModal from "./RespondentCasesModal";

const RespondentCase = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
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
  });

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

  const handleDownloadAllAttachment = (links) => {
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

  //click on details(Modal)
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

  return (
    <>
      <div className="w-full bg-[#012061] min-h-[100vh]">
        <div className="max-w-[1070px] mx-auto bg-[#012061] min-h-[100%] py-3">
          <div className="flex justify-end px-3">
            <div className="relative w-[230px] md:w-[280px] h-[32px] mt-[5px] md:mt-0">
              <Input
                className="w-full h-full  rounded-md placeholder:font-semibold"
                placeholder="Search here"
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
              />
              <IoSearch className="absolute top-[25%] right-4 text-lg text-blue-700" />
            </div>
          </div>

          {data.length > 0 ? (
            <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
              <div className="grid mt-5  lg:px-3 rounded-md grid-cols-[60px,1fr,50px] md:grid-cols-[80px,1fr,1fr,50px]  lg:grid-cols-[100px,1fr,1fr,1fr,50px] text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]">
                <p className="truncate min-w-[60px]">Cl. Name</p>
                <p className="truncate hidden lg:block">Res. Name</p>
                <p className="truncate ml-0 md:ml-3 lg:ml-0">Arbitrator</p>
                <p className="truncate hidden md:block">Meetings</p>
                <p className="truncate">Action</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-24 text-white text-2xl font-semibold">
              No Docs Available
            </div>
          )}

          <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
            {data
              .filter((item) => {
                if (!searchData) return true;
                return (
                  item.clientName
                    .toLowerCase()
                    .includes(searchData.toLowerCase()) ||
                  item.respondentName
                    .toLowerCase()
                    .includes(searchData.toLowerCase()) ||
                  item.arbitratorName
                    .toLowerCase()
                    .includes(searchData.toLowerCase())
                );
              })
              .map((ele) => {
                return (
                  <div
                    key={ele._id}
                    className="grid rounded-md grid-cols-[60px,1fr,60px] md:grid-cols-[80px,1fr,1fr,60px]  lg:grid-cols-[100px,1fr,1fr,1fr,60px] text-sm text-white gap-4 px-2 py-2 shadow-lg bg-[#0f2d6b]"
                  >
                    <p className="truncate min-w-[60px]">{ele.clientName}</p>
                    <p className="truncate ml-3 hidden lg:block">
                      {ele.respondentName}
                    </p>
                    <p className="truncate">{ele.arbitratorName?ele.arbitratorName:"Not Assigned"}</p>
                    <p className="truncate hidden md:block">
                      {ele.meetings.length > 0 &&
                      convertToDateNow(
                        ele.meetings[ele?.meetings.length - 1].end
                      ) > Date.now() ? (
                        <div
                          onClick={() =>
                            handleMeeting(
                              ele.meetings[ele?.meetings.length - 1]
                            )
                          }
                          className="flex cursor-pointer"
                        >
                          <FcStart className="text-3xl" />
                          <span className="font-sm font-semibold mt-1">
                            Start
                          </span>
                        </div>
                      ) : ele.meetings.length > 0 ? (
                        "Completed"
                      ) : (
                        "Not Scheduled"
                      )}
                    </p>

                    <p
                      onClick={() => handleDetailsFunc(ele)}
                      className="cursor-pointer px-2 bg-green-500 py-1 rounded-md"
                    >
                      Details
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* modal for details for cases */}

      <RespondentCasesModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        caseDetails={caseDetails}
        handleInputChange={handleInputChange}
        handleMeeting={handleMeeting}
        handleDownloadAllAttachment={handleDownloadAllAttachment}
        closeDetailsFunc={closeDetailsFunc}
        convertToDateNow={convertToDateNow}
      />
    </>
  );
};

export default RespondentCase;
