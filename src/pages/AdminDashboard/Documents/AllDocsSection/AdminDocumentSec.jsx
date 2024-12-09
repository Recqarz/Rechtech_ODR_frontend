import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoMdCloudDownload, IoMdDownload } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import DocumentsProps from "../DocumentsProps";
import SearchByDataProps from "@/components/SearchByDataProps";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { recordingData } from "@/global/action";

const AdminDocumentSec = () => {
  const [allDocsForAdmin, setAllDocsForAdmin] = useState([]);
  const [searchData, setSearchData] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();

  // All Case Data
  const getAllDocsData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/cases/all-cases`)
      .then((res) => {
        setAllDocsForAdmin(res.data.cases);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getAllDocsData();
  }, []);

  //Download Attachments
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

  return (
    <div className="w-[98%] mt-4 ml-2">
      <div className="relative flex flex-col w-[600px] lg:w-[100%] ml-0 lg:ml-1 xl:ml-0 2xl:ml-2 h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border mt-2">
        {/* Search data */}
        <div className="mt-12 lg:mt-5 ml-6">
          <SearchByDataProps handleSearchData={handleSearchData} />
        </div>

        {/* Table Data */}
        <div className="overflow-scroll lg:overflow-hidden">
          <table className=" mt-4 text-left min-w-max p-4">
            <thead>
              <tr>
                <th className="p-2 transition-colors cursor-pointer bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-xs leading-none text-slate-700">
                  Claimant Name
                  </p>
                </th>
                <th className="p-2 transition-colors cursor-pointer border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm font-sm leading-none text-slate-700">
                    Respondent Name
                  </p>
                </th>
                <th className="p-2 transition-colors cursor-pointer border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-xs leading-none text-slate-700">
                    Arbitrator
                  </p>
                </th>
                <th className="p-2 transition-colors cursor-pointer border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-xs leading-none text-slate-700">
                    Attachment
                  </p>
                </th>
                <th className="p-2 transition-colors cursor-pointer border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-xs leading-none text-slate-700">
                    OrderSheet
                  </p>
                </th>

                <th className="p-2 transition-colors cursor-pointer border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-xs leading-none text-slate-700">
                    Award
                  </p>
                </th>

                <th className="p-2 transition-colors cursor-pointer border-slate-200 bg-slate-50 hover:bg-slate-100">
                  <p className="flex items-center justify-between gap-2 font-sans text-sm  font-xs leading-none text-slate-700">
                    Recording
                  </p>
                </th>
              </tr>
            </thead>
            {allDocsForAdmin
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
              .map((recent, ind) => (
                <DocumentsProps
                  key={ind}
                  cl_name={recent?.clientName}
                  res_name={recent?.respondentName}
                  attach={
                    recent.attachments.length > 0 ? (
                      <IoMdDownload
                        className="cursor-pointer text-sm"
                        onClick={() => handleDownloadAll(recent.attachments)}
                      />
                    ) : (
                      "No attach"
                    )
                  }
                  arb_name={
                    recent.arbitratorName
                      ? recent.arbitratorName.split(" ")[0]
                      : "Not Assigned"
                  }
                  order={
                    recent.orderSheet.length > 0 ? (
                      <IoMdDownload
                        className="cursor-pointer text-sm ml-6"
                        onClick={() =>
                          handleDownloadAllorder(recent.orderSheet)
                        }
                      />
                    ) : (
                      "No Order."
                    )
                  }
                  award={
                    recent.isAwardCompleted ? (
                      <div
                        className="flex items-center text-[18px]"
                        onClick={() => handleDownloadAward(recent.awards[0])}
                      >
                        <IoMdCloudDownload />{" "}
                        <span className="font-semibold text-[12px]">Awards</span>
                      </div>
                    ) : (
                      "No Award"
                    )
                  }
                  recording={
                    recent.recordings.length > 0 ? (
                      <IoEye
                        onClick={() => handleRecordings(recent)}
                        className="ml-4 text-xl cursor-pointer"
                      />
                    ) : (
                      "No Recording"
                    )
                  }
                />
              ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDocumentSec;
