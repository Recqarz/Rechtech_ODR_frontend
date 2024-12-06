import DashboardHeader from "@/components/dashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuUser } from "react-icons/lu";
import ArbitratorStatus from "./ArbitratorStatus";
import UpcomingMeetingCalenderDay from "./UpcomingMeetingCalenderDay";
import RecentMeetings from "./RecentMeetings";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl px-6 py-2 m-auto overflow-x-hidden">
        <div className="ml-10 md:ml-0 flex md:justify-between items-center bg-white rounded-md shadow-sm py-2 px-4 mt-2 md:mt-0">
          <div className="flex items-center space-x-2">
            <Input
              className="h-8 w-[200px] md:w-[250px]"
              type="text"
              placeholder="Serach here"
            />
            <Button className="h-8 px-3">Search</Button>
          </div>
          <div className="hidden md:block">
            <div className="bg-blue-50 p-3 rounded-full">
              <LuUser className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <DashboardHeader />

        <UpcomingMeetingCalenderDay />
        <div className="flex flex-col lg:flex-row">
          <RecentMeetings />
          <ArbitratorStatus />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
