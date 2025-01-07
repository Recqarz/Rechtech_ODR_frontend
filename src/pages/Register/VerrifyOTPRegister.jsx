import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VerrifyOTPRegister = () => {
  const navigate = useNavigate();
  // otp for email
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  // otp for sms
  const [otpValueSMS, setOtpValueSMS] = useState(["", "", "", ""]);
  const inputRefsSMS = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // get email
  const emailId = JSON.parse(localStorage.getItem("email"));

  const handleChange = (index, value, otpType) => {
    if (!/^\d*$/.test(value)) return; // Only allow numeric input

    if (otpType === "email") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value !== "" && index < 3) {
        inputRefs[index + 1].current.focus(); // Focus next input
      }
    } else {
      const newOtpValuesSMS = [...otpValueSMS];
      newOtpValuesSMS[index] = value;
      setOtpValueSMS(newOtpValuesSMS);

      if (value !== "" && index < 3) {
        inputRefsSMS[index + 1].current.focus(); // Focus next input
      }
    }
  };

  const handleKeyDown = (index, e, otpType) => {
    if (e.key === "Backspace") {
      if (otpType === "email" && index > 0 && otpValues[index] === "") {
        inputRefs[index - 1].current.focus(); // Focus previous input for email OTP
      } else if (otpType === "sms" && index > 0 && otpValueSMS[index] === "") {
        inputRefsSMS[index - 1].current.focus(); // Focus previous input for SMS OTP
      }
    }
  };

  const handlePaste = (e, otpType) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4).split("");

    if (otpType === "email") {
      const newOtpValues = [...otpValues];
      pastedData.forEach((value, index) => {
        if (index < 4 && /^\d$/.test(value)) {
          newOtpValues[index] = value;
        }
      });
      setOtpValues(newOtpValues);
    } else {
      const newOtpValuesSMS = [...otpValueSMS];
      pastedData.forEach((value, index) => {
        if (index < 4 && /^\d$/.test(value)) {
          newOtpValuesSMS[index] = value;
        }
      });
      setOtpValueSMS(newOtpValuesSMS);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpMail = otpValues.join("");
    const otpSMS = otpValueSMS.join("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASEURL}/auth/register/otp`,
        { otpMail, otpSMS, emailId }
      );
      toast.success("OTP verified successfully");
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="h-[120vh] md:h-[100vh] w-[100wh] bg-[#012061] flex justify-center items-center">
      <div className="max-w-[700px] lg:max-w-[900px] m-auto grid grid-cols-1 md:grid-cols-2 rounded-md">
        <div className="hidden md:block rounded-md">
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
        <div className="h-[400px] md:h-[450px] relative shadow-lg flex flex-col items-center px-12 py-4 rounded-l-md md:rounded-l-none rounded-r-md bg-[#f5f6fa]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-1 md:gap-4 w-full"
          >
            <h2 className="text-2xl font-bold mb-16 mt-5 text-center">
              Verify OTP
            </h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="otp" className="font-semibold">
                Enter OTP (Email)
              </label>
              <div className="flex gap-2 justify-center">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) =>
                      handleChange(index, e.target.value, "email")
                    }
                    onKeyDown={(e) => handleKeyDown(index, e, "email")}
                    onPaste={(e) => handlePaste(e, "email")}
                    className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="otpSMS" className="font-semibold">
                Enter OTP (SMS)
              </label>
              <div className="flex gap-2 justify-center">
                {otpValueSMS.map((value, index) => (
                  <input
                    key={index}
                    ref={inputRefsSMS[index]}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value, "sms")}
                    onKeyDown={(e) => handleKeyDown(index, e, "sms")}
                    onPaste={(e) => handlePaste(e, "sms")}
                    className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-[95%] py-[4px] bg-[#0F2D6B] text-white rounded-md cursor-pointer"
              >
                Verify OTP
              </button>
            </div>
          </form>
          <div className="absolute bottom-6">
            <h2
              onClick={() => navigate("/resetdashboard")}
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

export default VerrifyOTPRegister;
