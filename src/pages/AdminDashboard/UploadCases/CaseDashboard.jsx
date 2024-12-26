import axios from "axios";
import { FcBusinessman } from "react-icons/fc";
import { IoMdDownload } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import NoDataFound from "@/components/NoDataFound";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { refreshers } from "@/global/action";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import CasesTableProps from "@/components/AdminCases/CasesTableProps";
import AssignArbitratorProps from "./AssignArbitratorProps";
import React from "react";
import AssignArbitratorRandomly from "./AssignArbitratorRandomly";
import { exportToExcel } from "./exportToExcel";

const CaseDashboard = () => {
  let refresher = useSelector((state) => state.refresher);
  const [data, setData] = useState([]);
  const [caseData, setCaseData] = useState([]);
  const [isClickedForMultiple, setIsClickedForMultiple] = useState(false);
  const [searchByFileName, setSearchByFileName] = useState("");
  const [searchByData, setSearchByData] = useState("");
  const [searchArbitrator, setSearchArbitrator] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [appointdata, setAppointdata] = useState("");
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  const [assignNotAssignArbitrator, setAssignNotAssignArbitrator] =
    useState("");

  // State for case selection
  const [caseId, setCaseId] = useState([]);
  const [selectAllClientStatus, setSelectAllClientStatus] = useState(false);

  // assign arbitrator for all pending cases
  const [pendingCaseStatus, setPendingCaseStatus] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  //export file
  const [exportFileStatus, setExportFileStatus] = useState(false);
  const [allcaseId, setAllcaseId] = useState([]);

  // Get the list of all arbitrators
  const getData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/arbitrator/all`)
      .then((res) => {
        const formattedOptions = res.data.user
          .filter((user) => user.status == true)
          .map((user) => ({
            value: user.name,
            label: `${user.contactNo} / ${user.name}`,
            arbitratorId: user.uid,
            arbitratorEmail: user.emailId,
            arbitrtorid: user._id,
            arbitratorName: user.name,
            arbitratorContactNo: user.contactNo,
            arbitratorExperience: user.experienceInYears,
            arbitratorExperties: user.areaOfExperties,
          }));
        setData(formattedOptions);
        setOptions(formattedOptions);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // To select arbitrator
  const handleSelectArbitrator = () => {
    if (!isClickedForMultiple) {
      let obj = {
        id: appointdata,
        arbitratorName: selectedOption.arbitratorName,
        arbitratorId: selectedOption.arbitrtorid,
        arbitratorEmail: selectedOption.arbitratorEmail,
      };
      setLoading(true);
      axios
        .post(
          `${import.meta.env.VITE_API_BASEURL}/arbitratorappointandnotifyall`,
          obj
        )
        .then((res) => {
          toast.success("Arbitrator appointed");
          setLoading(false);
          setIsOpen(false);
          dispatch(refreshers(!refresher));
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setLoading(false);
        });
    } else {
      let obj = {
        data: caseId,
        arbitratorName: selectedOption.arbitratorName,
        arbitratorId: selectedOption.arbitrtorid,
        arbitratorEmail: selectedOption.arbitratorEmail,
      };
      setLoading(true);
      axios
        .post(
          `${
            import.meta.env.VITE_API_BASEURL
          }/arbitratorappointandnotifyall/bulk`,
          obj
        )
        .then((res) => {
          toast.success("Arbitrator appointed");
          setLoading(false);
          setIsOpen(false);
          dispatch(refreshers(!refresher));
        })
        .catch((err) => {
          toast.error("Something went wrong");
          setLoading(false);
        });
    }
  };

  // All Case Data
  const allcaseData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/cases/all-cases`)
      .then((res) => {
        setCaseData(res.data.cases);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    allcaseData();
  }, [refresher]);

  const handleUploadFunction = (value) => {
    setIsOpen(true);
    setSelectedOption(null);
    setAppointdata(value);
  };

  const handleUploadFunctionbulk = () => {
    setIsOpen(true);
    setSelectedOption(null);
  };

  // to get unique file name in the filter
  const uniqueFileName = [];
  const seeFileName = new Set();
  caseData.forEach((item) => {
    if (!seeFileName.has(item.fileName)) {
      seeFileName.add(item.fileName);
      uniqueFileName.push(item);
    }
  });

  //function to handle individual case selection
  const handleSelectMultipleClientForArbitrator = (id) => {
    setCaseId((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((existingId) => existingId !== id)
        : [...prevIds, id]
    );
  };

  //function to handle select all functionality
  const handleAllClientForArbitrator = () => {
    // Toggle the select all status
    setExportFileStatus(false);
    const newSelectAllStatus = !selectAllClientStatus;
    setSelectAllClientStatus(newSelectAllStatus);

    // If selecting all, apply the same filtering logic as in the table render
    if (newSelectAllStatus) {
      const unassignedCaseIds = caseData
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
          if (!assignNotAssignArbitrator || assignNotAssignArbitrator === "all")
            return el;
          else if (assignNotAssignArbitrator == "notassigned") {
            return !el.isArbitratorAssigned;
          } else if (assignNotAssignArbitrator == "assigned") {
            return el.isArbitratorAssigned;
          }
        })
        .filter((el) => {
          // Search data filter
          if (!searchByData) return true;
          return (
            el.clientName.toLowerCase().includes(searchByData.toLowerCase()) ||
            el.clientMobile
              .toLowerCase()
              .includes(searchByData.toLowerCase()) ||
            el.respondentName
              .toLowerCase()
              .includes(searchByData.toLowerCase()) ||
            el.respondentMobile
              .toLowerCase()
              .includes(searchByData.toLowerCase()) ||
            el.disputeType.toLowerCase().includes(searchByData.toLowerCase())
          );
        })
        .filter((el) => el.arbitratorName === "") // Only unassigned cases
        .map((el) => el._id);

      setCaseId(unassignedCaseIds);
    } else {
      // If deselecting, clear all selected cases
      setCaseId([]);
    }
  };

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

  // Assign arbitrator for pending cases

  const handleAssignArbitratorForPendingCases = () => {
    setPendingCaseStatus(true);
    setIsClickedForMultiple(false);
    setExportFileStatus(false);

    const unassignedCaseIds = caseData
      .filter((file) => {
        // File name filter
        if (!searchByFileName || searchByFileName === "all") return true;
        else if (searchByFileName === "singlecase") return file.fileName === "";
        return file.fileName
          ?.toLowerCase()
          .includes(searchByFileName.toLowerCase());
      })
      .filter((el) => {
        if (!assignNotAssignArbitrator || assignNotAssignArbitrator === "all")
          return el;
        else if (assignNotAssignArbitrator == "notassigned") {
          return !el.isArbitratorAssigned;
        } else if (assignNotAssignArbitrator == "assigned") {
          return el.isArbitratorAssigned;
        }
      })
      .filter((el) => {
        // Search data filter
        if (!searchByData) return true;
        return (
          el.clientName.toLowerCase().includes(searchByData.toLowerCase()) ||
          el.clientMobile.toLowerCase().includes(searchByData.toLowerCase()) ||
          el.respondentName
            .toLowerCase()
            .includes(searchByData.toLowerCase()) ||
          el.respondentMobile
            .toLowerCase()
            .includes(searchByData.toLowerCase()) ||
          el.disputeType.toLowerCase().includes(searchByData.toLowerCase())
        );
      })
      .filter((el) => el.arbitratorName === "")
      .map((el) => el._id);
    setCaseId(unassignedCaseIds);
  };
  const handleAssignArbitratorRandomly = () => {
    setIsOpen2(true);
  };
  const handleArbitratorNotAssignForPendingCases = () => {
    setIsOpen2(false);
    setCaseId("");
    setPendingCaseStatus(false);
    isClickedForMultiple(false);
  };

  // onclicking yes, all pending cases will assign random arbitrator
  const handleArbitratorAssignForPendingCases = () => {
    let obj = {
      data: caseId,
    };

    axios
      .post(
        `${
          import.meta.env.VITE_API_BASEURL
        }/arbitratorappointandnotifyall/bulk/pendingcases`,
        obj
      )
      .then((res) => {
        toast.success(
          "Arbitrators appointed successfully and cases distributed equally!"
        );
        setLoading(false);
        setIsOpen(false);
        dispatch(refreshers(!refresher));
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setLoading(false);
      });
    setIsOpen2(false);
    setCaseId("");
    setPendingCaseStatus(false);
  };

  // download all the cases before confirm
  const DownloadAllDataOfCase = () => {
    setPendingCaseStatus(false);
    setIsClickedForMultiple(false);
    setExportFileStatus(true);
    const allCaseDataDownload = caseData.map((el) => el._id);
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

  // confirm to download all the cases
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
        const filteredData = applyFilters(caseData, filters);
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
    exportToExcel(filterdatatoexport, "Cases_Data");
    setAllcaseId("");
    setPendingCaseStatus(false);
    setExportFileStatus(false);
  };

  return (
    <div className="max-w-[1070px] mx-auto">
      {data.length === 0 ? (
        ""
      ) : (
        <div className="flex flex-wrap gap-2 mt-5 overflow-x-hidden">
          {/* Filter by file name */}
          <div className="flex-shrink-0 sm:w-[15%] bg-blue-50  rounded-xl">
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

          {/* filter by assign or not assign arbitratotr */}
          <div className="flex-shrink-0 sm:w-[15%] bg-blue-50 rounded-xl">
            <Select
              id="name"
              className="w-full"
              onValueChange={(e) => setAssignNotAssignArbitrator(e)}
            >
              <SelectTrigger className="w-full bg-blue-50">
                <SelectValue placeholder="Arbitrator" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key="all" value="all">
                    All
                  </SelectItem>
                  <SelectItem key="assign arbitrator" value="assigned">
                    Assigned Arbitrator
                  </SelectItem>
                  <SelectItem key="not assign arbitrator" value="notassigned">
                    Not Assigned Arbitrator
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Search by name, email and so on */}
          <div className="flex flex-shrink-0 items-center w-[25%] lg:w-[20%] border rounded-xl p-2 bg-blue-50 border-gray-300">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow outline-none bg-transparent text-sm"
              onChange={(e) => setSearchByData(e.target.value)}
            />
            <button className="text-gray-500 hover:text-gray-700 hidden xl:block">
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

          <div className="flex gap-2 items-center ml-5 text-white">
            <Checkbox
              className="bg-white"
              onClick={() => {
                setIsClickedForMultiple(!isClickedForMultiple);
                setSelectAllClientStatus(false);
                setCaseId([]);
              }}
            />
            <p className="text-sm font-semibold">Select Multiple</p>
          </div>
          {isClickedForMultiple ? (
            <div className="flex gap-2 items-center ml-1 text-white">
              <Checkbox
                className="bg-white"
                value="allclient"
                checked={selectAllClientStatus}
                onClick={handleAllClientForArbitrator}
              />
              <p className="text-sm font-semibold">Select All</p>
            </div>
          ) : null}

          {caseId.length > 0 ? (
            <div className="flex gap-1 items-center">
              <FcBusinessman
                onClick={!pendingCaseStatus ? handleUploadFunctionbulk : null}
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              />
              <p className="text-sm font-semibold text-white">
                Select Arbitrator
              </p>
            </div>
          ) : null}
        </div>
      )}

      <div className="flex flex-col md:flex-row mt-2 justify-end">
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
        {/* Check for pending cases */}
        <button
          type="button"
          className="text-white bg-[#22c55e] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 w-28 md:w-40"
          onClick={handleAssignArbitratorForPendingCases}
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
          Pending Cases
        </button>
        {/* Assign Arbitrator for all pending cases randomly */}
        {pendingCaseStatus ? (
          <div>
            <button
              type="button"
              className="text-white bg-[#16a34a] font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2"
              onClick={handleAssignArbitratorRandomly}
            >
              <svg
                className="h-4 text-white"
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
                <circle cx="9" cy="7" r="4" />{" "}
                <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />{" "}
                <path d="M16 11h6m-3 -3v6" />
              </svg>
              Arbitrator for Pending Cases
            </button>
          </div>
        ) : null}
      </div>

      {/* Case Dashboard Data */}
      {caseData.length > 0 ? (
        <div>
          <div className="flex flex-col gap-2 mt-1 mb-2">
            <div
              className={`grid mt-5 font-semibold lg:px-3 rounded-md ${
                isClickedForMultiple || pendingCaseStatus || exportFileStatus
                  ? "grid-cols-[40px,1fr,70px,50px]"
                  : "grid-cols-[1fr,70px,60px]"
              } ${
                isClickedForMultiple || pendingCaseStatus || exportFileStatus
                  ? "md:grid-cols-[40px,1fr,1fr,80px,60px]"
                  : "md:grid-cols-[1fr,1fr,80px,80px]"
              }  ${
                isClickedForMultiple || pendingCaseStatus || exportFileStatus
                  ? "lg:grid-cols-[40px,1fr,1fr,180px,50px,100px,60px,60px]"
                  : "lg:grid-cols-[1fr,1fr,180px,50px,100px,60px,60px]"
              } ${
                isClickedForMultiple || pendingCaseStatus || exportFileStatus
                  ? "xl:grid-cols-[40px,1fr,1fr,1fr,1fr,1fr,1fr,1fr]"
                  : "xl:grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr,1fr]"
              } text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]`}
            >
              <p
                className={`truncate ${
                  isClickedForMultiple || pendingCaseStatus || exportFileStatus
                    ? "block"
                    : "hidden"
                }`}
              >
                Select
              </p>
              <p className="truncate">Claimant Name</p>
              <p className="truncate hidden lg:block">Claimant No.</p>
              <p className="truncate hidden md:block">Res. Name</p>
              <p className="truncate hidden lg:block">Type</p>
              <p className="truncate hidden lg:block">File</p>
              <p className="truncate">Attachment</p>
              <p className="truncate">Arbitrator</p>
            </div>
          </div>
          {caseData
            .filter((file) => {
              if (!searchByFileName || searchByFileName === "all") return true;
              else if (searchByFileName === "singlecase")
                return file.fileName == "";
              return file.fileName
                ?.toLowerCase()
                .includes(searchByFileName.toLowerCase());
            })
            .filter((el) => {
              if (!searchByData) return true;
              return (
                el.clientName.toLowerCase().includes(searchByData) ||
                el.clientMobile.toLowerCase().includes(searchByData) ||
                el.respondentName.toLowerCase().includes(searchByData) ||
                el.respondentMobile.toLowerCase().includes(searchByData) ||
                el.disputeType.toLowerCase().includes(searchByData)
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
            .map((cases) => (
              <CasesTableProps
                key={cases._id}
                checkbox={
                  isClickedForMultiple ||
                  pendingCaseStatus ||
                  exportFileStatus ? (
                    <input
                      type="checkbox"
                      value={cases._id}
                      disabled={
                        exportFileStatus
                          ? false
                          : cases.isArbitratorAssigned
                          ? true
                          : false
                      }
                      onChange={() =>
                        exportFileStatus
                          ? handleSelectMultipleClientForCases(cases._id)
                          : handleSelectMultipleClientForArbitrator(cases._id)
                      }
                      checked={
                        exportFileStatus
                          ? allcaseId.includes(cases._id || "")
                          : caseId.includes(cases._id)
                      }
                      className="checkbox-small w-[12px] h-[12px]"
                    />
                  ) : null
                }
                isClickedForMultiple={isClickedForMultiple}
                exportFileStatus={exportFileStatus}
                pendingCaseStatus={pendingCaseStatus}
                cl_name={cases.clientName}
                cl_number={cases.clientMobile}
                res_name={cases.respondentName}
                res_num={cases.respondentMobile}
                dispute_type={cases.disputeType}
                file={cases.isFileUpload ? cases.fileName : "Single Case"}
                attachment={
                  cases.attachments.length > 0 ? (
                    <IoMdDownload
                      className="cursor-pointer text-sm"
                      onClick={() => handleDownloadAll(cases.attachments)}
                    />
                  ) : (
                    "No attach"
                  )
                }
                arbitrator={
                  cases.isArbitratorAssigned ? (
                    cases.arbitratorName.split(" ")[0]
                  ) : (
                    <>
                      <FcBusinessman
                        style={{
                          color: "blue",
                          fontSize: "24px",
                          cursor: "pointer",
                        }}
                        onClick={() =>
                          isClickedForMultiple || pendingCaseStatus
                            ? null
                            : handleUploadFunction(cases._id)
                        }
                      />
                    </>
                  )
                }
              />
            ))}
        </div>
      ) : (
        <NoDataFound />
      )}

      {/* Assign Arbitrator */}
      <AssignArbitratorProps
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        searchArbitrator={searchArbitrator}
        setSearchArbitrator={setSearchArbitrator}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        options={options}
        loading={loading}
        handleSelectArbitrator={handleSelectArbitrator}
      />

      {/* Assign Arbitrator Randomly for pending cases */}
      <AssignArbitratorRandomly
        isOpen2={isOpen2}
        setIsOpen2={setIsOpen2}
        handleArbitratorNotAssignForPendingCases={
          handleArbitratorNotAssignForPendingCases
        }
        handleArbitratorAssignForPendingCases={
          handleArbitratorAssignForPendingCases
        }
      />
    </div>
  );
};

export default CaseDashboard;
