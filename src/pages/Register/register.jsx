import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUpdater, respondentEmail, updateRole } from "@/global/action";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  let [uid, setUid] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/autouid/client`)
      .then((res) => setUid(res.data.uid))
      .catch((err) => toast.error("Something went wrong"));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    let name = e.target[0].value;
    let email = e.target[1].value;
    let contactNo = e.target[2].value;
    let address = e.target[3].value;
    let about = e.target[4].value;
    if (!name || !email || !contactNo || !email || !address || !about) {
      toast.error("All fields are required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format");
    } else {
      axios
        .post(`${import.meta.env.VITE_API_BASEURL}/auth/register`, {
          uid,
          name,
          emailId: email,
          contactNo,
          address,
          about,
        })
        .then((res) => {
          toast.success("Registration successful");
          navigate("/logins");
        })
        .catch((err) => {
          toast.error("Registration failed");
          console.error(err);
        });
    }
  }

  return (
    <div className="min-h-[100vh] w-[100wh] bg-[#012061] flex justify-center items-center py-8">
      <div className="max-w-[700px] lg:max-w-[900px] m-auto grid grid-cols-1 md:grid-cols-2 rounded-md">
        <div className="hidden md:block rounded-md ">
          <img
            className="lg:object-contain h-[550px] rounded-l-md"
            src="/assets/LoginDesign.png"
            alt="Login Design"
          />
        </div>
        <div className="md:hidden w-full flex justify-center items-center relative top-[-20px]">
          <img
            src="/assets/fulllogo.png"
            className="object-contain shadow-lg p-4 rounded-lg"
          />
        </div>
        <div className="bg-[#f5f6fa] rounded-r-md rounded-l-md md:rounded-l-none h-[550px] flex flex-col  items-center w-full px-4">
          <h2 className="font-semibold mb-2 mt-7">Register here</h2>

          {/* -----------------------forms-------------------- */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-[280px] md:w-[300px] lg:w-[380px]"
          >
            <>
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-[14px] font-semibold">
                  Full name
                </label>
                <input
                  className="px-2 py-1 rounded-md placeholder:text-sm"
                  type="text"
                  id="name"
                  placeholder="Enter full name"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[14px] font-semibold">
                  Email
                </label>
                <input
                  className="px-2 py-1 rounded-md placeholder:text-sm"
                  type="email"
                  id="email"
                  placeholder="Enter email"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="contactNo"
                  className="text-[14px] font-semibold"
                >
                  Phone Number
                </label>
                <input
                  className="px-2 py-1 rounded-md placeholder:text-sm"
                  type="text"
                  id="contactNo"
                  placeholder="Enter phone no."
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="address" className="text-[14px] font-semibold">
                  Address
                </label>
                <input
                  className="px-2 py-1 rounded-md placeholder:text-sm"
                  type="text"
                  id="address"
                  placeholder="Enter address"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="about" className="text-[14px] font-semibold">
                  About
                </label>
                <input
                  className="px-2 py-1 rounded-md placeholder:text-sm"
                  type="text"
                  id="about"
                  placeholder="Enter About"
                />
              </div>
            </>
            <div className="flex justify-center mt-4">
              <input
                type="submit"
                value="Register"
                className="w-[95%] py-[4px] bg-[#0F2D6B] font-semibold text-white rounded-md cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2 justify-center px-3 mt-1">
              <div className="w-[45%] h-[1.5px] bg-gray-600 rounded-full"></div>
              <p className="text-sm font-semibold mt-[-5px]">or</p>
              <div className="w-[45%] h-[1.5px] bg-gray-600 rounded-full"></div>
            </div>

            <p className="text-xs font-semibold text-center">
              Have an Account?{" "}
              <span
                className="text-blue-800 font-semibold cursor-pointer"
                onClick={() => navigate("/logins")}
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
