// import React, { useEffect, useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction"; // For click events

// // FullCalendar CSS imports
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

// import axios from "axios";
// import toast from "react-hot-toast";

// const CalendarApp = () => {
//   const [data, setData] = useState([]);

//   // Fetch meeting data
//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_API_BASEURL}/cases/calendar/meetingofcurrentmonth`)
//       .then((response) => setData(response.data.data))
//       .catch((error) => toast.error("Something went wrong"));
//   }, []);

//   const events = data.map((item) => ({
//     title: `Meeting: ${item.caseId}`,
//     start: item.meetings.start,
//     end: item.meetings.end,
//     url: item.meetings.webLink, // Clicking event links to the web meeting
//   }));

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
//         Monthly Meetings
//       </h1>
//       <div className="bg-white shadow-md rounded-lg p-4">
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           initialView="dayGridMonth"
//           events={events} // Pass events to calendar
//           headerToolbar={{
//             start: "prev,next today", // Navigation buttons
//             center: "title", // Title (Month and Year)
//             end: "dayGridMonth,timeGridWeek,timeGridDay", // View selectors
//           }}
//           eventClick={(info) => {
//             info.jsEvent.preventDefault();
//             if (info.event.url) {
//               window.open(info.event.url, "_blank"); // Open the meeting link in a new tab
//             }
//           }}
//           nowIndicator // Show current date indicator
//         />
//       </div>
//     </div>
//   );
// };

// export default CalendarApp;
