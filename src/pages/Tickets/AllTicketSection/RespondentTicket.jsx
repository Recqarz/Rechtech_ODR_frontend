import React, { useEffect, useState } from "react";
import RaiseTicketProps from "../RaiseTicketProps";
import axios from "axios";
import toast from "react-hot-toast";

const RespondentTicket = () => {
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/tickets/new-ticketId`)
      .then((res) => {
        setFormData({ ...formData, ticketId: res.data.ticketId });
      })
      .catch((err) => {
        toast.error("Error fetching new ticket ID:");
      });
  }, []);

  const [formData, setFormData] = useState({
    ticketId: "",
    name: "",
    contactNumber: "",
    email: "",
    category: "",
    query: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddNewTicket = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.contactNumber ||
      !formData.email ||
      !formData.category ||
      !formData.query
    ) {
      toast.error("All fields are required.");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_API_BASEURL}/tickets/new-ticket`, formData)
      .then((res) => {
        toast.success("Ticket raised successfully!");
        setFormData({
          ticketId: "",
          name: "",
          contactNumber: "",
          email: "",
          category: "",
          query: "",
        });
      })
      .catch((err) => {
        toast.error("Error raising ticket:");
      });
  };

  return (
    <div className="px-2 mt-20 md:mt-0">
      <RaiseTicketProps
        ticketId={formData.ticketId}
        name={formData.name}
        contactNum={formData.contactNumber}
        email={formData.email}
        category={formData.category}
        query={formData.query}
        handleChange={handleChange}
        handleAddNewTicket={handleAddNewTicket}
      />
    </div>
  );
};

export default RespondentTicket;
