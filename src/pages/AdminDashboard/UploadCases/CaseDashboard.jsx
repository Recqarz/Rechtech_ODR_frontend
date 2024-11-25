import axios from "axios";
import { FcBusinessman } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import styles from "../ArbitratorDashboard/ArbitratorDashboard.module.css";
import CreatableSelect from "react-select/creatable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useEffect, useMemo, useState } from "react";
import NoDataFound from "@/components/NoDataFound";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { refreshers } from "@/global/action";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/Loading";

const CaseDashboard = () => {
  let refresher = useSelector((state) => state.refresher);
  const [data, setData] = useState([]);
  const [caseData, setCaseData] = useState([]);
  const [searchByFileName, setSearchByFileName] = useState("");
  const [searchByCaseCount, setSearchByCaseCount] = useState("");
  const [filterByBankName, setFilterByBankName] = useState("");
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

  const getData = () => {
    axios
      .get("http://localhost:3000/arbitrator/all")
      .then((res) => {
        const formattedOptions = res.data.user.filter((user)=>user.status==true).map((user) => ({
          value: user.name,
          label: `${user.contactNo} / ${user.name}`,
          arbitratorId: user.uid,
          arbitratorEmail: user.emailId,
          arbitrtoriid: user._id,
          arbitratorName: user.name,
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

  const filterOptions = (inputValue) => {
    return data.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleInputChange = (inputValue) => {
    const filteredOptions = filterOptions(inputValue);
    setOptions(filteredOptions);
  };

  const handleChange = (newValue) => {
    setSelectedOption(newValue);
    setFormData((prev) => ({
      ...prev,
      arbitrator: newValue.value,
      arbitratorId: newValue.arbitrtoriid,
      arbitratorEmail: newValue.arbitratorEmail,
    }));
    console.log("formdata", formData);
  };

  const handleSelectArbitrator = () => {
    let obj = {
      caseId: appointdata,
      arbitrator: formData.arbitrator,
      arbitratorId: formData.arbitratorId,
      arbitratorEmail: formData.arbitratorEmail,
    };
    setLoading(true);
    axios
      .post("http://localhost:3000/arbitratorappointnotifyall", obj)
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

  const allcaseData = () => {
    axios
      .get(`http://localhost:3000/cases/all-cases`)
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



if(loading){
  return <Loading/>
}


  return (
    <div className="max-w-5xl mx-auto">
      {data.length == 0 ? (
        ""
      ) : (
        <div className="flex flex-wrap gap-4 justify-between mt-5 mx-5">
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

          {/* filter for Date */}
          <div className="border-0 flex-shrink-0 w-full sm:w-[20%]">
            <Select id="status" className="w-full">
              <SelectTrigger className="w-full bg-blue-50">
                <SelectValue placeholder="Filter By Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem key="filter" value="filter">
                      filter
                    </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Search by file name */}
          <div className="flex flex-shrink-0 w-full items-center sm:w-[20%] border rounded-xl p-2 bg-blue-50 border-gray-300">
            <input
              type="text"
              placeholder="Search Filename"
              className="flex-grow outline-none bg-transparent text-sm"
              onChange={(e) => setSearchByFileName(e.target.value)}
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

          {/* Search by case count */}
          <div className="flex flex-shrink-0 items-center sm:w-[20%] border rounded-xl p-2 bg-blue-50 border-gray-300">
            <input
              type="text"
              placeholder="Search Case Count"
              className="flex-grow outline-none bg-transparent text-sm"
              onChange={(e) => setSearchByCaseCount(e.target.value)}
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
              <th>Client Number</th>
              <th>Respondent Name</th>
              <th>Respondent Email</th>
              <th>Respondent Number</th>
              <th>Dispute Type</th>
            </tr>
          </thead>
          {caseData
            .filter((name) => {
              if (!filterByBankName) return true;
              if(filterByBankName=="all"){
                return name
              }
              else{
                return name.clientName
                .toLowerCase()
                .includes(filterByBankName.toLowerCase());
              }
            })
            .filter((file) => {
              if (!searchByFileName) return true; 
              return file.fileName.toLowerCase().includes(searchByFileName);
            })
            .filter((count) => {
              if (!searchByCaseCount) return true; 
              return count.caseCount.toString().includes(searchByCaseCount);
            })
            .map((cases) => (
              <tbody key={cases._id}>
                <tr className={styles.trbody}>
                  <td data-label="Bankname">{cases.clientName}</td>
                  <td
                    data-label="File_name"
                    className={styles.number}
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(`/defaulter/${cases._id}`)}
                  >
                    {cases.fileName}
                  </td>
                  <td data-label="Case_count">{cases.caseCount}</td>
                  <td data-label="Date">
                    {cases?.uploadDate
                      ?.split("T")[0]
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                  <td data-label="Action">
                    {cases.arbitrator == "" ? (
                      <FcBusinessman
                        style={{
                          color: "blue",
                          fontSize: "24px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleUploadFunction(cases._id)}
                      />
                    ) : (
                      cases.arbitrator?.split(" ")[0]
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
        </table>
      ) : (
        <NoDataFound />
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-lg shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              Arbitrator Details
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              All Arbitrator
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700 sm:col-span-1"
              >
                Arbitrator
              </Label>
              <div className="sm:col-span-3">
                <CreatableSelect
                  options={options}
                  value={selectedOption}
                  onChange={handleChange}
                  onInputChange={handleInputChange}
                  placeholder="Search for an email..."
                  isSearchable
                  filterOption={null}
                  className="text-sm"
                  isValidNewOption={() => false}
                  noOptionsMessage={() => "No matching email found"}
                />
                {selectedOption && (
                  <p className="text-sm text-green-600 mt-1">
                    You selected:
                    {selectedOption.value}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              onClick={handleSelectArbitrator}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Appoint
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CaseDashboard;
