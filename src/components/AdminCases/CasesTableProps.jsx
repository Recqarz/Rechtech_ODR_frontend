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
}) => {
  return (
    <tbody>
      <tr className={styles.trbody}>
        <td data-label="checkbox">{checkbox}</td>
        <td data-label="client name">{cl_name}</td>
        <td data-label="client number">{cl_number}</td>
        <td data-label="res name">{res_name}</td>
        <td data-label="res number">{res_num}</td>
        <td data-label="dispute type">{dispute_type}</td>
        <td data-label="file">{file}</td>
        <td data-label="attachment">{attachment}</td>
        <td data-label="arbitrator">{arbitrator}</td>
      </tr>
    </tbody>
  );
};

export default CasesTableProps;
