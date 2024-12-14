import DashboardHeaderArbitrator from "./DashboardHeaderArbitrator";
import { LuUser } from "react-icons/lu";
import RecentMeetings from "../AdminDashboard/RecentMeetings";
import ArbitratorStatus from "../AdminDashboard/ArbitratorStatus";
import LineChartComponentArbitrator from "./arbitratorChart";
import UpcomingMeetingCalendarDayArbitrator from "./upcomingMeetingArbitrator";
import RecentMeetingsArbitrator from "./RecentMeetingsarbitrator";

const ArbitratorMain = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl px-6 py-2 m-auto overflow-x-hidden">
        <div className="ml-10 md:ml-0 flex justify-between items-center shadow-2xl bg-[#0f2d6b] rounded-md py-2 px-4 mt-1 md:mt-0">
          <h2 className="font-semibold text-white cursor-pointer">Dashboard</h2>
          <div>
            <div className="bg-blue-50 p-2 md:p-3 rounded-full">
              <LuUser className="text-blue-600 text-md md:text-xl" />
            </div>
          </div>
        </div>

        <DashboardHeaderArbitrator />
        <div className="px-2 mt-8 lg:flex justify-between ">
          <LineChartComponentArbitrator />
          <UpcomingMeetingCalendarDayArbitrator />
        </div>

        <div className="lg:flex justify-between mb-4">
          <RecentMeetingsArbitrator />
          <div className="hidden lg:block">
            <ArbitratorStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArbitratorMain;
