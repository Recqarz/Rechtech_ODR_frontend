import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpcomingMeetingsClient = () => {
  const [meetings, setMeetings] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);

  const timeSlotsForNotMeeting = [
    { label: "10 AM", hour: 10 },
    { label: "11 AM", hour: 11 },
    { label: "12 PM", hour: 12 },
    { label: "1 PM", hour: 13 },
  ];

  useEffect(() => {
    getTodayMeetData();
  }, []);

  const getTodayMeetData = async () => {
    let token = localStorage.getItem("rechtechtoken");
    if (!token) {
      toast.error("Please login again");
      localStorage.removeItem("rechtechtoken");
      localStorage.removeItem("rechtechrole");
      navigate("/");
      return;
    }
    let tokens = JSON.parse(localStorage.getItem("rechtechtoken"));
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASEURL}/webex/recent-meetings/client`,
        {
          headers: { token: tokens },
        }
      );
      const meetingData = res.data.data;
      setMeetings(meetingData);
      generateTimeSlots(meetingData);
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const generateTimeSlots = (meetingData) => {
    // Extract meeting times and determine min and max hours
    const times = meetingData.map((meeting) => {
      const [time, period] = meeting.time.split(" ");
      const [hours] = time.split(":").map(Number);
      return period === "PM" ? (hours % 12) + 12 : hours; // Convert to 24-hour format
    });

    const minHour = Math.min(...times);
    const maxHour = Math.max(...times);

    // Generate time slots for the range
    const slots = [];
    for (let hour = minHour; hour <= maxHour; hour++) {
      const label =
        hour < 12 ? `${hour} AM` : `${hour === 12 ? 12 : hour - 12} PM`;
      slots.push({ label, hour });
    }
    setTimeSlots(slots);
  };

  const handleRedirectMeetLink = (link) => {
    window.open(link);
  };

  // Filter time slots to only include those with meetings
  const filteredTimeSlots = timeSlots.filter((slot) =>
    meetings.some((meeting) => {
      const [time, period] = meeting.time.split(" ");
      const [hours] = time.split(":").map(Number);
      const meetingHour = period === "PM" ? (hours % 12) + 12 : hours; // Convert to 24-hour format
      return meetingHour === slot.hour;
    })
  );



  return (
    <div className="p-4 shadow-2xl bg-[#0f2d6b] text-white rounded-md mt-4 lg:mt-0">
    <h1 className="text-lg font-bold mb-4 text-white">Upcoming Meetings</h1>
    <div className="grid grid-cols-5 gap-4 max-w-xl  ">
      {filteredTimeSlots.length > 0
        ? filteredTimeSlots.map((slot, index) => (
            <div
              key={index}
              className="relative border-l h-[280px] border-gray-300"
            >
              <div className="text-center text-sm md:text-md">
                {slot.label}
              </div>
              {meetings
                .filter((meeting) => {
                  const [time, period] = meeting.time.split(" ");
                  const [hours, minutes] = time.split(":").map(Number);
                  const meetingHour =
                    period === "PM" ? (hours % 12) + 12 : hours; // Convert to 24-hour format
                  return meetingHour === slot.hour;
                })
                .map((meeting, index) => {
                  const [hours, minutes] = meeting.time
                    .split(":")
                    .map(Number);
                  const isPM = meeting.time.includes("PM");
                  const meetingHour = isPM ? (hours % 12) + 12 : hours; // Convert to 24-hour format

                  // Calculate top position based on meeting time
                  const topPosition =
                    (meetingHour - filteredTimeSlots[0].hour) * 60 +
                    (minutes === 30 ? 30 : 0);

                  // Add a vertical gap for overlapping meetings
                  const verticalOffset = index * 50; // Adjust the gap size as needed

                  return (
                    <div
                      key={meeting.id}
                      className="absolute bg-white text-black px-2 py-1 rounded shadow mt-10 max-h-8"
                      style={{
                        top: `${verticalOffset}px`,
                        left: "10%",
                        width: "43px",
                      }}
                      onClick={() => handleRedirectMeetLink(meeting.link)}
                    >
                      <p className="text-[6.5px] lg:text-[6px] cursor-pointer">
                        {meeting.title}
                      </p>
                    </div>
                  );
                })}
            </div>
          ))
        : timeSlotsForNotMeeting.map((slot) => (
            <div
              key={slot.label}
              className="border-l h-[280px] border-gray-300"
            >
              <div className="text-center text-sm md:text-md">
                {slot.label}
              </div>
            </div>
          ))}
    </div>
  </div>
  )
}

export default UpcomingMeetingsClient
