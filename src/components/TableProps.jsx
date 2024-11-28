import React from "react";
import styles from "../pages/AdminDashboard/ArbitratorDashboard/ArbitratorDashboard.module.css";

const TableProps = ({cl_name,cl_number,res_name, res_number, type, file, attach, action}) => {
  return (
    <table cellSpacing="0">
    <thead>
      <tr>
        <th>{cl_name}</th>
        <th>{cl_number}</th>
        <th>{res_name}</th>
        <th>{res_number}</th>
        <th>{type}</th>
        <th>{file}</th>
        <th>{attach}</th>
        <th>{action}</th>
      </tr>
    </thead>
    <tbody>
        <tr className={styles.trbody}>
            <td>cl_name</td>
            <td>cl_number</td>
            <td>res_name</td>
            <td>res_number</td>
            <td>type</td>
            <td>file</td>
            <td>Attachment</td>
            <td>Action</td>
        </tr>
    </tbody>
  </table>
  )
};

export default TableProps;
