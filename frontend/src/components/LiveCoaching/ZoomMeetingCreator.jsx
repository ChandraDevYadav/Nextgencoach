import React, { useState } from "react";
import AudioRecorder from "./AudioRecorder";
// import { useNavigate } from "react-router-dom";

const ZoomMeetingCreator = () => {
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const navigate = useNavigate();

  const handleCreateMeeting = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        "https://api.testir.xyz/server26/api/zoom/create-meeting",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: "Test Meeting", duration: 30 }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to create meeting");
      }

      const data = await res.json();
      setMeeting(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // const handleJoinInApp = () => {
  //   if (meeting) {
  //     navigate(
  //       `/live/join?meetingNumber=${meeting.meetingNumber}&password=${meeting.password}`
  //     );
  //   }
  // };

  return (
    <div
      className="grid grid-cols-9 relative min-h-screen bg-cover bg-bottom"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-0" />
      <div className="col-span-2">
        <div className="relative min-h-screen bg-cover bg-bottom">
          <div className="relative z-10 min-h-screen backdrop-blur-md p-8 space-y-6">
            <div className="flex justify-start items-center">
              <button
                onClick={handleCreateMeeting}
                disabled={loading}
                className="relative text-center font-medium overflow-hidden bg-gradient-to-r from-green-600 to-green-600 text-white rounded px-4 py-2 group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0 rounded"></span>
                <span className="relative z-10 text-center">
                  {loading ? "Creating..." : "Create Meeting"}
                </span>
              </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {meeting && (
              <div className="mt-4 space-y-4">
                <div className="text-sm text-gray-800 space-y-2">
                  <p className="text-[16px] font-medium">
                    <strong>Meeting Number:</strong> {meeting.meetingNumber}
                  </p>
                  <p className="text-[16px] font-medium">
                    <strong>Password:</strong> {meeting.password}
                  </p>
                </div>

                <div className="flex flex-col space-y-3">
                  {/* <button
                onClick={handleJoinInApp}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Join Meeting in App
              </button> */}

                  <a
                    href={meeting.joinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative text-center font-medium overflow-hidden bg-gradient-to-r from-red-600 to-red-500 text-white rounded px-4 py-2 group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0 rounded"></span>
                    <span className="relative z-10 text-center">
                      Join via Zoom App
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-7 z-10">
        <AudioRecorder />
      </div>
    </div>
  );
};

export default ZoomMeetingCreator;
