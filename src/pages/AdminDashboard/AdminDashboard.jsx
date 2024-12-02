import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LuUser } from "react-icons/lu";

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

        <div className="px-6 m-auto mt-4 grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-2">
            <div className="w-[150px] md:w-[200px] h-[80px] border-[1.5px] border-black bg-blue-100 rounded-2xl flex items-center">
                <div className="h-[40px] w-[40px] rounded-full bg-blue-300 ml-2">
                </div>
                <div className="ml-4 md:ml-8 text-center">
                  <h4 className="text-md font-semibold mb-0">Arbitrator</h4>
                  <h2 className="text-lg font-bold">60</h2>
                </div>
            </div>
            <div className="w-[150px] md:w-[200px] h-[80px] border-[1.5px] border-black bg-blue-100 rounded-2xl flex items-center">
                <div className="h-[40px] w-[40px] rounded-3xl bg-[#6be5e8] ml-2">
                </div>
                <div className="ml-4 md:ml-8 text-center">
                  <h4 className="text-md font-semibold mb-0 ">Clients</h4>
                  <h2 className="text-lg font-bold">8+</h2>
                </div>
            </div>
            <div className="w-[150px] md:w-[200px] h-[80px] border-[1.5px] border-black bg-blue-100 rounded-2xl flex items-center">
                <div className="h-[40px] w-[40px] rounded-3xl bg-blue-300 ml-2">
                </div>
                <div className="ml-4 md:ml-8 text-center">
                  <h4 className="text-md font-semibold mb-0 ">Meeting held</h4>
                  <h2 className="text-lg font-bold">70+</h2>
                </div>
            </div>
            <div className="w-[150px] md:w-[200px] h-[80px] border-[1.5px] border-black bg-blue-100 rounded-2xl flex items-center">
                <div className="h-[40px] w-[40px] rounded-3xl bg-[#6be5e8] ml-2">
                </div>
                <div className="ml-4 md:ml-8 text-center">
                  <h4 className="text-md font-semibold mb-0 ">Awards</h4>
                  <h2 className="text-lg font-bold">5+</h2>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
