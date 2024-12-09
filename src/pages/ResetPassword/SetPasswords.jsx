import { useState } from "react";
import { FaLongArrowAltLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { forgotEmail } from "@/global/action";
import toast from "react-hot-toast";

export const SetPasswords = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let emailId = useSelector((state) => state?.forgotEmail);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      password: "",
      confirmPassword: "",
    };

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validatePassword = () => {
      const password = formData.password;
      const confirmPassword = formData.confirmPassword;
      if (!password) {
        toast.error("Password cannot be empty.");
        return false;
      }
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long.");
        return false;
      }
      if (!/[A-Z]/.test(password)) {
        toast.error("Password must contain at least one uppercase letter.");
        return false;
      }
      if (!/[a-z]/.test(password)) {
        toast.error("Password must contain at least one lowercase letter.");
        return false;
      }
      if (!/[0-9]/.test(password)) {
        toast.error("Password must contain at least one number.");
        return false;
      }
      if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        toast.error("Password must contain at least one special character.");
        return false;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return false;
      }
      return true;
    };
    if (validatePassword()) {
      let obj = {
        emailId,
        password: formData.password,
      };

      axios
        .put(
          `${import.meta.env.VITE_API_BASEURL}/resetpassword/updatepassword`,
          obj
        )
        .then((res) => {
          dispatch(forgotEmail(""));
          navigate("/");
          toast.success("Password has been updated successfully.");
        })
        .catch(() => {
          toast.error("Failed to update password. Please try again.");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
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
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-8 mt-5 text-center">
              Reset Password
            </h2>

            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="font-semibold">
                New Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-2 py-1 rounded-md placeholder:text-sm border"
                  type={showPassword.password ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("password")}
                >
                  {showPassword.password ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password}</span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="confirmPassword" className="font-semibold">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  className="w-full px-2 py-1 rounded-md placeholder:text-sm border"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => togglePasswordVisibility("confirmPassword")}
                >
                  {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="w-[95%] py-[4px] bg-[#0F2D6B] text-white rounded-md cursor-pointer"
              >
                Reset Password
              </button>
            </div>
          </form>

          <div className="absolute bottom-6">
            <h2
              onClick={() => navigate("/resetdashboard/otp")}
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
