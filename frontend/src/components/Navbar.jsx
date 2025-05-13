import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaFileAlt, FaUser, FaBell } from "react-icons/fa";

const Navbar = () => {
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="flex items-center">
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

      <div className="flex items-center space-x-4">
        <div
          className="relative"
          onMouseEnter={() => setShowCalendarDropdown(true)}
          onMouseLeave={() => setShowCalendarDropdown(false)}
        >
          <div className="p-2 rounded-md hover:bg-gray-100 cursor-pointer">
            <FaCalendarAlt className="text-xl text-gray-700" />
          </div>

          {showCalendarDropdown && (
            <div
              className="absolute right-0 mt-0 w-56 bg-white shadow-lg rounded-md z-50 border border-gray-100"
              onMouseEnter={() => setShowCalendarDropdown(true)}
              onMouseLeave={() => setShowCalendarDropdown(false)}
            >
              <button
                className="block w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                onClick={() => navigate("/sessions")}
              >
                <p className="font-medium text-gray-900">Next Session</p>
                <p className="text-sm text-gray-500 mt-1">Sarah Johnson</p>
                <p className="text-sm text-gray-500">Tomorrow, 10:00 AM</p>
              </button>
              <div className="border-t border-gray-100"></div>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
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
            <div
              className="absolute right-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50 border border-gray-100"
              onMouseEnter={() => setShowReportDropdown(true)}
              onMouseLeave={() => setShowReportDropdown(false)}
            >
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
                onClick={() => navigate("/reports")}
              >
                Client Progress
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
                onClick={() => navigate("/reports/coaching")}
              >
                Coaching Analytics
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700"
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
    </nav>
  );
};

export default Navbar;
