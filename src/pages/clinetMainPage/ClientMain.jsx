import DashboardHeader from "@/components/dashboardHeader";
import React from "react";
import { LuUser } from "react-icons/lu";

const ClientMain = () => {
  return (
    <div className="min-h-screen bg-[#012061]">
      <div className="max-w-6xl px-6 py-2 m-auto overflow-x-hidden">
        <div className="bg-[#0f2d6b] ml-10 md:ml-0 flex justify-between items-center rounded-md shadow-sm py-2 px-4 mt-2 md:mt-0">
          <h2 className="font-semibold text-white">Dashboard</h2>
          <div>
            <div className="bg-blue-50 p-3 rounded-full">
              <LuUser className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>
        <DashboardHeader />
      </div>
    </div>
  );
};

export default ClientMain;
