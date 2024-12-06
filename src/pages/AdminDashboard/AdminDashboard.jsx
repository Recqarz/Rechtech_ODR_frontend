import DashboardHeader from "@/components/dashboardHeader";
import { LuUser } from "react-icons/lu";
import ArbitratorStatus from "./ArbitratorStatus";
import UpcomingMeetingCalenderDay from "./UpcomingMeetingCalenderDay";

import LineChartComponent from "./chart";
import RecentMeetings from "./RecentMeetings";

const AdminDashboard = () => {
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
        <div className="px-2 mt-8 lg:flex justify-between ">
          <LineChartComponent />
          <UpcomingMeetingCalenderDay />
        </div>

        <div className="lg:flex justify-between mb-4">
          <RecentMeetings />
          <div className="hidden lg:block">
            <ArbitratorStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
