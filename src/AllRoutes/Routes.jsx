import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

import AdminDashboard from "@/pages/AdminDashboard/AdminDashboard";
import AddArbitrator from "@/pages/AdminDashboard/ArbitratorDashboard/addArbitrator";
import ArbitratorDashboard from "@/pages/AdminDashboard/ArbitratorDashboard/ArbitratorDashboard";
import AddClient from "@/pages/AdminDashboard/ClientDashboard/addClient";
import ClientDashboard from "@/pages/AdminDashboard/ClientDashboard/ClientDashboard";
import DefaulterPage from "@/pages/AdminDashboard/UploadCases/defaulter/[caseid]";
import Uploadcase from "@/pages/AdminDashboard/UploadCases/Uploadcase";
import ArbitratorMain from "@/pages/arbitratorMainPage/ArbitratorMain";
import ArbitratorCases from "@/pages/arbitratorMainPage/ArbitratorCases";
import ClientCases from "@/pages/clinetMainPage/ClientCases";
import ClientMain from "@/pages/clinetMainPage/ClientMain";
import AllArbitrator from "@/pages/clinetMainPage/AllArbitrator";

const Allroutes = () => {
  return (
    <div className="flex w-full">
      <div className="fixed top-0 left-0">
        <Sidebar />
      </div>
      <div className="flex-1 md:ml-52">
        <Routes>
          <Route path="/client" element={<ClientMain />} />
          <Route path="/client/cases" element={<ClientCases />} />
          <Route path="/client/allarbitrator" element={<AllArbitrator />} />

          <Route path="/arbitrator" element={<ArbitratorMain />} />
          <Route path="/arbitrator/cases" element={<ArbitratorCases />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/clienttable" element={<ClientDashboard />} />
          <Route path="/arbitratortable" element={<ArbitratorDashboard />} />
          <Route path="/arbitrator/addarbitrator" element={<AddArbitrator />} />
          <Route path="/client/addclient" element={<AddClient />} />
          <Route path="/admin/cases" element={<Uploadcase />} />
          <Route path="/defaulter/:caseid" element={<DefaulterPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default Allroutes;
