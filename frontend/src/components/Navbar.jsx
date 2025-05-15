import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaUser,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md px-4 md:px-6 py-3 flex justify-between items-center relative">
      <Link to="/" className="flex items-center z-50">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] flex items-center justify-center mr-3">
          <svg
            width="20"
            height="20"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 0C8.95 0 0 8.95 0 20C0 31.05 8.95 40 20 40C31.05 40 40 31.05 40 20C40 8.95 31.05 0 20 0Z"
              fill="white"
            />
            <path
              d="M28.75 13.75L17.5 25L12.5 20"
              stroke="#33C9A7"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-xl font-bold text-blue-600">NextGen Coach</p>
      </Link>

      <div className="md:hidden z-50" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <FaTimes className="text-2xl text-gray-700" />
        ) : (
          <FaBars className="text-2xl text-gray-700" />
        )}
      </div>

      <div className="hidden md:flex items-center space-x-4">
        <div
          className="relative"
          onMouseEnter={() => setShowCalendarDropdown(true)}
          onMouseLeave={() => setShowCalendarDropdown(false)}
        >
          <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <FaCalendarAlt className="text-xl text-gray-700" />
          </div>
          {showCalendarDropdown && (
            <div className="absolute right-0 mt-0 w-56 bg-white shadow-lg rounded-md z-50 border border-gray-100">
              <button
                className="block w-full px-4 py-3 text-left hover:bg-gray-50"
                onClick={() => navigate("/session")}
              >
                <p className="font-medium text-gray-900">Next Session</p>
                <p className="text-sm text-gray-500 mt-1">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
              </button>
              <div className="border-t border-gray-100"></div>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                onClick={() => navigate("/calendar")}
              >
                View Full Calendar
              </button>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setShowReportDropdown(true)}
          onMouseLeave={() => setShowReportDropdown(false)}
        >
          <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <FaFileAlt className="text-xl text-gray-700" />
          </div>
          {showReportDropdown && (
            <div className="absolute right-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50 border border-gray-100">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                onClick={() => navigate("/reports")}
              >
                Client Progress
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                onClick={() => navigate("/reports/coaching")}
              >
                Coaching Analytics
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700"
                onClick={() => navigate("/reports/export")}
              >
                Export Data
              </button>
            </div>
          )}
        </div>

        <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
          <FaUser className="text-xl text-gray-700" />
        </div>
        <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer relative">
          <FaBell className="text-xl text-gray-700" />
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-start px-4 py-4 space-y-3 md:hidden z-40">
          <button
            onClick={() => {
              navigate("/session");
              setMenuOpen(false);
            }}
            className="w-full text-left py-2 border-b border-gray-200"
          >
            📅 Next Session - Sarah Johnson (10:00 AM)
          </button>
          <button
            onClick={() => navigate("/calendar")}
            className="w-full text-left py-2 border-b border-gray-200"
          >
            🗓 View Full Calendar
          </button>
          <button
            onClick={() => navigate("/reports")}
            className="w-full text-left py-2 border-b border-gray-200"
          >
            📄 Client Progress
          </button>
          <button
            onClick={() => navigate("/reports/coaching")}
            className="w-full text-left py-2 border-b border-gray-200"
          >
            📊 Coaching Analytics
          </button>
          <button
            onClick={() => navigate("/reports/export")}
            className="w-full text-left py-2 border-b border-gray-200"
          >
            📤 Export Data
          </button>
          <button className="w-full text-left py-2 border-b border-gray-200">
            👤 Profile
          </button>
          <button className="w-full text-left py-2">🔔 Notifications</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
