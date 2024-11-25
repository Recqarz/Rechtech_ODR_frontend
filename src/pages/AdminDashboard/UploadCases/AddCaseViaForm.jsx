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
  });
  const [fileInputs, setFileInputs] = useState([
    { id: 1, fileName: "", file: null },
  ]);
  const getfetchData = () => {
    axios
      .get("http://localhost:3000/client/all")
      .then((res) => {
        console.log("stat", res.data.user);
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
        console.log("data", resndata);
      })
      .catch((err) => {
        console.log(err.meassage);
      });
  };
  const fetchCaseId = () => {
    axios.get("http://localhost:3000/cases/auto-caseid").then((res) => {
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
    }
    if (selectedOption2) {
      setFormData((prevState) => ({
        ...prevState,
        respondentName: selectedOption2.name,
        respondentMobile: selectedOption2.contactNo,
        respondentEmail: selectedOption2.emailId,
        respondentAddress: selectedOption2.address,
      }));
    }
  }, [selectedOption, selectedOption2]);
  // console.log("selectedOption", selectedOption);

  const handleAddFileInput = () => {
    const newId = fileInputs.length + 1;
    setFileInputs([...fileInputs, { id: newId, fileName: "", file: null }]);
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
    let obj = {
      caseId: formData.caseId,
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      clientMobile: formData.clientMobile,
      clientAddress: formData.clientAddress,
      respondentName: formData.respondentName,
      respondentEmail: formData.respondentEmail,
      respondentMobile: formData.respondentMobile,
      respondentAddress: formData.respondentAddress,
      disputeType: formData.disputeType,
    };

    if (
      !obj.clientName ||
      !obj.clientEmail ||
      !obj.clientMobile ||
      !obj.clientAddress ||
      !obj.respondentName ||
      !obj.respondentEmail ||
      !obj.respondentMobile ||
      !obj.respondentAddress ||
      !obj.disputeType
    ) {
      toast.error("All fields are required");
      return;
    }
    if (obj.clientMobile.length !== 10) {
      toast.error("Invalid contact number");
      return;
    }
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        obj.clientEmail || obj.respondentEmail
      )
    ) {
      toast.error("Invalid email address");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("caseData", JSON.stringify(obj));

    fileInputs.forEach((input, index) => {
      if (input.file) {
        formDataToSend.append(`file${index + 1}`, input.file);
        formDataToSend.append(`fileName${index + 1}`, input.fileName);
      }
    });

    try {
      const res = await axios.post(
        "http://localhost:3000/cases/add-case",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("newCasesAdded", res);
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
      });
    } catch (err) {
      toast.error("Something went wrong");
      console.log("err", err);
    }
  };

  const createOption = {
    value: "create-new",
    label: "+ Create New Client",
    __isNew__: true,
  };

  const handleSelectChange = (newValue) => {
    if (newValue && newValue.__isNew__) {
      // Redirect to add client page
      navigate("/client/addclient");
      return;
    }
    setSelectedOption(newValue);
  };

  const handleSelectChange2 = (newValue) => {
    if (newValue && newValue.__isNew__) {
      // Redirect to add client page
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
                placeholder="Select Claiment Name"
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
                  accept=".jpg,.jpeg,.png,.pdf,.xls,.xlsx"
                  onChange={(e) => handleFileChange(e, input.id)}
                  className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                />
              </div>
            </div>
          ))}

          <div className="flex items-center justify-end mt-4">
            <div className="w-[5%] text-center">
              <input
                type="button"
                value="+"
                onClick={handleAddFileInput}
                className="text-xl p-1 font-bold block w-full text-white bg-red-500 rounded-md text-sm cursor-pointer"
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
