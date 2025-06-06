import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaUser,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { FaCircleCheck } from "react-icons/fa6";
import CalendarDialog from "./Common/CalendarDialog";

const Navbar = () => {
  const [showCalendarDropdown, setShowCalendarDropdown] = useState(false);
  const [showReportDropdown, setShowReportDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotiDropdown, setShowNotiDropdown] = useState(false);
  const [user, setUser] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = useAuth();

  const [open, setOpen] = useState(false);

  const sessions = [
    { title: "Session with Sarah Johnson", date: "2025-05-18T10:00:00" },
    { title: "Check-in with Alex Smith", date: "2025-05-21T14:00:00" },
  ];
  
  useEffect(()=>{
    const userInfo = async () => {
      try{
        const res = await axios.get(
          "http://localhost:5000/api/auth/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(res.data);
      }catch(error){
        console.error("Error fetching user data",error);
      }finally{
        setIsLoading(false);
      }
    };
    userInfo();
  },[token]);

  return (
    <nav className="bg-white shadow-md px-4 md:px-6 py-3 flex justify-between items-center relative">
      <Link to="/" className="flex items-center z-50 group">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] flex items-center justify-center mr-3">
          <FaCircleCheck className="text-white text-xl" />
        </div>
        <p className="text-xl font-bold text-black group-hover:text-blue-600">
          NextGen Coach
        </p>
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
          <div className="p-2 rounded-md hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300 cursor-pointer group">
            <FaCalendarAlt className="text-xl text-gray-700 group-hover:text-white" />
          </div>
          {showCalendarDropdown && (
            <div className="relative">
              <div className="absolute right-0 mt-0 w-56 bg-white shadow-lg rounded-md z-50 border border-gray-100 ">
                <button
                  className="block w-full px-4 py-3 text-left hover:bg-gray-50 cursor-pointer hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] hover:rounded-t-md transition-colors duration-300 group"
                  onClick={() => navigate("/session")}
                >
                  <p className="font-medium text-gray-900 group-hover:text-white">
                    Next Session
                  </p>
                  <p className="text-sm text-gray-500 mt-1 group-hover:text-white">
                    Sarah Johnson
                  </p>
                  <p className="text-sm text-gray-500 group-hover:text-white">
                    Tomorrow, 10:00 AM
                  </p>
                </button>
                <div className="border-t border-gray-100"></div>
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
              </div>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setShowReportDropdown(true)}
          onMouseLeave={() => setShowReportDropdown(false)}
        >
          <div className="p-2 rounded-md hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300 cursor-pointer group">
            <FaFileAlt className="text-xl text-gray-700 group-hover:text-white" />
          </div>
          {showReportDropdown && (
            <div className="absolute right-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50 border border-gray-100">
              <button
                className="block w-full px-4 py-2 text-left hover:rounded-t-md hover:bg-gray-50 text-gray-700 cursor-pointer hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300"
                onClick={() => navigate("/reports")}
              >
                Client Progress
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 cursor-pointer hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300"
                onClick={() => navigate("/reports/coaching")}
              >
                Coaching Analytics
              </button>
              <button
                className="block w-full px-4 py-2 text-left hover:rounded-b-md hover:bg-gray-50 text-gray-700 cursor-pointer hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300"
                onClick={() => navigate("/reports/export")}
              >
                Export Data
              </button>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setShowUserDropdown(true)}
          onMouseLeave={() => setShowUserDropdown(false)}
        >
          <div className="p-2 rounded-md hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300 cursor-pointer group">
            <FaUser className="text-xl text-gray-700 group-hover:text-white" />
          </div>
          {showUserDropdown && (
            <div className="absolute right-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50 border border-gray-100">
              <div
                className="block w-full px-4 py-2 text-left hover:rounded-t-md hover:bg-gray-50 text-gray-700 cursor-pointer hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300"
              >
                
              </div>
              <div
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 cursor-pointer hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300"
              >
                
              </div>
            </div>
          )}
        </div>

        <div
          className="relative"
          onMouseEnter={() => setShowNotiDropdown(true)}
          onMouseLeave={() => setShowNotiDropdown(false)}
        >
          <div className="p-2 rounded-md hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300 cursor-pointer group">
            <FaBell className="text-xl text-gray-700 group-hover:text-white" />
          </div>
          {showNotiDropdown && (
            <div className="absolute right-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50 border border-gray-100">
              <div
                className="block w-full px-4 py-2 text-left hover:rounded-t-md hover:bg-gray-50 text-gray-700 cursor-pointer hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300"
              >
                Your next session is with Sarah Johnson. Have you reviewed the response reports.
              </div>
              <div
                className="block w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-700 cursor-pointer hover:bg-gradient-to-r hover:from-[#33c9a7] hover:to-[#3ba7f5] transition-colors duration-300"
              >
                Its time to start practicing Coaching. Get Started with Skill Builder.
              </div>
            </div>
          )}
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
