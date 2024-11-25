import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

const Webex = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get("code");
    console.log(code);

    if (code) {
      axios
        .post("http://localhost:3000/webex/initialize-token", { code })
        .then((response) => {
          toast.success("Token generated successfully");
        })
        .catch((error) => {
          toast.error("Failed to generate token");
        });
    }
  }, []);

  return <h1>Processing OAuth Callback...</h1>;
};

export default Webex;
