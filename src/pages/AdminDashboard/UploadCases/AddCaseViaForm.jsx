import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CreatableSelect from "react-select/creatable";
import { useNavigate } from "react-router-dom";

const AddCaseViaForm = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [options2, setOptions2] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [formData, setFormData] = useState({
    caseId: "",
    clientName: "",
    clientAddress: "",
    clientMobile: "",
    clientEmail: "",
    respondentName: "",
    respondentAddress: "",
    respondentMobile: "",
    respondentEmail: "",
    disputeType: "",
    cardNo: "",
    amount: "",
    accountNumber: "",
  });
  const [fileInputs, setFileInputs] = useState([
    { id: 1, fileName: "", file: null },
  ]);
  const getfetchData = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/client/all`)
      .then((res) => {
        let resndata = res.data.user
          .filter((el) => {
            return el.status == true;
          })
          .map((el) => {
            let oneData = el;
            oneData.value = el;
            oneData.label = el.name;
            return oneData;
          });
        setOptions(resndata);
        setOptions2(resndata);
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };
  const fetchCaseId = () => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/cases/auto-caseid`)
      .then((res) => {
        setFormData((prevState) => ({
          ...prevState,
          caseId: res.data.data,
        }));
      });
  };
  useEffect(() => {
    getfetchData();
    fetchCaseId();
  }, []);
  useEffect(() => {
    if (selectedOption) {
      setFormData((prevState) => ({
        ...prevState,
        clientName: selectedOption.name,
        clientMobile: selectedOption.contactNo,
        clientEmail: selectedOption.emailId,
        clientAddress: selectedOption.address,
      }));
      const ndata = options2.filter((ele) => {
        return ele.value._id !== selectedOption.value._id;
      });
      setOptions2(ndata);
    }
    if (selectedOption2) {
      setFormData((prevState) => ({
        ...prevState,
        respondentName: selectedOption2.name,
        respondentMobile: selectedOption2.contactNo,
        respondentEmail: selectedOption2.emailId,
        respondentAddress: selectedOption2.address,
      }));
      const ndata = options.filter((ele) => {
        return ele.value._id !== selectedOption2.value._id;
      });
      setOptions(ndata);
    }
  }, [selectedOption, selectedOption2]);

  const handleAddFileInput = () => {
    const newId = fileInputs.length + 1;
    setFileInputs([...fileInputs, { id: newId, fileName: "", file: null }]);
  };
  const handleSubstractFileInput = () => {
    if (fileInputs.length > 1) {
      const updatedFileInputs = fileInputs.slice(0, -1);
      setFileInputs(updatedFileInputs);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e, id) => {
    const { name, files } = e.target;
    const updatedFileInputs = fileInputs.map((input) =>
      input.id === id ? { ...input, file: files[0] } : input
    );
    setFileInputs(updatedFileInputs);
  };

  const handleFileNameChange = (e, id) => {
    const { value } = e.target;
    const updatedFileInputs = fileInputs.map((input) =>
      input.id === id ? { ...input, fileName: value } : input
    );
    setFileInputs(updatedFileInputs);
  };

  const handleAddNewCaseData = async (e) => {
    e.preventDefault();

    // Create the case data object
    const caseData = {
      caseId: formData.caseId,
      clientId: selectedOption._id,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientMobile: formData.clientMobile,
      clientAddress: formData.clientAddress,
      respondentName: formData.respondentName,
      respondentEmail: formData.respondentEmail,
      respondentMobile: formData.respondentMobile,
      respondentAddress: formData.respondentAddress,
      disputeType: formData.disputeType,
      amount: formData.amount ? formData.amount : "",
      accountNumber: formData.accountNumber ? formData.accountNumber : "",
      cardNo: formData.cardNo ? formData.cardNo : "",
    };
    // Validation checks
    if (Object.values(caseData).some((value) => !value)) {
      toast.error("All fields are required");
      return;
    }

    // Create FormData object
    const formDataToSend = new FormData();

    // Append the case data as a JSON string
    formDataToSend.append("caseData", JSON.stringify(caseData));
    // Append files and their names
    fileInputs.forEach((input, index) => {
      if (input.file && input.fileName) {
        formDataToSend.append(`files`, input.file);
        formDataToSend.append(`fileNames`, input.fileName);
      }
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASEURL}/cases/addcase`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data) {
        toast.success("Case added successfully");
        // Reset form
        setFileInputs([{ id: 1, fileName: "", file: null }]);
        setFormData({
          caseId: "",
          clientName: "",
          clientAddress: "",
          clientMobile: "",
          clientEmail: "",
          respondentName: "",
          respondentAddress: "",
          respondentMobile: "",
          respondentEmail: "",
          disputeType: "",
          cardNo: "",
          amount: "",
          accountNumber: "",
        });
        setSelectedOption(null);
        navigate("/admin/cases");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleSelectChange = (newValue) => {
    if (newValue && newValue.__isNew__) {
      navigate("/client/addclient");
      return;
    }
    setSelectedOption(newValue);
  };

  const handleSelectChange2 = (newValue) => {
    if (newValue && newValue.__isNew__) {
      navigate("/client/addclient");
      return;
    }
    setSelectedOption2(newValue);
  };

  return (
    <div>
      {/* Add Case Via Form */}
      <div className="bg-white rounded-xl shadow-sm px-4 py-6 mt-12">
        <form onSubmit={handleAddNewCaseData} className="space-y-6">
          <div className="flex justify-center">
            <div className="relative group w-1/3">
              <input
                type="text"
                name="caseId"
                disabled={true}
                value={formData.caseId}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-75 peer"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Case ID
              </label>
            </div>
          </div>

          <h1 className="text-md font-bold">
            Fill The Claimant And Respondent Details
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative group">
              <CreatableSelect
                className="z-40 block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-75 peer"
                value={selectedOption}
                onChange={handleSelectChange}
                options={options}
                placeholder="Select claimant Name"
                noOptionsMessage={({ inputValue }) => (
                  <div>No clients found</div>
                )}
                formatCreateLabel={() => "Create New One"}
                isValidNewOption={(inputValue, selectValue, selectOptions) => {
                  return !selectOptions.some(
                    (option) =>
                      option.label.toLowerCase() === inputValue.toLowerCase()
                  );
                }}
              />
            </div>

            <div className="relative group">
              <input
                type="email"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                placeholder="Claimant Email"
              />
              <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Claimant Email
              </label>
            </div>

            <div className="relative group">
              <input
                type="tel"
                name="clientMobile"
                value={formData.clientMobile}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                placeholder="Claimant Mobile"
              />
              <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Claimant Mobile
              </label>
            </div>

            <div className="relative group">
              <input
                type="text"
                name="clientAddress"
                value={formData.clientAddress}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                placeholder="Claimant Address"
              />
              <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Claimant Address
              </label>
            </div>

            <div className="relative group">
              <CreatableSelect
                className="z-20 block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-75 peer"
                value={selectedOption2}
                onChange={handleSelectChange2}
                options={options2}
                placeholder="Select Respondent Name"
                noOptionsMessage={({ inputValue }) => (
                  <div>No clients found</div>
                )}
                formatCreateLabel={() => "Create New Client"}
                isValidNewOption={(inputValue, selectValue, selectOptions) => {
                  return !selectOptions.some(
                    (option) =>
                      option.label.toLowerCase() === inputValue.toLowerCase()
                  );
                }}
              />
            </div>

            <div className="relative group">
              <input
                type="email"
                name="respondentEmail"
                value={formData.respondentEmail}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                placeholder=" Respondent Email"
              />
              <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Respondent Email
              </label>
            </div>

            <div className="relative group">
              <input
                type="tel"
                name="respondentMobile"
                value={formData.respondentMobile}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                placeholder="Respondent Mobile"
              />
              <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Respondent Mobile
              </label>
            </div>

            <div className="relative group">
              <input
                type="text"
                name="respondentAddress"
                value={formData.respondentAddress}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                placeholder="Respondent Address"
              />
              <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Respondent Address
              </label>
            </div>

            <div className="relative group">
              <input
                type="tel"
                name="cardNo"
                value={formData.cardNo}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                placeholder="Card Number"
              />
              <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Card Number
              </label>
            </div>

            <div className="relative group">
              <input
                type="tel"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                placeholder="Amount"
              />
              <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Amount
              </label>
            </div>

            <div className="relative group">
              <input
                type="tel"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                placeholder="Account Number"
              />
              <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-1 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Account Number
              </label>
            </div>

            <div className="relative group">
              <input
                type="text"
                name="disputeType"
                value={formData.disputeType}
                onChange={handleChange}
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                placeholder="Dispute Type"
              />
              <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                Dispute Type
              </label>
            </div>
          </div>

          {fileInputs.map((input) => (
            <div key={input.id} className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <input
                  type="text"
                  value={input.fileName}
                  onChange={(e) => handleFileNameChange(e, input.id)}
                  className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                  placeholder={`File Name ${input.id}`}
                />
                <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                  File Name
                </label>
              </div>
              <div className="relative group">
                <input
                  type="file"
                  id={`fileInput-${input.id}`}
                  accept=".jpg,.jpeg,.png,.pdf,.xls,.xlsx"
                  onChange={(e) => {
                    handleFileChange(e, input.id);
                    // Update file name display
                    const fileInput = document.getElementById(
                      `fileInput-${input.id}`
                    );
                    const fileNameDisplay = document.getElementById(
                      `fileName-${input.id}`
                    );
                    if (fileInput.files.length > 0) {
                      fileNameDisplay.textContent = fileInput.files[0].name;
                    } else {
                      fileNameDisplay.textContent = "No file chosen";
                    }
                  }}
                  className="hidden"
                />
                <div className="flex items-center">
                  <label
                    htmlFor={`fileInput-${input.id}`}
                    className="flex items-center px-4 py-3 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-all"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 mr-2 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                      />
                    </svg>
                    <span className="text-gray-700">Choose File</span>
                  </label>
                  <span
                    id={`fileName-${input.id}`}
                    className="ml-3 text-gray-600 truncate max-w-[200px]"
                  >
                    No file chosen
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-end gap-4 mt-4">
            <div className="w-[5%] text-center">
              <input
                type="button"
                value="-"
                onClick={handleSubstractFileInput}
                className="text-xl p-1 font-bold block w-full text-white bg-green-500 rounded-md cursor-pointer"
              />
            </div>
            <div className="w-[5%] text-center">
              <input
                type="button"
                value="+"
                onClick={handleAddFileInput}
                className="text-xl p-1 font-bold block w-full text-white bg-red-500 rounded-md cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 transform hover:scale-105"
            >
              Add Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCaseViaForm;
