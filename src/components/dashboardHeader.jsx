import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaUserGraduate } from "react-icons/fa";
import { CgOrganisation } from "react-icons/cg";
import { TbAwardFilled } from "react-icons/tb";

const DashboardHeader = () => {
  const navigate = useNavigate();

  let [arbitrator, setArbitrator] = useState("");
  let [client, setClient] = useState("");
  let [cases, setCases] = useState("");
  let [awards, setAwards]=useState("");
  console.log("awards", arbitrator, client, cases, awards)

  const role = useSelector((state) => state.role);

  function fetchData() {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/global/counts`)
      .then((response) => {
        console.log(response.data)
        setArbitrator(response.data.arbitrators);
        setClient(response.data.clients);
        setCases(response.data.cases);
        setAwards(response.data.awards);
      })
      .catch((error) => {
        toast.error("Failed to fetch data");
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  //redirect to arbitrator
  const handleRedirectToArbitrator = () => {
    if (role == "admin") {
      navigate("/arbitratortable");
    } else if (role == "client") {
      navigate("/client/allarbitrator");
    }
  };

  //redirect to cases
  const handleRedirectToCases = () => {
    if (role == "admin") {
      navigate("/admin/cases");
    } else if (role == "client") {
      navigate("/client/cases");
    } else if (role == "arbitrator") {
      navigate("/arbitrator/cases");
    } else if (role == "respondent") {
      navigate("/respondent/cases");
    }
  };

  //redirect to client
  const handleRedirectToClient = () => {
    if (role == "admin") {
      navigate("/clienttable");
    }
  };

  return (
    <div className="px-6 m-auto mt-4 grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-3">
      <div
        className="w-[140px] md:w-[180px] xl:w-[200px] h-[80px] shadow-2xl bg-[#0f2d6b] rounded-2xl flex items-center cursor-pointer"
        onClick={handleRedirectToArbitrator}
      >
        <div className="h-[40px] w-[40px] rounded-full bg-blue-300 ml-2 flex justify-center items-center">
        <FaUserGraduate className=""/>
        </div>
        <div className="ml-3 md:ml-8 text-center text-white">
          <h4 className="text-md font-semibold mb-0">Arbitrator</h4>
          <h2 className="text-lg font-bold">{arbitrator}+</h2>
        </div>
      </div>
      <div
        className="w-[140px] md:w-[180px] xl:w-[200px] h-[80px] shadow-2xl bg-[#0f2d6b] rounded-2xl flex items-center cursor-pointer"
        onClick={handleRedirectToClient}
      >
        <div className="h-[40px] w-[40px] rounded-full bg-[#6be5e8] ml-2 flex justify-center items-center">
        <CgOrganisation />
        </div>
        <div className="ml-4 md:ml-8 text-center text-white">
          <h4 className="text-md font-semibold mb-0 ">Clients</h4>
          <h2 className="text-lg font-bold">{client}+</h2>
        </div>
      </div>
      <div
        className="w-[140px] md:w-[180px] xl:w-[200px] h-[80px] shadow-2xl bg-[#0f2d6b] rounded-2xl flex items-center cursor-pointer"
        onClick={handleRedirectToCases}
      >
        <div className="h-[40px] w-[40px] rounded-full flex justify-center items-center bg-blue-300 ml-2">
        <FaFileAlt />
        </div>
        <div className="ml-4 md:ml-8 text-center text-white">
          <h4 className="text-md font-semibold mb-0 ">Cases</h4>
          <h2 className="text-lg font-bold">{cases}+</h2>
        </div>
      </div>
      <div className="w-[140px] cursor-pointer md:w-[180px] xl:w-[200px] h-[80px] shadow-2xl bg-[#0f2d6b] rounded-2xl flex items-center">
        <div className="h-[40px] w-[40px] rounded-full bg-[#6be5e8] ml-2  flex justify-center items-center">
        <TbAwardFilled />
        </div>
        <div className="ml-4 md:ml-8 text-center text-white">
          <h4 className="text-md font-semibold mb-0 ">Awards</h4>
          <h2 className="text-lg font-bold">{awards}+</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
