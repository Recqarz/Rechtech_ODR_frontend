import { updateRole } from "@/global/action";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [client, setClient] = useState(true);
  let navigate = useNavigate();
  let dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    let obj = {
      emailId: e.target[0].value,
      password: e.target[1].value,
    };
    axios
      .post("http://localhost:3000/auth/login", obj)
      .then((res) => {
        localStorage.setItem("rechtechtoken", JSON.stringify(res.data.token));
        toast.success("Login successful");
        dispatch(updateRole(res.data.role));
        localStorage.setItem("rechtechrole", JSON.stringify(res.data.role));
        navigate(`/${res.data.role}`);
      })
      .catch((err) => {
        toast.error("Invalid email or password");
      });
  }

  return (
    <div className="flex justify-center lg:justify-between p-[34px] min-h-[100vh] min-w-[100vw] bg-[#d4e1ea]">
      <div className="max-h-[480px] relative w-[400px] shadow-lg flex flex-col items-center  px-12 py-4 rounded-3xl bg-white bg-opacity-60">
        <h2 className="text-2xl font-bold mb-7">
          {client ? "Login" : "Admin Login"}
        </h2>
        <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              className="px-2 py-1 rounded-md placeholder:text-sm"
              type="email"
              id="email"
              placeholder="Enter email"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="*****"
              className="px-2 py-1 rounded-md"
            />
          </div>
          <div className="text-end px-1">
            <p
              onClick={() => navigate("/resetdashboard")}
              className="text-sm text-blue-700 cursor-pointer"
            >
              Forgot Password?
            </p>
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="submit"
              value="Login"
              className="px-12 py-[6px] bg-black text-white rounded-md cursor-pointer"
            />
          </div>
        </form>
        <div className="absolute bottom-6">
          <h2 className="text-lg font-semibold text-gray-500">
            Login as the{" "}
            <span
              className="text-lg font-semibold text-blue-700 cursor-pointer"
              onClick={() => setClient(!client)}
            >
              {client ? "Admin" : "Client"}
            </span>
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
