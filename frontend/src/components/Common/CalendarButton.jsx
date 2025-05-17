import React, { useState } from "react";
import CalendarDialog from "./CalendarDialog";

const CalendarButton = () => {
  const [open, setOpen] = useState(false);

  const sessions = [
    { title: "Session with Sarah Johnson", date: "2025-05-18T10:00:00" },
    { title: "Check-in with Alex Smith", date: "2025-05-21T14:00:00" },
  ];

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="block w-full px-4 py-2 text-left hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] hover:text-white text-gray-700 cursor-pointer rounded-b-md transition-all duration-300"
      >
        View Full Calendar
      </button>

      {open && (
        <CalendarDialog
          title="Upcoming Coaching Sessions"
          sessions={sessions}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default CalendarButton;
