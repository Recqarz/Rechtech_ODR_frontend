import { FiEdit3 } from "react-icons/fi";
import { LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import NoDataFound from "@/components/NoDataFound";
import { FaAngleRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import TableProps from "@/components/ArbitratorUserTable/TableProps";
import UpdateArbitratorDetailsProps from "./UpdateArbitratorDetailsProps";
import { IoSearch } from "react-icons/io5";
import Pagination from "@/components/Pagination";

const ArbitratorDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [data, setData] = useState([]);
  const [searchdata, setSearchdata] = useState("");
  const [filterstatus, setFilterstatus] = useState("all");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Status");

    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleOpen = (arbitratior) => {
    setIsOpen(true);
    setEditData(arbitratior);
  };
  const handleClose = () => {
    // console.log(editData);
    axios
      .put(
        `${import.meta.env.VITE_API_BASEURL}/arbitrator/update/${editData._id}`,
        editData
      )
      .then((res) => {
        setIsOpen(false);
        getData();
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
    // setIsOpen(false);
  };

  const statusOptions = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "InActive" },
  ];

  const handleStatusSelect = (value, label) => {
    setSelectedStatus(label);
    setFilterstatus(value);
    setIsStatusOpen(false);
  };

  const getData = (page, limit) => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/arbitrator/all`, {params: { page, limit }},)
      .then((res) => {
        setData(res.data.user);
        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRowsPerPageChange = (e) => {
    const newRowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page when rows per page changes
  };

  useEffect(() => {
    getData(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1070px] mx-auto px-4 py-3">
        <div className="ml-10 md:ml-0 flex justify-between items-center shadow-2xl bg-[#0f2d6b] rounded-md   py-2 px-4 mt-1 md:mt-0">
          <h2 className="font-semibold text-white  text-sm cursor-pointer flex gap-1 items-center">
            Users <FaAngleRight className="text-xs mt-1" />{" "}
            <span className="hover:text-blue-500">Arbitrator</span>
          </h2>
          <div>
            <div className="bg-blue-50 p-2 md:p-3 rounded-full">
              <LuUser className="text-blue-600 text-md md:text-xl" />
            </div>
          </div>
        </div>

        {/* Search button */}
        {data.length == 0 ? (
          ""
        ) : (
          <div className="mt-6 sm:mt-10 flex gap-4 sm:items-center">
            <div className="relative w-[200px] md:w-[220px] h-[32px]">
              <Input
                className="w-full h-full  rounded-md placeholder:font-semibold"
                placeholder="Search here"
                value={searchdata}
                onChange={(e) => setSearchdata(e.target.value)}
              />
              <IoSearch className="absolute top-[25%] right-4 text-lg text-blue-700" />
            </div>

            <div className="relative w-[15%] md:w-[21%] sm:w-auto">
              <button
                onClick={() => setIsStatusOpen(!isStatusOpen)}
                className="flex items-center justify-between w-32 px-4 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
              >
                <span>{selectedStatus}</span>
                {isStatusOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {isStatusOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg">
                  {statusOptions.map((option) => (
                    <div
                      key={option.value}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() =>
                        handleStatusSelect(option.value, option.label)
                      }
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add Arbitrator */}
        <div className="flex justify-end w-[97%] mx-auto mt-4">
          <Link to={"/arbitrator/addarbitrator"}>
            <button className="bg-[#B9DCFD] rounded-sm hover:bg-blue-500 font-semibold text-[16px] p-2 text-black py-2 px-4 flex items-center gap-0 border-1 border-slate-950">
              <span>Add</span>
            </button>
          </Link>
        </div>

        {/* Arbitrator data in the table */}
        {data.length > 0 ? (
          <div>
            <div className="flex flex-col gap-2 mt-1 mb-2">
              <div className="grid mt-5 font-semibold lg:px-3 rounded-md grid-cols-[60px,1fr,70px,50px] md:grid-cols-[60px,1fr,1fr,70px,50px]  lg:grid-cols-[70px,1fr,1fr,180px,50px,100px,60px,60px] xl:grid-cols-[70px,1fr,1fr,250px,50px,100px,60px,60px] text-sm text-green-500 gap-4 px-2 py-3 shadow-2xl bg-[#0f2d6b]">
                <p className="truncate">ID</p>
                <p className="truncate">Name</p>
                <p className="truncate hidden lg:block">Contact No.</p>
                <p className="truncate hidden md:block">Email ID</p>
                <p className="truncate hidden lg:block">No Of Assign Case</p>
                <p className="truncate hidden lg:block">Address</p>
                <p className="truncate">Status</p>
                <p className="truncate">Action</p>
              </div>
            </div>
            {data
              .filter((item) => {
                if (item === "All") {
                  return item;
                } else if (
                  item.name.toLowerCase().includes(searchdata.toLowerCase()) ||
                  item.contactNo
                    .toLowerCase()
                    .includes(searchdata.toLowerCase()) ||
                  item.emailId.toLowerCase().includes(searchdata.toLowerCase())
                ) {
                  return item;
                }
              })
              .filter((stat) => {
                if (filterstatus == "all") {
                  return stat;
                } else if (filterstatus == "active") {
                  return stat.status == true;
                } else {
                  return stat.status == false;
                }
              })
              .map((arbitratior) => (
                <TableProps
                  key={arbitratior._id}
                  id_body={arbitratior.uid}
                  name_body={arbitratior.name}
                  number_body={arbitratior.contactNo}
                  email_body={arbitratior.emailId}
                  noOfAssginCases_body={arbitratior.noOfAssignCase}
                  address_body={arbitratior.address.slice(0, 10)}
                  status_body={
                    arbitratior.status == false ? "InActive" : "Active"
                  }
                  action_body=<FiEdit3
                    style={{
                      color: "blue",
                      fontSize: "24px",
                      cursor: "pointer",
                    }}
                  />
                  handleOpen={() => handleOpen(arbitratior)}
                />
              ))}
          </div>
        ) : (
          // </table>
          <NoDataFound />
        )}
      </div>



  {/* Pagination*/}
  <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />


      {/* Modal for update status */}
      <UpdateArbitratorDetailsProps
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editData={editData}
        setEditData={setEditData}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ArbitratorDashboard;
