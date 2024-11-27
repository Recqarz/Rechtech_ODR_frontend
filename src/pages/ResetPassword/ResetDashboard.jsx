import { forgotEmail } from "@/global/action";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const ResetDashboard = () => {
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
      .post("http://localhost:3000/resetpassword/userexists", {
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
    <div className="flex justify-center lg:justify-between p-[34px] min-h-[100vh] min-w-[98vw] bg-[#d4e1ea]">
      <div className="max-h-[480px] relative w-[400px] shadow-lg flex flex-col items-center  px-12 py-4 rounded-3xl bg-white bg-opacity-60">
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
              value="Send OTP"
              className="px-12 py-[6px] bg-black text-white rounded-md cursor-pointer"
            />
          </div>
        </form>
        <div className="absolute bottom-6">
          <h2
            onClick={() => navigate("/")}
            className="text-lg font-semibold text-gray-500 flex gap-2 cursor-pointer"
          >
            <FaLongArrowAltLeft className="text-3xl font-semibold text-blue-700 cursor-pointer" />
            Go back
          </h2>
        </div>
      </div>
      <div className="h-full hidden lg:flex justify-center items-center">
        <img
          src="/file.png"
          alt="ai image"
          className="h-[450px] w-[700px] object-contain"
        />
      </div>
    </div>
  );
};
