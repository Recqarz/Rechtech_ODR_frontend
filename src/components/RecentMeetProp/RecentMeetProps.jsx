import React, { useEffect, useState } from "react";
import "../GlobalStyling.css";

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
      <tr className="bg-blue-50 border-none">
        <td data-label="case name" className="text-[10px] md:text-sm font-normal">{case_name}</td>
        <td data-label="company name" className="text-[10px] md:text-sm font-normal">{com_name}</td>
        <td data-label="respondent name" className="text-[10px] md:text-sm font-normal">
          {res_name}
        </td>
        <td data-label="time" className="text-[10px] md:text-sm font-normal">{time}</td>
        <td data-label="arb name" className="text-[10px] md:text-sm font-normal">{arb_name}</td>
        <td data-label="setting" className="text-[10px] md:text-sm font-normal"><p>{settings}</p></td>
      </tr>
    </tbody>
  );
};

export default RecentMeetProps;
