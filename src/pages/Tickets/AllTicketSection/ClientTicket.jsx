import React, { useState } from "react";
import RaiseTicketProps from "../RaiseTicketProps";

const ClientTicket = () => {
  const [formData, setFormData] = useState({
    ticketID: "",
    client_name: "",
    client_Number: "",
    client_email: "",
    client_category: "",
    client_currentTime: "",
    client_query: "",
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
        name={formData.client_name}
        contactNum={formData.client_Number}
        email={formData.client_email}
        category={formData.client_category}
        currentDate={formData.client_currentTime}
        query={formData.client_query}
        handleChange={handleChange}
        handleAddNewTicket={handleAddNewTicket}
      />
    </div>
  );
};

export default ClientTicket;
