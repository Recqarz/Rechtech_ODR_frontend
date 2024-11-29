// import React from "react";
import { useState } from "react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUpdater, updateRole } from "@/global/action";

const Sidebar = () => {
  let dispatch = useDispatch();
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const role = useSelector((state) => state.role);

  const handleArbitratorPage = () => {
    if (role === "admin") {
      navigate("/arbitratortable");
    } else {
      toast.error("You are not authorized");
    }
  };

  const handleLogoutFunc = () => {
    // console.log("logout");
    localStorage.removeItem("rechtechrole");
    localStorage.removeItem("rechtechtoken");
    dispatch(loginUpdater(false));
    dispatch(updateRole(""));
    // localStorage.removeItem("token");
    navigate("/");
  };

  const AllArbitratorfunc = () => {
    navigate("/client/allarbitrator");
  };

  return (
    <>
      {/* Hamburger Menu Button - Only visible on medium and small screens */}
      <button
        className="fixed top-6 left-4 p-2 rounded-lg bg-blue-50 shadow-lg md:hidden z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars 
        // style={{marginTop:"10px"}}

        />}
      </button>

      <div className="flex flex-col min-h-screen z-40">
        <div className="flex flex-1 overflow-hidden bg-blue-50">
          <aside
            className={`
            fixed w-52 bg-blue-50 shadow-lg flex flex-col justify-between h-auto
            transition-transform duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full md:translate-x-0"
            }
          `}
          >
          
            <div className="flex-1">
              <h1 className="px-8 mt-6 ml-5 md:ml-1 lg:ml-0 font-bold text-2xl">
                Sandhee
              </h1>

              <ul className="p-4 space-y-0 mt-5">
                <Link
                  to={
                    role == "arbitrator"
                      ? "/arbitrator"
                      : role == "client"
                      ? "/client"
                      : "/admin"
                  }
                >
                  <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors">
                    <span className="mr-3">📊</span>
                    Dashboard
                  </li>
                </Link>

                {role === "admin" ? (
                  <li
                    className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors"
                    onClick={() => setIsUsersOpen(!isUsersOpen)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">👥</span>
                      Users
                    </div>
                  </li>
                ) : null}
                {role === "client" ? (
                  <li className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors">
                    <div
                      className="flex items-center"
                      onClick={AllArbitratorfunc}
                    >
                      <span className="mr-3">👥</span>
                      All Arbitrator
                    </div>
                  </li>
                ) : null}

                {isUsersOpen && (
                  <div className="ml-8 space-y-1">
                    {/* <Link to="/arbitratortable"> */}
                    <li
                      className="cursor-pointer flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-blue-100 rounded-lg transition-colors"
                      onClick={handleArbitratorPage}
                    >
                      Arbitrator
                    </li>
                    {/* </Link> */}
                    <Link to="/clienttable">
                      <li className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-blue-100 rounded-lg transition-colors">
                        Client
                      </li>
                    </Link>
                  </div>
                )}

                <Link
                  to={
                    role === "admin"
                      ? "/admin/cases"
                      : role === "arbitrator"
                      ? "/arbitrator/cases"
                      : "/client/cases"
                  }
                >
                  <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors">
                    <span className="mr-3">📁</span>
                    Cases
                  </li>
                </Link>

                <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors">
                  <span className="mr-3">📅</span>
                  Meetings
                </li>
                <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors">
                  <span className="mr-3">📄</span>
                  Documents
                </li>
                <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors">
                  <span className="mr-3">🎫</span>
                  Tickets
                </li>
                <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors">
                  <span className="mr-3">📞</span>
                  Consultation Requests
                </li>
              </ul>
            </div>

            {/* Bottom Section */}

            <div className="p-4 border-blue-100">
              <ul
                className={`space-y-2 border-t`}
              >
                <li className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors">
                  <span className="mr-3">⚙️</span>
                  Settings
                </li>
                <li
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  onClick={handleLogoutFunc}
                >
                  <span className="mr-3">🚪</span>
                  Log out
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
