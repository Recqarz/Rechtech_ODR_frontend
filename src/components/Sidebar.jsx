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
  console.log(role);

  const handleArbitratorPage = () => {
    setIsSidebarOpen(false);
    if (role === "admin") {
      navigate("/arbitratortable");
    } else {
      toast.error("You are not authorized");
    }
  };

  const handleLogoutFunc = () => {
    localStorage.removeItem("rechtechrole");
    localStorage.removeItem("rechtechtoken");
    sessionStorage.removeItem("rechtechrole");
    sessionStorage.removeItem("rechtechtoken");
    dispatch(loginUpdater(false));
    dispatch(updateRole(""));
    navigate("/");
  };

  const AllArbitratorfunc = () => {
    setIsSidebarOpen(false);
    navigate("/client/allarbitrator");
  };

  const closeMenu = () => {
    setIsSidebarOpen(false);
    setIsUsersOpen(false);
    if (role === "admin") {
      navigate("/admin/admindashboard/documents");
    } else if (role === "arbitrator") {
      navigate("/arbitrator/arbitratordashboard/documents");
    } else if (role === "client") {
      navigate("/client/clientdashboard/documents");
    }else if(role==="respondent"){
      navigate("/respondent/respondentdashboard/documents")
    }
  };

  return (
    <>
      {/* Hamburger Menu Button - Improved mobile responsiveness */}
      <button
        className="z-50 fixed top-5 left-3 p-2 rounded-lg bg-blue-50 shadow-lg md:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Menu"
      >
        {isSidebarOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Overlay for mobile menu */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <div className="z-40 flex flex-col h-screen">
        <div className="flex flex-1 overflow-y-auto">
          <aside
            className={`
              fixed md:static top-0 left-0 w-52  bg-blue-50 shadow-lg flex flex-col justify-between h-full
              transition-transform duration-300 ease-in-out z-40 custom-scroll
              ${
                isSidebarOpen
                  ? "translate-x-0"
                  : "-translate-x-full md:translate-x-0"
              }
            `}
          >
            <div className="flex-1 overflow-y-auto">
              <Link
                to={
                  role == "arbitrator"
                    ? "/arbitrator"
                    : role == "client"
                    ? "/client"
                    : role == "respondent"
                    ? "/respondent"
                    : "/admin"
                }
              >
                <h1
                  className="px-6 mt-6 md:mt-4 font-bold text-2xl cursor-pointer text-center md:text-left"
                  onClick={closeMenu}
                >
                  Sandhee
                </h1>
              </Link>

              <ul className="p-4 space-y-1 mt-5">
                <Link
                  to={
                    role == "arbitrator"
                      ? "/arbitrator"
                      : role == "client"
                      ? "/client"
                      : role == "respondent"
                      ? "/respondent"
                      : "/admin"
                  }
                >
                  <li
                    onClick={closeMenu}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors"
                  >
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

                {role === "client" && role !== "respondent" ? (
                  <li
                    className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg cursor-pointer transition-colors"
                    onClick={AllArbitratorfunc}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">👥</span>
                      All Arbitrator
                    </div>
                  </li>
                ) : null}

                {isUsersOpen && (
                  <div className="ml-8 space-y-1">
                    <li
                      className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-blue-100 rounded-lg transition-colors"
                      onClick={handleArbitratorPage}
                    >
                      Arbitrator
                    </li>
                    <Link to="/clienttable">
                      <li
                        onClick={closeMenu}
                        className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-blue-100 rounded-lg transition-colors"
                      >
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
                      : role == "client"
                      ? "/client/cases"
                      : "/respondent/cases"
                  }
                >
                  <li
                    onClick={closeMenu}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <span className="mr-3">📁</span>
                    Cases
                  </li>
                </Link>

                {role !== "respondent" ? (
                  <li
                    onClick={closeMenu}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <span className="mr-3">📅</span>
                    Meetings
                  </li>
                ) : null}

                <li
                  onClick={closeMenu}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <span className="mr-3">📄</span>
                  Documents
                </li>

                {role !== "respondent" ? (
                  <li
                    onClick={closeMenu}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <span className="mr-3">🎫</span>
                    Tickets
                  </li>
                ) : null}

                {role !== "respondent" ? (
                  <li
                    onClick={closeMenu}
                    className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <span className="mr-3">📞</span>
                    Consultation Requests
                  </li>
                ) : null}
              </ul>
            </div>

            {/* Bottom Section */}
            <div className="p-4 border-t border-blue-100">
              <ul className="space-y-2">
                <li
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                  onClick={closeMenu}
                >
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
