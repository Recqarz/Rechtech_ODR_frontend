import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../AdminDashboard/ArbitratorDashboard/ArbitratorDashboard.module.css";
import { FcVideoCall } from "react-icons/fc";
import NoDataFound from "@/components/NoDataFound";

const ClientCases = () => {
  const navigate = useNavigate();
  const [clientOwnData, setClientOwnData] = useState([]);
  let token = JSON.parse(localStorage.getItem("rechtechtoken"));

  const getArbitratorCaseData = () => {
    axios
      .get("http://localhost:3000/uploadcasedata/clientcases", {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setClientOwnData(res.data.caseData);
        console.log("arbitrator",res.data.caseData)
      })
      .catch((err) => {
        toast.error("Something went wrong!");
      });
  };

  useEffect(() => {
    getArbitratorCaseData();
  }, []);

  return (
    <div>
      <div className="w-[90%] mx-auto mt-16">
        {clientOwnData.length>0?<table cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email ID</th>
              <th>File Name</th>
              <th>Uploaded Date</th>
              <th>Arbitrator</th>
              <th>Meeting Status</th>
            </tr>
          </thead>
          {clientOwnData.map((clientcase) => (
            <tbody key={clientcase._id}>
              <tr className={styles.trbody}>
                <td data-label="Name">{clientcase.clientName}</td>
                <td data-label="Email ID">{clientcase.clientEmail}</td>
                <td
                  data-label="File Nmae"
                  className={styles.number}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/defaulter/${clientcase._id}`)}
                >
                  {clientcase.fileName}
                </td>

                <td data-label="No. of assign Case">
                  {clientcase.uploadDate
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("-")}
                </td>

                <td data-label="No. of assign Case">
                  {clientcase.arbitrator?clientcase.arbitrator.split(" ")[0]:"Not assgn"}
                </td>
                <td>
                {
                  clientcase.meetLinks.length>0 ? "Scheduled" : "Not schedule"
                }
                </td>
              </tr>
            </tbody>
          ))}
        </table>:<NoDataFound/>}
      </div>







    </div>
  );
};

export default ClientCases;
