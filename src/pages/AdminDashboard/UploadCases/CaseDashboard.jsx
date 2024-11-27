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
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";
// import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CaseDashboard = () => {
  let refresher = useSelector((state) => state.refresher);
  const [data, setData] = useState([]);
  const [caseData, setCaseData] = useState([]);
  const [filterByBankName, setFilterByBankName] = useState("");
  // const [searchByFileName, setSearchByFileName] = useState("");
  const [searchByData, setSearchByData] = useState("");
  const [searchArbitrator, setSearchArbitrator] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [appointdata, setAppointdata] = useState("");
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    arbitrator: "",
    arbitratorId: "",
    arbitratorEmail: "",
  });

  //Get the list of all arbitrator
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
        console.log("options", options);
        console.log("formattedOptions", formattedOptions);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // const filterOptions = (inputValue) => {
  //   return data.filter((option) =>
  //     option.label.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };

  // const handleInputChange = (inputValue) => {
  //   const filteredOptions = filterOptions(inputValue);
  //   setOptions(filteredOptions);
  // };

  // const handleChange = (newValue) => {
  //   setSelectedOption(newValue);
  //   setFormData((prev) => ({
  //     ...prev,
  //     arbitrator: newValue.value,
  //     arbitratorId: newValue.arbitrtoriid,
  //     arbitratorEmail: newValue.arbitratorEmail,
  //   }));
  //   console.log("formdata", formData);
  // };

  //To select arbitrator
  const handleSelectArbitrator = () => {
    let obj = {
      id: appointdata,
      arbitratorName: selectedOption.arbitratorName,
      arbitratorId: selectedOption.arbitrtorid,
      arbitratorEmail: selectedOption.arbitratorEmail,
    };
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_API_BASEURL}/arbitratorappointandnotifyall`, obj)
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
  };

  //all Case Data
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

  const uniqueNames = [];
  const seenNames = new Set();
  caseData.forEach((item) => {
    if (!seenNames.has(item.clientName)) {
      seenNames.add(item.clientName);
      uniqueNames.push(item); // Add unique item to the array
    }
  });

  return (
    <div className="max-w-5xl mx-auto">
      {data.length == 0 ? (
        ""
      ) : (
        <div className="flex flex-wrap gap-5 mt-5 mx-5">
          {/* filter by Bank Name */}
          <div className="flex-shrink-0 w-full sm:w-[20%]">
            <Select
              id="bank-name"
              className="w-full"
              onValueChange={(e) => {
                setFilterByBankName(e);
              }}
            >
              <SelectTrigger className="w-full bg-blue-50">
                <SelectValue placeholder="Bank Name" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key="all" value="all">
                    All
                  </SelectItem>
                  {uniqueNames.map((item) => (
                    <SelectItem key={item._id} value={item.clientName}>
                      {item.clientName}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Search by  name, email, number of client and respondent*/}
          <div className="flex flex-shrink-0 w-full items-center sm:w-[20%] border rounded-xl p-2 bg-blue-50 border-gray-300">
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
        </div>
      )}

      {/* table data */}
      {caseData.length > 0 ? (
        <table cellSpacing="0">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Client Email</th>
              <th>Client No.</th>
              <th>Res. Name</th>
              <th>Res. Email</th>
              <th>Res. No.</th>
              <th>Type</th>
              <th>File</th>
              <th>Attachment</th>
              <th>Arbitrator</th>
            </tr>
          </thead>
          {caseData
            .filter((name) => {
              if (!filterByBankName) return true;
              if (filterByBankName == "all") {
                return name;
              } else {
                return name.clientName
                  .toLowerCase()
                  .includes(filterByBankName.toLowerCase());
              }
            })
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
                  <td data-label="client email" className={styles.clientEmail}>
                    {cases.clientEmail}
                  </td>
                  <td data-label="client number">{cases.clientMobile}</td>
                  <td data-label="respondant name">{cases.respondentName}</td>
                  <td data-label="respondant email">{cases.respondentEmail}</td>
                  <td data-label="respondence number">
                    {cases.respondentMobile}
                  </td>
                  <td data-label="dispute type">{cases.disputeType}</td>
                  <td data-label="case type">
                    {cases.isFileUpload ? cases.fileName : "Single Case"}
                  </td>
                  <td data-label="attachment">
                    <div className="flex gap-1">
                      {cases.attachments.length > 0
                        ? cases.attachments.map((ele, ind) => {
                            return (
                              <Link key={ind} to={ele.url} target="_blank">
                                <IoMdDownload className="cursor-pointer text-sm" />
                              </Link>
                            );
                          })
                        : "No attach"}
                    </div>
                  </td>
                  <td data-label="arbitrator">
                    {cases.isArbitratorAssigned ? (
                      cases.arbitratorName.split(" ")[0]
                    ) : (
                      <FcBusinessman
                        style={{
                          color: "blue",
                          fontSize: "24px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUploadFunction(cases._id)}
                      />
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      ) : (
        <NoDataFound />
      )}

       {/* all arbitrator in the table */}
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
