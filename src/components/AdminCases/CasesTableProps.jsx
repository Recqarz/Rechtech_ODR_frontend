import React from "react";
import styles from "../ArbitratorUserTable/TableProps.module.css";

const CasesTableProps = ({
  checkbox,
  cl_name,
  cl_number,
  res_name,
  res_num,
  dispute_type,
  file,
  attachment,
  arbitrator,
  isClickedForMultiple
}) => {
  return (
    <div className={`grid mt-1 rounded-md ${isClickedForMultiple ? "grid-cols-[40px,1fr,70px,50px]" : "grid-cols-[1fr,70px,60px]"} ${isClickedForMultiple ? "md:grid-cols-[40px,1fr,1fr,80px,60px]" : "md:grid-cols-[1fr,1fr,80px,80px]"}  text-sm text-white gap-4 px-2 py-2 ${isClickedForMultiple ? "lg:grid-cols-[40px,1fr,1fr,180px,50px,100px,60px,60px]" : "lg:grid-cols-[1fr,1fr,180px,50px,100px,60px,60px]"} ${isClickedForMultiple ? "xl:grid-cols-[40px,1fr,1fr,1fr,1fr,1fr,1fr,1fr]" : "xl:grid-cols-[1fr,1fr,1fr,1fr,1fr,1fr,1fr]"} shadow-lg bg-[#0f2d6b]`}>
      {/* <p className="truncate">{checkbox}</p> */}
      <p className={`truncate ${isClickedForMultiple ? "block" : "hidden"}`}>{checkbox}</p>
      <p className="truncate">{cl_name}</p>
      <p className="truncate hidden lg:block">{cl_number}</p>
      <p className="truncate hidden md:block">{res_name}</p>
      <p className="truncate hidden lg:block">{dispute_type}</p>
      <p className="truncate hidden lg:block">{file}</p>
      <p className={`truncate`}>{attachment} </p>
      <p className="truncate">
        {arbitrator}
      </p>
    </div>
  );
};

export default CasesTableProps;
