import React, { useState } from "react";

const ZoomMeetingCreator = () => {
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateMeeting = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/zoom/create-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: "Test Meeting", duration: 30 }),
      });

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

  return (
    <div
      className="relative min-h-screen flex justify-center items-start bg-cover bg-bottom"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Blur and light overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-0" />

      {/* Content container */}
      <div className="relative z-10 w-full max-w-xl bg-white/90 backdrop-blur-md rounded-xl shadow-md p-8 mt-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-700 text-center">
          Create Zoom Meeting
        </h2>
        <div className="flex justify-center items-center">
          <button
            onClick={handleCreateMeeting}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Creating..." : "Create Meeting"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {meeting && (
          <div className="mt-4 text-sm text-gray-800 flex justify-center items-center">
            <div>
              <p className="text-lg">
                <strong>Meeting Number:</strong> {meeting.meetingNumber}
              </p>
              <p className="text-lg">
                <strong>Password:</strong> {meeting.password}
              </p>
              <p className="text-lg">
                <strong>Join URL:</strong>{" "}
                <a
                  href={meeting.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  Join Meeting
                </a>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ZoomMeetingCreator;
