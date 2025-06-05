import React, { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const LiveMeeting = () => {
  const [searchParams] = useSearchParams();
  const meetingRef = useRef(null);
  const navigate = useNavigate();
  const meetingNumber = searchParams.get("meetingNumber");
  const password = searchParams.get("password");

  useEffect(() => {
    const initializeZoomMeeting = async () => {
      if (!meetingNumber) {
        navigate("/");
        return;
      }

      try {
        const { ZoomMtg } = await import("@zoomus/websdk");

        ZoomMtg.setZoomJSLib("https://source.zoom.us/2.13.0/lib", "/av");

        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();

        const response = await fetch(
          `http://localhost:5000/api/zoom/signature?meetingNumber=${meetingNumber}`
        );
        const { signature } = await response.json();

        ZoomMtg.init({
          leaveUrl: "http://localhost:5173",
          success: () => {
            ZoomMtg.join({
              signature,
              meetingNumber,
              userName: "Your Name",
              // eslint-disable-next-line no-undef
              apiKey: process.env.REACT_APP_ZOOM_API_KEY,
              userEmail: "user@example.com",
              passWord: password,
              success: () => console.log("Joined meeting successfully"),
              error: (err) => {
                console.error("Failed to join meeting", err);
                navigate("/");
              },
            });
          },
          error: (err) => {
            console.error("Failed to initialize Zoom", err);
            navigate("/");
          },
        });
      } catch (err) {
        console.error("Error initializing Zoom meeting", err);
        navigate("/");
      }
    };

    initializeZoomMeeting();

    return () => {};
  }, [meetingNumber, password, navigate]);

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div className="absolute inset-0 bg-black/10 z-0" />

      <div className="relative z-10 h-screen flex flex-col">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl font-semibold text-center">Live Meeting</h1>
        </header>

        <div className="flex-1">
          <div
            ref={meetingRef}
            id="zoom-meeting-container"
            className="h-full w-full"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LiveMeeting;
