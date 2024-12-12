import React, { useEffect, useState } from "react";
import styles from "./TableProps.module.css";
import axios from "axios";

const TableProps = ({
  id_body,
  name_body,
  number_body,
  email_body,
  noOfAssginCases_body,
  address_body,
  status_body,
  action_body,
  handleOpen,
}) => {
  return (
      <div
        className="grid mt-1 rounded-md grid-cols-[60px,1fr,70px,50px] md:grid-cols-[60px,1fr,1fr,70px,50px]   lg:grid-cols-[70px,1fr,1fr,180px,50px,100px,60px,60px] xl:grid-cols-[70px,1fr,1fr,250px,50px,100px,60px,60px] text-sm text-white gap-4 px-2 py-2 shadow-lg bg-[#0f2d6b]"
      >
        <p className="truncate">{id_body}</p>
        <p className="truncate">{name_body}</p>
        <p className="truncate hidden lg:block">{number_body}</p>
        <p className="truncate hidden md:block">{email_body}</p>
        <p className="truncate hidden lg:block">{noOfAssginCases_body}</p>
        <p className="truncate hidden lg:block">{address_body}</p>
        <p className={`truncate ${status_body == "Active" ? "text-green-600" :"text-red-600"}`}>{status_body} </p>
        <p onClick={handleOpen} className="truncate">{action_body}</p>
      </div>
  );
};

export default TableProps;
