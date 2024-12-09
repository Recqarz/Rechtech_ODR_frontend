import DashboardHeader from "@/components/dashboardHeader";
import React from "react";
import { LuUser } from "react-icons/lu";

const ClientMain = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl px-6 py-2 m-auto overflow-x-hidden">
        <div className="ml-10 md:ml-0 flex justify-between items-center bg-white rounded-md shadow-sm py-2 px-4 mt-2 md:mt-0">
          <h2 className="font-semibold">Dashboard</h2>
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
