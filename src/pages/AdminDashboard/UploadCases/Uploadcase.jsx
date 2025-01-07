import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import CaseDashboard from "./CaseDashboard";
import { useDispatch, useSelector } from "react-redux";
import { forgotEmail, refreshers } from "@/global/action";
import UploadCaseBulkProps from "./UploadCaseBulkProps";
import { FaAngleRight } from "react-icons/fa";

const Uploadcase = () => {
  let dispatch = useDispatch();
  let refresher = useSelector((state) => state?.refresher);
  const [disputeType, setDisputeType] = useState("");
  const [formData, setFormData] = useState({
    clientName: "",
    clientId: "",
    clientEmail: "",
    clientAddress: "",
    clientMobile: "",
    disputeType: "",
  });
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (newValue) => {
    setSelectedOption(newValue);
    setFormData((prev) => ({
      ...prev,
      clientId: newValue.clientId,
      clientName: newValue.clientName,
      clientEmail: newValue.value,
      clientAddress: newValue.clientAddress,
      clientMobile: newValue.clientPhone,
    }));
  };

  const handleUploadFunction = () => {
    setSelectedOption(null);
    setIsOpen(true);
  };

  // button upload files in the modal
  const handleUpload = async (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      disputeType: disputeType,
    }));

    if (!formData.clientName || !formData.clientId || !formData.clientEmail) {
      toast.error("Please fill in client details");
      return;
    }
    if (!disputeType) {
      toast.error("Please fill dispute type");
      return;
    }

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const submitData = new FormData();
    submitData.append("excelFile", file);
    submitData.append("clientName", formData.clientName);
    submitData.append("clientId", formData.clientId);
    submitData.append("clientEmail", formData.clientEmail);
    submitData.append("clientAddress", formData.clientAddress);
    submitData.append("clientMobile", formData.clientMobile);
    submitData.append("fileName", file.name);
    submitData.append("disputeType", disputeType);

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASEURL}/cases/bulkupload`,
        {
          method: "POST",
          body: submitData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setMessage(data.message);
      toast.success("File uploaded successfully");
      setSelectedOption(null);
      dispatch(refreshers(!refresher));
      setFormData({
        clientName: "",
        clientId: "",
        clientEmail: "",
      });
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";
      setIsOpen(false);
    } catch (error) {
      setMessage("Error uploading file");
      toast.error("Error uploading file");
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = useMemo(() => {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth();
    const year = now.getFullYear();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${day} ${monthNames[month]} ${year}`;
  }, []);

  //Get all the client in the modal
  const getData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/client/all`)
      .then((res) => {
        const formattedOptions = res.data.user.map((user) => ({
          value: user.emailId,
          label: `${user.contactNo} / ${user.name}`,
          clientId: user._id,
          clientName: user.name,
          clientAddress: user.address,
          clientPhone: user.contactNo,
        }));
        setData(formattedOptions);
        setOptions(formattedOptions);
      })
      .catch((err) => {
        toast.error("Failed to fetch client data");
      });
  };

  const filterOptions = (inputValue) => {
    return data.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleInputChange = (inputValue) => {
    const filteredOptions = filterOptions(inputValue);
    setOptions(filteredOptions);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="max-w-[1070px] mx-auto px-4 py-2 min-h-[100vh]">
      {/* <div className=" flex justify-between items-center ml-12 md:ml-0 bg-white mb-2 p-2 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <Link to="/admin/cases">
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                Cases
              </span>
            </Link>
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-full">
          <LuUser className="text-blue-600 text-xl" />
        </div>
      </div> */}
      <div className="ml-10 md:ml-0 flex justify-between items-center shadow-2xl bg-[#0f2d6b] rounded-md   py-2 px-4 mt-1 md:mt-0">
        <h2 className="font-semibold text-white  text-sm cursor-pointer flex gap-1 items-center">
          Cases 
        </h2>
        <div>
          <div className="bg-blue-50 p-2 md:p-3 rounded-full">
            <LuUser className="text-blue-600 text-md md:text-xl" />
          </div>
        </div>
      </div>

      <div className="md:flex md:justify-end gap-5 p-4">
        {/* Upload one case details in the forms */}
        <div className="border-2 border-dashed w-[100%] md:w-[30%] lg:w-[20%] mt-5">
          <h1 className="text-center mt-1 text-white">Case Via Form</h1>
          <div className="text-center p-4">
            <Link to="/admin/cases/add">
              <button className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded-sm text-white">
                Add Case
              </button>
            </Link>
          </div>
        </div>

        {/* Upload Case Details in file */}
        <div className="border-2 border-dashed w-[100%] md:w-[30%] lg:w-[20%] mt-5">
          <h1 className="text-center mt-1 text-white">Case Via File</h1>
          <div className="text-center p-4">
            <button
              className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded-sm text-white"
              onClick={handleUploadFunction}
            >
              File Upload
            </button>
          </div>
        </div>
      </div>

      {/* Case upload in bulk */}

      <UploadCaseBulkProps
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        formattedDate={formattedDate}
        options={options}
        selectedOption={selectedOption}
        handleChange={handleChange}
        handleInputChange={handleInputChange}
        disputeType={disputeType}
        setDisputeType={setDisputeType}
        setFile={setFile}
        message={message}
        setMessage={setMessage}
        handleUpload={handleUpload}
      />
      <CaseDashboard />
    </div>
  );
};

export default Uploadcase;
