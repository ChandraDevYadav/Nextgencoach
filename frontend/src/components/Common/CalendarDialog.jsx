import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoClose } from "react-icons/io5";

const CalendarDialog = ({ title = "Calendar", sessions = [], onClose }) => {
  const sessionDates = sessions.map((s) => new Date(s.date));

  const tileClassName = ({ date, view }) => {
    if (
      view === "month" &&
      sessionDates.some((d) => d.toDateString() === date.toDateString())
    ) {
      return "highlight-session";
    }
    return "";
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <IoClose className="text-2xl" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {title}
        </h2>

        <Calendar
          tileClassName={tileClassName}
          className="mx-auto rounded-lg border-none shadow-sm"
        />

        {/* Session List */}
        <ul className="mt-6 space-y-3 text-sm">
          {sessions.length > 0 ? (
            sessions.map((s, i) => (
              <li
                key={i}
                className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="font-medium text-gray-700">
                  {new Date(s.date).toLocaleDateString()}
                </span>
                <span className="text-gray-600">{s.title}</span>
              </li>
            ))
          ) : (
            <li className="text-center text-gray-500">
              No sessions scheduled.
            </li>
          )}
        </ul>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white font-medium shadow-md hover:brightness-110 transition"
          >
            Close
          </button>
        </div>
      </div>

      <style>{`
        .highlight-session {
          background: linear-gradient(to right, #33c9a7, #3ba7f5);
          color: white;
          border-radius: 8px;
          padding: 5px;
        }

        .react-calendar {
          border: none;
          width: 100%;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CalendarDialog;
