import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPrivate = (props) => {
  const { Component } = props;
  let navigate = useNavigate();
  let islogin = useSelector((state) => state.isLogin);
  let role = useSelector((state)=>state.role)
  useEffect(() => {
    if (islogin) {
      navigate(`/${role}`);
    }
  }, [navigate, islogin,role]);
  return <Component />;
};

export default LoginPrivate;
