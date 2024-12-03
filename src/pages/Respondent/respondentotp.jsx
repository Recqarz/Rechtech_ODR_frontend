import { loginUpdater, updateRole } from "@/global/action";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const VerifyOTP = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch()
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
    <div className="flex justify-center lg:justify-between p-[34px] min-h-[100vh] min-w-[98vw] bg-[#d4e1ea]">
      <div className="max-h-[480px] relative w-[400px] shadow-lg flex flex-col items-center px-12 py-4 rounded-3xl bg-white bg-opacity-60">
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
              className="px-12 py-[6px] bg-black text-white rounded-md cursor-pointer"
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
