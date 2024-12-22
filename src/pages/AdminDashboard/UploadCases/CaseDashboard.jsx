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
            <Checkbox className="bg-white"
              onClick={() => {
                setIsClickedForMultiple(!isClickedForMultiple)
                setSelectAllClientStatus(false)
                setCaseId([]);
              }}
            />
            <p className="text-sm font-semibold">Select Multiple</p>
          </div>
          {isClickedForMultiple ? (
            <div className="flex gap-2 items-center ml-1 text-white">
              <Checkbox className="bg-white"
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
                onClick={handleUploadFunctionbulk}
                style={{
                  fontSize: "24px",
                  cursor: "pointer",
                }}
              />
              <p className="text-sm font-semibold text-white">Select Arbitrator</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Case Dashboard Data */}
      {caseData.length > 0 ? (
        <div>
        {/* <table cellSpacing="0">
          <thead>
            <tr>
              <th>{isClickedForMultiple ? "Select" : null}</th>
              <th>Claimant Name</th>
              <th>Claimant No.</th>
              <th>Res. Name</th>
              <th>Res. No.</th>
              <th>Type</th>
              <th>File</th>
              <th>Attachment</th>
              <th>Arbitrator</th>
            </tr>
          </thead> */}
          <div className="flex flex-col gap-2 mt-1 mb-2">
              <div className={`grid mt-5 font-semibold lg:px-3 rounded-md ${isClickedForMultiple ? "grid-cols-[40px,1fr,70px,50px]" : "grid-cols-[1fr,70px,60px]"} ${isClickedForMultiple ? "md:grid-cols-[40px,1fr,1fr,80px,60px]" : "md:grid-cols-[1fr,1fr,80px,80px]"}  ${isClickedForMultiple ? "lg:grid-cols-[40px,1fr,1fr,180px,50px,100px,60px,60px]" : "lg:grid-cols-[1fr,1fr,180px,50px,100px,60px,60px]"} ${isClickedForMultiple ? "xl:grid-cols-[40px,1fr,1fr,1fr,1fr,1fr,1fr,1fr]" : "xl:grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr,1fr]"} text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]`}>
                <p className={`truncate ${isClickedForMultiple ? "block" : "hidden"}`}>Select</p>
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
                  isClickedForMultiple ? (
                    <input
                      type="checkbox"
                      value={cases._id}
                      disabled={cases.isArbitratorAssigned ? true : false}
                      onChange={() =>
                        handleSelectMultipleClientForArbitrator(cases._id)
                      }
                      checked={caseId.includes(cases._id)}
                      className="checkbox-small w-[12px] h-[12px]"
                    />
                  ) : null
                }
                isClickedForMultiple={isClickedForMultiple}
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
                          isClickedForMultiple
                            ? null
                            : handleUploadFunction(cases._id)
                        }
                      />
                    </>
                  )
                }
              />
            ))}
        {/* </table> */}
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
    </div>
  );
};

export default CaseDashboard;
