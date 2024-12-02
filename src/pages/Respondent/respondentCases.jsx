import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const RespondentCase = () => {
  const [data, setData] = useState([]);
  let role = useSelector((state) => state.role);
  function fetchData() {
    let token = sessionStorage.getItem("rechtechtoken")
      ? sessionStorage.getItem(JSON.parse("rechtechtoken"))
      : null;
    if (!token) {
      toast.error("You are not logged in");
      return;
    }
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/cases/allrespondentcases`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
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
