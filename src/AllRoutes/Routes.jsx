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
import AddCaseViaForm from "@/pages/AdminDashboard/UploadCases/AddCaseViaForm";
import RespondentDashboard from "@/pages/Respondent/respondentDashboard";
import RespondentCase from "@/pages/Respondent/respondentCases";
import Recordings from "@/pages/arbitratorMainPage/recordings";
import AdminDocumentSec from "@/pages/AdminDashboard/Documents/AllDocsSection/AdminDocumentSec";
import ArbitratorDocumentSec from "@/pages/AdminDashboard/Documents/AllDocsSection/ArbitratorDocumentSec";
import ClientDocumentSec from "@/pages/AdminDashboard/Documents/AllDocsSection/ClientDocumentSec";
import RespondentDocumentSec from "@/pages/AdminDashboard/Documents/AllDocsSection/RespondentDocumentSec";

const Allroutes = () => {
  return (
    <div className="flex w-full bg-gray-50">
      <div className="fixed top-0 left-0 bottom-0 h-[100vh] z-30">
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
          <Route path="/admin/cases/add" element={<AddCaseViaForm />} />
          <Route path="/defaulter/:caseid" element={<DefaulterPage />} />
          <Route path="/respondent" element={<RespondentDashboard />} />
          <Route path="/respondent/cases" element={<RespondentCase />} />
          <Route path="/arbitrator/cases/recordings" element={<Recordings />} />
          <Route
            path="/admin/admindashboard/documents"
            element={<AdminDocumentSec />}
          />

          <Route
            path="/arbitrator/arbitratordashboard/documents"
            element={<ArbitratorDocumentSec />}
          />

          <Route
            path="/client/clientdashboard/documents"
            element={<ClientDocumentSec />}
          />

          <Route
            path="/respondent/respondentdashboard/documents"
            element={<RespondentDocumentSec />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Allroutes;
