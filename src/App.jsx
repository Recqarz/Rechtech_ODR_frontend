import React from "react";
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

function App() {
  return (
    // <div className="flex min-h-[100vh]">
    <Routes>
      <Route path="/" element={<LoginPrivate Component={Login} />} />
      <Route path="/resetdashboard" element={<ResetDashboard />} />
      <Route path="/resetdashboard/otp" element={<ResetOTP />} />
      <Route path="/otplogin" element={<VerifyOTP />} />
      <Route path="/resetdashboard/setpassword" element={<SetPassword />} />
      <Route path="/webexauth" element={<Webex />} />
      <Route path="/*" element={<PrivateRoute Component={Allroutes} />} />
    </Routes>
    // {/* </div> */}
  );
}

export default App;
