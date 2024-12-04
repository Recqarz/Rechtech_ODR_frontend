import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const DashboardHeader = () => {
  let [arbitrator, setArbitrator] = useState("");
  let [client, setClient] = useState("");
  let [cases, setCases] = useState("");
  function fetchData() {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/global/counts`)
      .then((response) => {
        setArbitrator(response.data.arbitrators);
        setClient(response.data.clients);
        setCases(response.data.cases);
      })
      .catch((error) => {
        toast.error("Failed to fetch data");
      });
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="px-6 m-auto mt-4 grid grid-cols-2 lg:grid-cols-4 justify-items-center gap-2">
      <div className="w-[150px] md:w-[200px] h-[80px] border-[1.5px] border-black bg-blue-100 rounded-2xl flex items-center">
        <div className="h-[40px] w-[40px] rounded-full bg-blue-300 ml-2"></div>
        <div className="ml-4 md:ml-8 text-center">
          <h4 className="text-md font-semibold mb-0">Arbitrator</h4>
          <h2 className="text-lg font-bold">{arbitrator}+</h2>
        </div>
      </div>
      <div className="w-[150px] md:w-[200px] h-[80px] border-[1.5px] border-black bg-blue-100 rounded-2xl flex items-center">
        <div className="h-[40px] w-[40px] rounded-3xl bg-[#6be5e8] ml-2"></div>
        <div className="ml-4 md:ml-8 text-center">
          <h4 className="text-md font-semibold mb-0 ">Clients</h4>
          <h2 className="text-lg font-bold">{client}+</h2>
        </div>
      </div>
      <div className="w-[150px] md:w-[200px] h-[80px] border-[1.5px] border-black bg-blue-100 rounded-2xl flex items-center">
        <div className="h-[40px] w-[40px] rounded-3xl bg-blue-300 ml-2"></div>
        <div className="ml-4 md:ml-8 text-center">
          <h4 className="text-md font-semibold mb-0 ">Cases</h4>
          <h2 className="text-lg font-bold">{cases}+</h2>
        </div>
      </div>
      <div className="w-[150px] md:w-[200px] h-[80px] border-[1.5px] border-black bg-blue-100 rounded-2xl flex items-center">
        <div className="h-[40px] w-[40px] rounded-3xl bg-[#6be5e8] ml-2"></div>
        <div className="ml-4 md:ml-8 text-center">
          <h4 className="text-md font-semibold mb-0 ">Awards</h4>
          <h2 className="text-lg font-bold">8+</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
