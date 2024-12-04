import axios from "axios";
import { FcBusinessman } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import styles from "../ArbitratorDashboard/ArbitratorDashboard.module.css";
import { IoMdDownload } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import NoDataFound from "@/components/NoDataFound";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { refreshers } from "@/global/action";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import CasesTableProps from "@/components/AdminCases/CasesTableProps";

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
    <div className="max-w-5xl mx-auto">
      {data.length === 0 ? (
        ""
      ) : (
        <div className="flex flex-wrap gap-2 mt-5 mx-5">
          {/* Filter by file name */}
          <div className="flex-shrink-0 sm:w-[15%] bg-blue-50">
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
          <div className="flex-shrink-0 sm:w-[15%] bg-blue-50">
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

          {/* select arbitrator for multiple client */}
          <div className="flex gap-2 items-center ml-5">
            <Checkbox
              onClick={() => setIsClickedForMultiple(!isClickedForMultiple)}
            />
            <p>Select Multiple</p>
          </div>

          {isClickedForMultiple ? (
            <div className="flex gap-2 items-center ml-1">
              <Checkbox
                value="allclient"
                checked={selectAllClientStatus}
                onClick={handleAllClientForArbitrator}
              />
              <p>Select All</p>
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
              <p>Select Arbitrator</p>
            </div>
          ) : null}
        </div>
      )}

      {/* Case Dashboard Data */}
      {caseData.length > 0 ? (
        <table cellSpacing="0">
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
          </thead>
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
                    <div>
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
                    </div>
                  )
                }
              />
            ))}
        </table>
      ) : (
        <NoDataFound />
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          className="rounded-lg shadow-lg"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Arbitrator Details
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              All Arbitrator
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-shrink-0 w-[45%] items-center border rounded-xl p-2 bg-blue-50 border-gray-300">
            <input
              type="text"
              placeholder="Search"
              className="flex-grow outline-none bg-transparent text-sm"
              onChange={(e) => setSearchArbitrator(e.target.value)}
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

          <RadioGroup
            value={selectedOption?.arbitrtorid}
            onValueChange={(value) => {
              const selected = options.find(
                (option) => option.arbitrtorid === value
              );
              setSelectedOption(selected);
            }}
          >
            <Table className="pr-6">
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="p-[0px]">Contact No.</TableHead>
                  <TableHead className="text-right">Experties</TableHead>
                  <TableHead className="text-right">Experience</TableHead>
                </TableRow>
              </TableHeader>
              {options
                .filter((el) => {
                  if (!searchArbitrator) return true;
                  return (
                    el.arbitratorName
                      .toLowerCase()
                      .includes(searchArbitrator) ||
                    el.arbitratorEmail
                      .toLowerCase()
                      .includes(searchArbitrator) ||
                    el.arbitratorContactNo
                      .toLowerCase()
                      .includes(searchArbitrator)
                  );
                })
                .map((el, index) => (
                  <TableBody key={el.arbitrtorid}>
                    <TableRow>
                      <TableCell>
                        <RadioGroupItem
                          type="radio"
                          value={el.arbitrtorid}
                          name="arbitrator"
                        />
                      </TableCell>
                      <TableCell>{el.arbitratorName}</TableCell>
                      <TableCell>{el.arbitratorEmail}</TableCell>
                      <TableCell>{el.arbitratorContactNo}</TableCell>
                      <TableCell className="text-right">
                        {el.arbitratorExperties}
                      </TableCell>
                      <TableCell className="text-right">
                        {el.arbitratorExperience}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
          </RadioGroup>

          <DialogFooter className="mt-6 flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              onClick={handleSelectArbitrator}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              {loading ? "Appointing..." : "Appoint"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseDashboard;
