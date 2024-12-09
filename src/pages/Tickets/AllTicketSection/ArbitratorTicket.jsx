import React, { useState } from 'react'
import RaiseTicketProps from '../RaiseTicketProps'

const ArbitratorTicket = () => {
  const [formData, setFormData] = useState({
    ticketID: "",
    arbitrator_name: "",
    arbitrator_Number: "",
    arbitrator_email: "",
    arbitrator_category: "",
    arbitrator_currentTime: "",
   arbitrator_query: "",
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
        name={formData.arbitrator_name}
        contactNum={formData.arbitrator_Number}
        email={formData.arbitrator_email}
        category={formData.arbitrator_category}
        currentDate={formData.arbitrator_currentTime}
        query={formData.arbitrator_query}
        handleChange={handleChange}
        handleAddNewTicket={handleAddNewTicket}
      />
    </div>
  )
}

export default ArbitratorTicket
