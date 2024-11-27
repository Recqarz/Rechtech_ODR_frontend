import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import { Login } from "./pages/login";
import { ResetDashboard } from "./pages/ResetPassword/ResetDashboard";
import { ResetOTP } from "./pages/ResetPassword/ResetOTP";
import { SetPassword } from "./pages/ResetPassword/SetPassword";

import Allroutes from "./AllRoutes/Routes";
import Webex from "./pages/webex";

function App() {
  return (
    <div className="flex">

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/resetdashboard" element={<ResetDashboard />} />
        <Route path="/resetdashboard/otp" element={<ResetOTP />} />
        <Route path="/resetdashboard/setpassword" element={<SetPassword />} />
        <Route path="/webexauth" element={<Webex />} />
        {/* Aut henticated Routes */}
        <Route path="/*" element={<Allroutes />} />
      </Routes>
    </div>
  );
}

export default App;
