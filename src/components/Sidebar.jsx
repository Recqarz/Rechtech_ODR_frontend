import { useState } from "react";
import { FaArrowRight, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginUpdater, updateRole } from "@/global/action";
import { IoMdHome } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { IoBriefcase } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { HiDocument } from "react-icons/hi2";
import { FaTicketSimple } from "react-icons/fa6";
import { MdLiveHelp } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

const Sidebar = () => {
  let dispatch = useDispatch();
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const role = useSelector((state) => state.role);

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

  // Docs Navigation

  const handleDocumentFunc = () => {
    setIsSidebarOpen(false);
    setIsUsersOpen(false);
    if (role === "admin") {
      navigate("/admin/admindashboard/documents");
    } else if (role === "arbitrator") {
      navigate("/arbitrator/arbitratordashboard/documents");
    } else if (role === "client") {
      navigate("/client/clientdashboard/documents");
    } else if (role === "respondent") {
      navigate("/respondent/respondentdashboard/documents");
    }
  };

  // Ticket navigation
  const handleTicketFunc = () => {
    setIsSidebarOpen(false);
    setIsUsersOpen(false);
    if (role === "admin") {
      navigate("/admin/admindashboard/tickets");
    } else if (role === "arbitrator") {
      navigate("/arbitrator/arbitratordashboard/tickets");
    } else if (role === "client") {
      navigate("/client/clientdashboard/tickets");
    } else if (role === "respondent") {
      navigate("/respondent/respondentdashboard/tickets");
    }
  };

  const closeMenu = () => {
    if (role === "admin") {
      navigate("/admin/admindashboard/meetings");
    }
    setIsSidebarOpen(false);
    setIsUsersOpen(false);
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
              fixed md:static top-0 left-0 w-[180px] shadow-lg  bg-[#0f2d6b] flex flex-col justify-between h-full
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
                  className="px-6 mt-5 ml-7 md:ml-5 mb-6 cursor-pointer text-center md:text-left"
                  onClick={closeMenu}
                >
                  <img
                    className="h-[70%] w-[70%]"
                    src="/assets/finallogo.png"
                    alt=""
                  />
                </h1>
              </Link>

              <ul className="px-4 pb-4 space-y-1">
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
                    className="flex items-center px-4 py-[6px] text-white text-[14px] hover:bg-[#0d45b6] rounded-lg transition-colors"
                  >
                    <span className="mr-3">
                      <AiFillHome className="text-[20px]" />
                    </span>
                    Dashboard
                  </li>
                </Link>

                {role === "admin" ? (
                  <li
                    className="flex items-center justify-between px-4 py-[6px] text-white text-[14px] hover:bg-[#0d45b6] rounded-lg cursor-pointer transition-colors"
                    onClick={() => setIsUsersOpen(!isUsersOpen)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">
                        <FaUsers className="text-[20px]" />
                      </span>
                      Users
                    </div>
                  </li>
                ) : null}

                {role === "client" && role !== "respondent" ? (
                  <li
                    className="flex items-center justify-between px-4 py-[6px] text-white text-[14px] hover:bg-[#0d45b6] rounded-lg cursor-pointer transition-colors"
                    onClick={AllArbitratorfunc}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">
                        <FaUsers className="text-[20px]" />
                      </span>
                      All Arbitrator
                    </div>
                  </li>
                ) : null}

                {isUsersOpen && (
                  <div className="ml-8 space-y-1">
                    <li
                      className="flex items-center px-4 py-[6px] cursor-pointer text-sm text-white text-[14px] hover:bg-[#0d45b6] rounded-lg transition-colors"
                      onClick={handleArbitratorPage}
                    >
                      Arbitrator
                    </li>
                    <Link to="/clienttable">
                      <li
                        onClick={closeMenu}
                        className="flex items-center px-4 py-[6px] text-sm text-white text-[14px] hover:bg-[#0d45b6] rounded-lg transition-colors"
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
                    className="flex items-center px-4 py-[6px] text-white text-[14px] hover:bg-[#0d45b6] rounded-lg transition-colors"
                  >
                    <span className="mr-4">
                      <IoBriefcase className="text-[20px]" />
                    </span>
                    Cases
                  </li>
                </Link>

                {role !== "respondent" ? (
                  <li
                    onClick={closeMenu}
                    className="flex cursor-pointer items-center px-4 py-[6px] text-white text-[14px] hover:bg-[#0d45b6] rounded-lg transition-colors"
                  >
                    <span className="mr-4">
                      <FaCalendar className="text-[18px]" />
                    </span>
                    Meetings
                  </li>
                ) : null}

                <li
                  onClick={handleDocumentFunc}
                  className="flex items-center cursor-pointer px-4 py-2 text-white text-[14px] hover:bg-[#0d45b6] rounded-lg transition-colors"
                >
                  <span className="mr-3">
                    <HiDocument className="text-[20px]" />
                  </span>
                  Documents
                </li>

                <li
                  onClick={handleTicketFunc}
                  className="flex items-center cursor-pointer px-4 py-[6px] text-white text-[14px] hover:bg-[#0d45b6] rounded-lg transition-colors"
                >
                  <span className="mr-3">
                    <FaTicketSimple className="text-[18px]" />
                  </span>
                  Tickets
                </li>

                {/* {role !== "respondent" ? (
                  <li
                    onClick={closeMenu}
                    className="flex items-center cursor-pointer px-4 py-[6px] text-white text-[14px] hover:bg-[#0d45b6] rounded-lg transition-colors"
                  >
                    <span className="mr-3">
                      <MdLiveHelp className="text-[20px]" />
                    </span>
                    Requests
                  </li>
                ) : null} */}
              </ul>
            </div>

            {/* Bottom Section */}
            <div className="px-4 py-2 border-t border-blue-100">
              <ul className="space-y-2">
                {/* <li
                  className="flex items-center px-4 py-[6px] text-gray-700 hover:bg-[#0d45b6] rounded-lg transition-colors cursor-pointer"
                  onClick={closeMenu}
                >
                  <span className="mr-3">⚙️</span>
                  Settings
                </li> */}
                <li
                  className="flex items-center px-4 py-[9px] text-white text-[14px] hover:bg-[#0d45b6] rounded-lg transition-colors cursor-pointer"
                  onClick={handleLogoutFunc}
                >
                  <span className="mr-3">
                    <IoLogOut className="text-[22px]" />
                  </span>
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
