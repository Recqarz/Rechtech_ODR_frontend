import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdDownload } from "react-icons/io";
import toast from "react-hot-toast";
import { recordingData } from "@/global/action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DocumentsModal from "../DocumentsModal";
import SearchByDataProps from "../SearchByDataProps";
import RespondentModal from "./RespondentModal";

const RespondentDocumentSec = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [documentDetail, setDocumentDetail] = useState({
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
  });

  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [allDocsForRespondent, setAllDocsForRespondent] = useState([]);
  const [searchData, setSearchData] = useState("");

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
        setAllDocsForRespondent(response.data.data);
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  //Download Attachments
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

  //Download OrderSheet
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

  // Download Awards
  function handleDownloadAward(link) {
    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    anchor.download = "";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }

  // To see the recording
  function handleRecordings(cases) {
    dispatch(recordingData(cases.recordings));
    navigate("/arbitrator/cases/recordings");
  }

  //searchData
  const handleSearchData = (e) => {
    setSearchData(e.target.value);
  };

  //click on details button
  const handleDetailsFunc = (el) => {
    setDocumentDetail({
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
          <SearchByDataProps
            searchData={searchData}
            handleSearchData={handleSearchData}
          />

          {allDocsForRespondent.length > 0 ? (
            <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
              <div className="grid mt-5  lg:px-3 rounded-md grid-cols-[110px,1fr,50px] md:grid-cols-[120px,180px,1fr,50px]  lg:grid-cols-[100px,1fr,1fr,1fr,50px] text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]">
                <p className="truncate min-w-[60px]">Cl. Name</p>
                <p className="truncate hidden lg:block">Res. Name</p>
                <p className="truncate ml-0 md:ml-3 lg:ml-0">Arbitrator</p>
                <p className="truncate hidden md:block">Attachment</p>
                <p className="truncate">Action</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center mt-24 text-white text-2xl font-semibold">
              No Docs Available
            </div>
          )}

          <div className="flex flex-col gap-2 mt-5 px-4 lg:px-3">
            {allDocsForRespondent
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
                    className="grid rounded-md grid-cols-[110px,1fr,50px] md:grid-cols-[120px,180px,1fr,50px]  lg:grid-cols-[100px,1fr,1fr,1fr,50px] text-sm text-white gap-4 px-2 py-2 shadow-lg bg-[#0f2d6b]"
                  >
                    <p className="truncate min-w-[60px]">{ele.clientName}</p>
                    <p className="truncate ml-3 hidden lg:block">
                      {ele.respondentName}
                    </p>
                    <p className="truncate">
                      {ele.arbitratorName ? ele.arbitratorName : "Not Assigned"}
                    </p>
                    <p className="truncate hidden md:block">
                      {ele.attachments.length > 0 ? (
                        <IoMdDownload
                          className="cursor-pointer text-sm"
                          onClick={() =>
                            handleDownloadAllAttachment(ele.attachments)
                          }
                        />
                      ) : (
                        "No attach"
                      )}
                    </p>

                    <p
                      onClick={() => handleDetailsFunc(ele)}
                      className="cursor-pointer px-1 bg-green-500 py-1 rounded-md"
                    >
                      Details
                    </p>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      
      {/* modal for details for docs */}
      <RespondentModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        documentDetail={documentDetail}
        handleInputChange={handleInputChange}
        handleDownloadAll={handleDownloadAllAttachment}
        closeDetailsFunc={closeDetailsFunc}
      />
    </>
  );
};

export default RespondentDocumentSec;
