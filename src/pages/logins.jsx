import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUpdater, respondentEmail, updateRole } from "@/global/action";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginRole, setLoginRole] = useState("client");
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    if (loginRole === "respondent") {
      let obj = {
        accountNumber: e.target[0].value,
      };
      axios
        .get(
          `${import.meta.env.VITE_API_BASEURL}/cases/casewithaccountnumber/${
            obj.accountNumber
          }`
        )
        .then((response) => {
          dispatch(respondentEmail(obj.accountNumber));
          let nobj = {
            respondentMobile: response.data.caseData.respondentMobile,
            accountNumber: obj.accountNumber,
          };
          axios
            .post(
              `${import.meta.env.VITE_API_BASEURL}/auth/respondentotp`,
              nobj
            )
            .then((res) => {
              navigate("/otplogin");
            })
            .catch((err) => {
              toast.error("Internal Error");
            });
        })
        .catch((error) => {
          toast.error("Account number not found");
        });
    } else {
      let obj = {
        emailId: e.target[0].value,
        password: e.target[1].value,
      };
      axios
        .post(`${import.meta.env.VITE_API_BASEURL}/auth/login`, obj)
        .then((res) => {
          if (res.data.role === loginRole) {
            localStorage.setItem(
              "rechtechtoken",
              JSON.stringify(res.data.token)
            );
            toast.success("Login successful");
            dispatch(updateRole(res.data.role));
            localStorage.setItem("rechtechrole", JSON.stringify(res.data.role));
            dispatch(loginUpdater(true));
            navigate(`/${res.data.role}`);
          } else {
            toast.error("Invalid credentials");
          }
        })
        .catch((err) => {
          toast.error("Invalid email or password");
        });
    }
  }

  const handleRoleChange = (event) => {
    setLoginRole(event.target.value);
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
        <div className="bg-[#f5f6fa] rounded-r-md rounded-l-md md:rounded-l-none h-[450px] flex flex-col  items-center w-full px-4">
          <h2 className="font-semibold mb-5 mt-8">
            {loginRole.charAt(0).toUpperCase() + loginRole.slice(1)} Login
          </h2>
          <div className="w-[200px] grid grid-cols-2 mb-3">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="loginRole"
                value="admin"
                checked={loginRole === "admin"}
                onChange={handleRoleChange}
                className={`w-[12px] h-[12px] appearance-none border border-gray-400 rounded-full cursor-pointer 
                        checked:bg-blue-600 checked:ring-2 checked:ring-blue-300`}
              />
              <p className="text-[13px] font-semibold">Admin</p>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                name="loginRole"
                value="arbitrator"
                className={`w-[12px] h-[12px] appearance-none border border-gray-400 rounded-full cursor-pointer 
                    checked:bg-blue-600 checked:ring-2 checked:ring-blue-300`}
                checked={loginRole === "arbitrator"}
                onChange={handleRoleChange}
              />
              <p className="text-[13px] font-semibold">Arbitrator</p>
            </div>
          </div>
          <div className="w-[200px] grid grid-cols-2 mb-3">
            <div className="flex gap-1  items-center">
              <input
                type="radio"
                name="loginRole"
                value="client"
                className={`w-[12px] h-[12px] appearance-none border border-gray-400 rounded-full cursor-pointer 
                    checked:bg-blue-600 checked:ring-2 checked:ring-blue-300`}
                checked={loginRole === "client"}
                onChange={handleRoleChange}
              />
              <p className="text-[13px] font-semibold">Client</p>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="radio"
                name="loginRole"
                value="respondent"
                className={`w-[12px] h-[12px] appearance-none border border-gray-400 rounded-full cursor-pointer 
                    checked:bg-blue-600 checked:ring-2 checked:ring-blue-300`}
                checked={loginRole === "respondent"}
                onChange={handleRoleChange}
              />
              <p className="text-[13px] font-semibold">Respondent</p>
            </div>
          </div>

          {/* -----------------------forms-------------------- */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-[280px]"
          >
            {loginRole == "respondent" ? (
              <div className="flex flex-col gap-1">
                <label htmlFor="number" className="text-[14px] font-semibold">
                  Account Number
                </label>
                <input
                  className="px-2 py-1 rounded-md placeholder:text-sm"
                  type="text"
                  id="number"
                  placeholder="Enter Account Number"
                />
              </div>
            ) : (
              <>
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
                <div className="flex flex-col gap-1 relative">
                  <label
                    htmlFor="password"
                    className="text-[14px] font-semibold"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between "text" and "password"
                    placeholder="*****"
                    className="px-2 py-1 rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-9 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </>
            )}

            <div className="text-end px-1">
              <p
                onClick={() => navigate("/resetdashboard")}
                className="text-xs font-semibold text-blue-700 cursor-pointer"
              >
                Forgot Password?
              </p>
            </div>
            <div className="flex justify-center mt-4">
              <input
                type="submit"
                value="Login"
                className="w-[95%] py-[4px] bg-[#0F2D6B] font-semibold text-white rounded-md cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2 justify-center px-3 mt-1">
              <div className="w-[45%] h-[1.5px] bg-gray-600 rounded-full"></div>
              <p className="text-sm font-semibold mt-[-5px]">or</p>
              <div className="w-[45%] h-[1.5px] bg-gray-600 rounded-full"></div>
            </div>

            <p className="text-xs font-semibold text-center">
              Dont Have an Account?{" "}
              <span className="text-blue-800 font-semibold cursor-pointer"
              onClick={()=>navigate("/register")}
              >
                Register here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
