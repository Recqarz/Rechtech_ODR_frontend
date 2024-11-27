import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { LuUser } from "react-icons/lu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import CaseDashboard from "./CaseDashboard";
import { useDispatch, useSelector } from "react-redux";
import { refreshers } from "@/global/action";

const Uploadcase = () => {
  let dispatch = useDispatch();
  let refresher = useSelector((state) => state?.refresher);
  const [formData, setFormData] = useState({
    clientName: "",
    clientId: "",
    clientEmail: "",
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
    }));
  };

  const handleUploadFunction = () => {
    setSelectedOption(null);
    setIsOpen(true);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    if (!formData.clientName || !formData.clientId || !formData.clientEmail) {
      toast.error("Please fill in all client details");
      return;
    }
    console.log("form", formData);
    console.log("object", file.name);

    return;

    const submitData = new FormData();
    submitData.append("excelFile", file);
    submitData.append("clientName", formData.clientName);
    submitData.append("clientId", formData.clientId);
    submitData.append("clientEmail", formData.clientEmail);
    submitData.append("fileName", file.name);

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASEURL}/uploadcasedata`,
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

  const getData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/client/all`)
      .then((res) => {
        const formattedOptions = res.data.user.map((user) => ({
          value: user.emailId,
          label: `${user.contactNo} / ${user.name}`,
          clientId: user._id,
          clientName: user.name,
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
    <div className="max-w-6xl mx-auto px-4 py-3">
      <div className=" flex justify-between items-center mb-4 bg-white p-2 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <Link to="/client/cases">
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                Cases
              </span>
            </Link>
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-full">
          <LuUser className="text-blue-600 text-xl" />
        </div>
      </div>

      <div className="flex justify-end gap-5 p-4">
        {/* Upload one case details in the forms */}
        <div className="border-2 border-dashed w-[48%] md:w-[30%] lg:w-[20%] mt-5">
          <h1 className="text-center mt-1">Fill The Details Via Form</h1>
          <div className="text-center p-4">
            <Link to="/admin/cases/add">
              <button className="bg-blue-700 hover:bg-blue-800 px-4 py-1 rounded-sm text-white">
                Add Case
              </button>
            </Link>
          </div>
        </div>

        {/* Upload Case Details in file */}
        <div className="border-2 border-dashed w-[48%] md:w-[30%] lg:w-[20%] mt-5">
          <h1 className="text-center mt-1">Upload Case Via File</h1>
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

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[480px] p-6 rounded-lg shadow-lg">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold text-gray-800">
              File Details
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              File Name:{" "}
              <span className="font-medium text-gray-800">Excel</span>
              <br />
              Date:{" "}
              <span className="font-medium text-gray-800">{formattedDate}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700 sm:col-span-1"
              >
                Client Email
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
                    You selected: {selectedOption.label.split("/")[1]}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <Label className="block text-sm font-medium text-gray-700 mb-1">
                Excel File <span className="text-red-500">*</span>
              </Label>
              <label
                htmlFor="uploadFile1"
                className="w-[200px] md:w-[300px] ml-[100px] md:ml-[120px] lg:ml-[120px] mt-[-15px] bg-white text-gray-500 font-semibold text-base rounded h-40 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed font-[sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-11 mb-2 fill-gray-500"
                  viewBox="0 0 32 32"
                >
                  <path
                    d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                    data-original="#000000"
                  />
                  <path
                    d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                    data-original="#000000"
                  />
                </svg>
                Upload file
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setMessage(e.target.files[0]);
                  }}
                  id="uploadFile1"
                  className="hidden"
                />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  Only .xlsx file is Allowed.
                </p>
              </label>
              {message && (
                <div className="text-sm text-gray-600 mt-2 text-center">
                  Selected file: {message.name}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 flex justify-end">
            <Button
              type="submit"
              onClick={handleUpload}
              className="px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CaseDashboard />
    </div>
  );
};

export default Uploadcase;
