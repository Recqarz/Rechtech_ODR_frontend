import { loginUpdater, updateRole } from "@/global/action";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ResepondentOtps = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  let respondentAccount = useSelector((state) => state?.respondentAccount);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value !== "" && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otpValues[index] === "") {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4).split("");
    const newOtpValues = [...otpValues];

    pastedData.forEach((value, index) => {
      if (index < 4 && /^\d$/.test(value)) {
        newOtpValues[index] = value;
      }
    });

    setOtpValues(newOtpValues);

    const nextEmptyIndex = newOtpValues.findIndex((value) => value === "");
    if (nextEmptyIndex !== -1) {
      inputRefs[nextEmptyIndex].current.focus();
    } else if (newOtpValues[3]) {
      inputRefs[3].current.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = otpValues.join("");
    axios
      .post(`${import.meta.env.VITE_API_BASEURL}/auth/respondentlogin`, {
        otp,
        accountNumber: respondentAccount,
      })
      .then((res) => {
        sessionStorage.setItem("rechtechtoken", JSON.stringify(res.data.token));
        sessionStorage.setItem("rechtechrole", JSON.stringify(res.data.role));
        toast.success("OTP verified and login successfully");
        dispatch(updateRole(res.data.role));
        dispatch(loginUpdater(true));
        navigate(`/${res.data.role}`);
      })
      .catch(() => {
        toast.error("Invalid otp please try with correct otp");
        navigate("/");
      });
  };

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
        <div className="h-[400px] md:h-[450px] relative shadow-lg flex flex-col items-center px-12 py-4 rounded-l-md md:rounded-l-none rounded-r-md bg-[#f5f6fa]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <h2 className="text-2xl font-bold mb-16 mt-5 text-center">
              Verify OTP
            </h2>
            <div className="flex flex-col gap-2">
              <label htmlFor="otp" className="font-semibold">
                Enter OTP
              </label>
              <div className="flex gap-2 justify-center">
                {otpValues.map((value, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
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
              onClick={() => navigate("/")}
              className="text-lg font-semibold text-gray-500 flex gap-2 cursor-pointer"
            >
              <FaLongArrowAltLeft className="text-3xl font-semibold text-[#0F2D6B] cursor-pointer"/>
              Go back
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResepondentOtps;
