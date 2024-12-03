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
  handleOpen
}) => {

  return (
    <tbody>
      <tr className={styles.trbody}>
        <td data-label="ID">{id_body}</td>
        <td data-label="Name">{name_body}</td>
        <td data-label="Contact No." className={styles.number}>
          {number_body}
        </td>
        <td data-label="Email ID">{email_body}</td>
        <td data-label="No. of assign Case">{noOfAssginCases_body}</td>
        <td data-label="address">{address_body}</td>
        <td
          data-label="Status"
          className={`${
            status_body == "Active" ? styles.status : styles.status2
          }`}
        >
          {status_body}
        </td>
        <td data-label="Action" onClick={handleOpen}>
          {action_body}
        </td>
      </tr>
    </tbody>
  );
};

export default TableProps;
