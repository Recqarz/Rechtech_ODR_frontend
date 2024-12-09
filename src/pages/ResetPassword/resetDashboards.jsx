import { forgotEmail } from "@/global/action";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const ResetDashboards = () => {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let dispatch = useDispatch();

  function handleResetPassword(e) {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a email");
      return;
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValid = emailRegex.test(email);
    if (!isValid) {
      toast.error("Please enter a valid email");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BASEURL}/resetpassword/userexists`, {
        emailId: email,
      })
      .then((res) => {
        dispatch(forgotEmail(email));
        toast.success("OTP is sent successfully");
        navigate("/resetdashboard/otp");
      })
      .catch((err) => {
        toast.error("Email does not exist");
        setEmail("");
      });
  }

  return (
    <div className="h-[100vh] w-[100wh] bg-[#012061] flex justify-center items-center">
      <div className="max-w-[700px] lg:max-w-[900px] m-auto grid grid-cols-1 md:grid-cols-2 rounded-md">
        <div className="hidden md:block rounded-md ">
          <img
            className="object-contain h-[450px] rounded-l-md"
            src="/assets/LoginDesign.png"
            alt="Login Design"
          />
        </div>
        <div className="md:hidden w-full flex justify-center items-center relative top-[-35px]">
          <img
            src="/assets/fulllogo.png"
            className="object-contain shadow-lg p-4 rounded-lg"
          />
        </div>
        <div className="h-[400px] md:h-[450px] relative flex flex-col items-center  px-12 py-4 rounded-l-md md:rounded-l-none rounded-r-md bg-[#f5f6fa]">
          <form
            className="flex flex-col gap-4 w-full"
            onSubmit={handleResetPassword}
          >
            <h2 className="text-2xl font-bold mb-16 mt-5 text-center">
              Reset password
            </h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-semibold">
                Enter email
              </label>
              <input
                className="px-2 py-1 rounded-md placeholder:text-sm"
                type="text"
                id="email"
                placeholder="Enter email"
                value={email}
                onInput={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-4">
              <input
                type="submit"
                value="Send Otp"
                className="w-[95%] py-[4px] bg-[#0F2D6B] text-white rounded-md cursor-pointer"
              />
            </div>
          </form>
          <div className="absolute bottom-6">
            <h2
              onClick={() => navigate("/")}
              className="text-lg font-semibold text-gray-500 flex gap-2 cursor-pointer"
            >
              <FaLongArrowAltLeft className="text-3xl font-semibold text-[#0F2D6B] cursor-pointer" />
              Go back
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
