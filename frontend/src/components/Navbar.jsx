import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaFileAlt, FaUser, FaBell } from "react-icons/fa";

const Navbar = () => {
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="" className="cursor-pointer flex justify-start items-center">
        <div
          to=""
          className="w-8 h-8 rounded-full bg-[linear-gradient(to_right,_rgb(51,201,167),_rgb(59,167,245))] flex items-center justify-center mr-3"
        >
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

      <div className="flex space-x-6 items-center text-gray-700 relative">
        <div
          className="relative"
          onMouseEnter={() => setShowCalendarDropdown(true)}
          onMouseLeave={() => setShowCalendarDropdown(false)}
        >
          <FaCalendarAlt className="text-xl cursor-pointer" />
          {showCalendarDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => navigate("/session")}
              >
                View Sessions
              </button>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setShowReportDropdown(true)}
          onMouseLeave={() => setShowReportDropdown(false)}
        >
          <FaFileAlt className="text-xl cursor-pointer" />
          {showReportDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-10">
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                onClick={() => navigate("/report")}
              >
                View Reports
              </button>
            </div>
          )}
        </div>

        <FaUser className="text-xl cursor-pointer" />
        <FaBell className="text-xl cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
