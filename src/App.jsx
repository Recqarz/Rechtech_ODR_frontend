import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/login";
import { ResetDashboard } from "./pages/ResetPassword/ResetDashboard";
import { ResetOTP } from "./pages/ResetPassword/ResetOTP";
import { SetPassword } from "./pages/ResetPassword/SetPassword";
import Allroutes from "./AllRoutes/Routes";
import Webex from "./pages/webex";
import PrivateRoute from "./components/PrivateRoute";
import LoginPrivate from "./components/LoginPrivate";
import { VerifyOTP } from "./pages/Respondent/respondentotp";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUpdater, updateRole } from "./global/action";

function App() {
  let dispatch = useDispatch();

  const validToken = async () => {
    const token = localStorage.getItem("rechtechtoken")
      ? JSON.parse(localStorage.getItem("rechtechtoken"))
      : sessionStorage.getItem("rechtechtoken")
      ? JSON.parse(sessionStorage.getItem("rechtechtoken"))
      : undefined;
    if (token) {
      axios
        .get(`${import.meta.env.VITE_API_BASEURL}/auth/validatetoken`, {
          headers: {
            token: token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("valid");
        })
        .catch((err) => {
          localStorage.removeItem("rechtechtoken");
          sessionStorage.removeItem("rechtechtoken");
          localStorage.removeItem("rechtechrole");
          sessionStorage.removeItem("rechtechrole");
          dispatch(loginUpdater(false));
          dispatch(updateRole(""));
        });
    }
  };

  useEffect(() => {
    validToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LoginPrivate Component={Login} />} />
      <Route path="/resetdashboard" element={<ResetDashboard />} />
      <Route path="/resetdashboard/otp" element={<ResetOTP />} />
      <Route path="/otplogin" element={<VerifyOTP />} />
      <Route path="/resetdashboard/setpassword" element={<SetPassword />} />
      <Route path="/webexauth" element={<Webex />} />
      <Route path="/*" element={<PrivateRoute Component={Allroutes} />} />
    </Routes>
  );
}

export default App;
