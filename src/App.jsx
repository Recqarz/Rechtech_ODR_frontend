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

function App() {
  return (
    <div className="flex">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPrivate Component={Login}/>}/>
        {/* <Route path="/" element={< />} /> */}
        <Route path="/resetdashboard" element={<ResetDashboard />} />
        <Route path="/resetdashboard/otp" element={<ResetOTP />} />
        <Route path="/resetdashboard/setpassword" element={<SetPassword />} />
        <Route path="/webexauth" element={<Webex />} />
        {/* Aut henticated Routes */}
        <Route path="/*" element={<PrivateRoute Component={Allroutes} />} />
        {/* <Route path="/*" element={<Allroutes />} /> */}
      </Routes>
    </div>
  );
}

export default App;
