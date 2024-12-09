import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Allroutes from "./AllRoutes/Routes";
import Webex from "./pages/webex";
import PrivateRoute from "./components/PrivateRoute";
import LoginPrivate from "./components/LoginPrivate";
import { VerifyOTP } from "./pages/Respondent/respondentotp";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginUpdater, updateRole } from "./global/action";
import Login from "./pages/logins";
import { ResetDashboards } from "./pages/ResetPassword/resetDashboards";
import { ResetOTPS } from "./pages/ResetPassword/ResetOtps";
import { SetPasswords } from "./pages/ResetPassword/SetPasswords";

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
      <Route path="/resetdashboard" element={<ResetDashboards />} />
      <Route path="/resetdashboard/otp" element={<ResetOTPS />} />
      <Route path="/otplogin" element={<VerifyOTP />} />
      <Route path="/resetdashboard/setpassword" element={<SetPasswords />} />
      <Route path="/webexauth" element={<Webex />} />
      <Route path="/logins" element={<Login />} />
      <Route path="/resetdashboards" element={<ResetDashboards />} />
      <Route path="/*" element={<PrivateRoute Component={Allroutes} />} />
    </Routes>
  );
}

export default App;
