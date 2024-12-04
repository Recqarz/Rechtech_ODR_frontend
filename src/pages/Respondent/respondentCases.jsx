import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const RespondentCase = () => {
  const [data, setData] = useState([]);
  function fetchData() {
    let token = JSON.parse(sessionStorage.getItem("rechtechtoken"))
    if (!token) {
      toast.error("You are not logged in");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/cases/allrespondentcases`, {
        headers: {
          "Content-Type": "application/json",
          token: `${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data)
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>This is case page</h2>
    </div>
  );
};

export default RespondentCase;
