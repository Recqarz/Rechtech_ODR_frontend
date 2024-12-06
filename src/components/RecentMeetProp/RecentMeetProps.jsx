import React, { useEffect, useState } from "react";
import "../GlobalStyling.css";
import { Settings } from "lucide-react";

const RecentMeetProps = ({
  case_name,
  com_name,
  res_name,
  arb_name,
  time,
  settings,
}) => {
  return (
    <tbody>
      <tr className="trbody">
        <td data-label="case name">{case_name}</td>
        <td data-label="company name">{com_name}</td>
        <td data-label="respondent name">
          {res_name}
        </td>
        <td data-label="time">{time}</td>
        <td data-label="arb name">{arb_name}</td>
        <td data-label="setting"><p>{settings}</p></td>
      </tr>
    </tbody>
  );
};

export default RecentMeetProps;
