import { LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddArbitrator = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    contact: "",
    email: "",
    experties: [],
    experience: "",
    about: "",
    address:""
  });
  const [experties, setExperties] = useState([]);
  const [filteredExperties, setFilteredExperties] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // Fetch UID
    axios
      .get("http://localhost:3000/autouid/arbitrator")
      .then((res) => setFormData({ ...formData, uid: res.data.uid }))
      .catch(() => toast.error("Something went wrong"));

    // Fetch expertise suggestions
    axios
      .get("http://localhost:3000/experties")
      .then((res) => {
        let properties = res.data.experties.map((ele) => {
          let name = ele.name;
          return name;
        });
        setExperties(properties);
      })
      .catch(() => toast.error("Something went wrong"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleexpertiesInput = (e) => {
    const value = e.target.value;
    setInputValue(value);
    const filtered = experties.filter((expertise) =>
      expertise.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredExperties(filtered);
  };

  const handleExpertiseSelect = (expert) => {
    if (!formData.experties.includes(expert)) {
      setFormData((prevState) => ({
        ...prevState,
        experties: [...prevState.experties, expert],
      }));
    }
    setInputValue("");
    setFilteredExperties([]);
  };

  const removeexperties = (expertise) => {
    setFormData((prevState) => ({
      ...prevState,
      experties: prevState.experties.filter((e) => e !== expertise),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.experties);
    const obj = {
      name: formData.name,
      contactNo: formData.contact,
      emailId: formData.email,
      areaOfExperties: formData.experties.join(","),
      experienceInYears: parseInt(formData.experience),
      about: formData.about,
      role: "arbitrator",
      uid: formData.uid,
      address:formData.address
    };

    if (
      !obj.name ||
      !obj.emailId ||
      !obj.contactNo ||
      !obj.areaOfExperties ||
      !obj.experienceInYears ||
      !obj.about
    ) {
      toast.error("All fields are required");
      return;
    }
    if (obj.contactNo.length !== 10) {
      toast.error("Invalid contact number");
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.emailId)) {
      toast.error("Invalid email address");
      return;
    }

    axios
      .post("http://localhost:3000/auth/register", obj)
      .then(() => {
        toast.success("Arbitrator added successfully");
        setFormData({
          uid: "",
          name: "",
          contact: "",
          email: "",
          expertise: [],
          experience: "",
          about: "",
        });
        navigate("/arbitratortable");
      })
      .catch(() => {
        toast.error("Failed to add arbitrator");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 bg-white p-2 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                User
              </span>
              <span>›</span>
              <span
                className="cursor-pointer hover:text-blue-700 font-semibold"
                onClick={() => navigate("/arbitratortable")}
              >
                Arbitrator
              </span>
              <span>›</span>
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                Add
              </span>
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-full">
            <LuUser className="text-blue-600 text-xl" />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm px-4 py-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <input
                  type="text"
                  name="uid"
                  disabled={true}
                  value={formData.uid}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all disabled:opacity-75 peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                  ID
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                  placeholder="Full Name"
                />
                <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                  Contact Number
                </label>
              </div>

              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                  Email Address
                </label>
              </div>

              {/* -------------------- */}

              <div className="relative group">
                <div className="relative">
                  <div className="relative flex items-center flex-wrap gap-1 min-h-[48px] px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    {formData.experties.map((experties, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full text-sm font-medium space-x-1"
                      >
                        <span>{experties}</span>
                        <button
                          type="button"
                          className="ml-1 text-blue-400 hover:text-blue-600 focus:outline-none"
                          onClick={() => removeexperties(experties)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleexpertiesInput}
                      className="flex-grow min-w-[120px] bg-transparent border-none focus:outline-none p-1"
                      placeholder={
                        formData.experties.length === 0
                          ? "Enter Area of Expertise"
                          : ""
                      }
                    />
                  </div>
                  {filteredExperties.length > 0 && inputValue && (
                    <ul className="absolute w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-50">
                      {filteredExperties.map((expert, index) => (
                        <li
                          key={index}
                          className="px-4 py-2.5 hover:bg-blue-50 cursor-pointer text-gray-700 text-sm transition-colors duration-150 border-b border-gray-50 last:border-none flex items-center space-x-2"
                          onClick={() => handleExpertiseSelect(expert)}
                        >
                          <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                          <span>{expert}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 left-1">
                  Area of Expertise
                </label>
              </div>

              {/* ------------------ */}

              <div className="relative group">
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                  Experience (Years)
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                  placeholder="Address"
                />
                <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                   Address
                </label>
              </div>
            </div>

            <div className="relative group mt-6">
              <textarea
                name="about"
                value={formData.about}
                onChange={handleChange}
                rows="4"
                className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none peer"
                placeholder=" "
              />
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                About (Max 500 Characters)
              </label>
            </div>

            <div className="flex justify-end mt-8">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 transition-all duration-300 transform hover:scale-105"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArbitrator;
