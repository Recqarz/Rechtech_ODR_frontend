import { LuUser } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa";

const AddClient = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    uid: "",
    name: "",
    contact: "",
    email: "",
    expertise: "NA",
    experience: "1",
    about: "",
    address: "",
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/autouid/client`)
      .then((res) => setFormData({ ...formData, uid: res.data.uid }))
      .catch((err) => toast.error("Something went wrong"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      name: formData.name,
      contactNo: formData.contact,
      emailId: formData.email,
      areaOfExpertise: formData.expertise,
      experienceInYears: parseInt(formData.experience),
      about: formData.about,
      role: "client",
      uid: formData.uid,
      address: formData.address,
    };
    if (
      !obj.name ||
      !obj.emailId ||
      !obj.contactNo ||
      !obj.areaOfExpertise ||
      !obj.experienceInYears ||
      !obj.about ||
      !obj.address
    ) {
      toast.error("All fields are required");
      return;
    }
    if (obj.contactNo.length != 10) {
      toast.error("Invalid contact number");
      return;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(obj.emailId)) {
      toast.error("Invalid email address");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BASEURL}/auth/register`, obj)
      .then((res) => {
        toast.success("Client added successfully");
        navigate("/clienttable");
        setFormData({
          uid: "",
          name: "",
          contact: "",
          email: "",
          expertise: "",
          experience: "",
          about: "",
          address: "",
        });
      })
      .catch((err) => {
        toast.error("Failed to add client");
      });
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1070px] mx-auto px-4 py-3">
        {/* Header */}
        <div className="ml-10 md:ml-0 flex justify-between items-center shadow-2xl bg-[#0f2d6b] rounded-md   py-2 px-4 mt-1 md:mt-0">
          <h2 className="font-semibold text-white  text-sm cursor-pointer flex gap-1 items-center">
            Users <FaAngleRight className="text-xs mt-1" />{" "}
            <span
              className="hover:text-blue-500"
              onClick={() => navigate("/clienttable")}
            >
              Client
            </span>
            <FaAngleRight className="text-xs mt-1" />{" "}
            <span className="hover:text-blue-500">Add</span>
          </h2>
          <div>
            <div className="bg-blue-50 p-2 md:p-3 rounded-full">
              <LuUser className="text-blue-600 text-md md:text-xl" />
            </div>
          </div>
        </div>


        {/* <div className="flex justify-between items-center mb-4 ml-10 md:ml-0 bg-white p-1 md:p-2 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500 flex items-center space-x-2">
              <span className="cursor-pointer hover:text-blue-700 font-semibold">
                User
              </span>
              <span>›</span>
              <span
                className="cursor-pointer hover:text-blue-700 font-semibold"
                onClick={() => navigate("/clienttable")}
              >
                Client
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
        </div> */}

        {/* Form */}
        <div className="bg-[#0f2d6b] rounded-xl shadow-sm px-4 py-6 mt-6">
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
                <label className="absolute text-sm text-gray-800 font-bold duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4  peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                  ID
                </label>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none  focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:font-bold peer-focus:bg-transparent peer-focus:scale-75 peer-focus:text-blue-600 left-1">
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
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:font-bold peer-focus:bg-transparent peer-focus:scale-75 peer-focus:text-blue-600 left-1">
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
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:font-bold peer-focus:bg-transparent peer-focus:scale-75 peer-focus:text-blue-600 left-1">
                  Email Address
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
                <label className="absolute text-md text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:font-bold peer-focus:bg-transparent peer-focus:scale-75 peer-focus:text-blue-600 left-1">
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
              <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:font-bold peer-focus:bg-transparent peer-focus:scale-75 peer-focus:text-blue-600 left-1">
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

export default AddClient;
