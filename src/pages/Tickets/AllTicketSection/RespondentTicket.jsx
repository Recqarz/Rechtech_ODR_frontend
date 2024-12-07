import React, { useState } from "react";
import RaiseTicketProps from "../RaiseTicketProps";

const RespondentTicket = () => {
  const [formData, setFormData] = useState({
    ticketID: "",
    respondent_name: "",
    respondent_Number: "",
    respondent_email: "",
    respondent_category: "",
    respondent_currentTime: "",
    respondent_query: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
  };

  const handleAddNewTicket = () => {
    console.log("submit form");
  };

  return (
    <div>
      <RaiseTicketProps
        ticketId={formData.ticketID}
        name={formData.respondent_name}
        contactNum={formData.respondent_Number}
        email={formData.respondent_email}
        category={formData.respondent_category}
        currentDate={formData.respondent_currentTime}
        query={formData.respondent_query}
        handleChange={handleChange}
        handleAddNewTicket={handleAddNewTicket}
      />
    </div>
  );
};

export default RespondentTicket;
