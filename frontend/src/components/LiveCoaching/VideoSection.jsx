import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoDeviceCameraVideo } from "react-icons/go";
import { BsCameraVideoOffFill, BsMicFill, BsMicMuteFill } from "react-icons/bs";

const VideoSection = () => {
  const userVideoRef = useRef(null);
  const coachVideoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [seconds, setSeconds] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        setStream(userStream);

        if (userVideoRef.current) {
          userVideoRef.current.srcObject = userStream;
        }
        if (coachVideoRef.current) {
          coachVideoRef.current.srcObject = userStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
      }
    };

    startCamera();

    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const toggleMic = () => {
    if (stream) {
      stream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsMicOn(!isMicOn);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      stream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
      setIsCameraOn(!isCameraOn);
    }
  };

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(
    2,
    "0"
  )}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col bg-black min-h-screen">
      <div className="relative flex-1">
        <video
          ref={userVideoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          playsInline
        />

        <div className="absolute bottom-4 right-4 w-60 h-40 bg-white border rounded overflow-hidden z-10">
          <video
            ref={coachVideoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            playsInline
          />
        </div>
      </div>

      <div className="w-full bg-black py-3 px-6 flex items-center justify-between space-x-4 shadow z-20">
        <div className="flex justify-start items-center gap-4">
          <span className="font-mono text-sm text-white">{formattedTime}</span>

          <button
            onClick={toggleMic}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            title="Toggle Microphone"
          >
            {isMicOn ? <BsMicFill size={20} /> : <BsMicMuteFill size={20} />}
          </button>

          <button
            onClick={toggleCamera}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
            title="Toggle Camera"
          >
            {isCameraOn ? (
              <GoDeviceCameraVideo size={20} />
            ) : (
              <BsCameraVideoOffFill size={20} />
            )}
          </button>
        </div>

        <button
          onClick={() => {
            stopCamera();
            setShowSummary(true);
          }}
          className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          End Session
        </button>
      </div>

      {showSummary && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Session Summary</h2>
            <p className="mb-4 text-gray-700">
              Review and edit the AI-generated summary before sending to your
              client.
            </p>
            <h3 className="text-lg font-semibold">
              Session Summary with Sarah Johnson
            </h3>

            <div className="mt-4 space-y-3 text-sm text-gray-800">
              <div>
                <strong>Key Topics Discussed:</strong>
                <ul className="list-disc list-inside ml-4">
                  <li>Team management challenges</li>
                  <li>Delegation strategies</li>
                  <li>Stress management</li>
                </ul>
              </div>

              <div>
                <strong>Insights & Breakthroughs:</strong>
                <ul className="list-disc list-inside ml-4">
                  <li>
                    Recognized connection between perfectionism and
                    micromanagement
                  </li>
                  <li>Identified fear of losing control as core issue</li>
                  <li>
                    Showed willingness to implement new delegation framework
                  </li>
                </ul>
              </div>

              <div>
                <strong>Action Items:</strong>
                <ol className="list-decimal list-inside ml-4">
                  <li>Create delegation decision matrix</li>
                  <li>Schedule individual check-ins with team leads</li>
                  <li>Implement stress management techniques</li>
                </ol>
              </div>

              <div>
                <strong>Next Steps:</strong>
                <ul className="list-disc list-inside ml-4">
                  <li>Follow up on delegation framework implementation</li>
                  <li>Review progress on team trust-building</li>
                  <li>Address work-life balance strategies</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowSummary(false);
                  navigate("/");
                }}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Back Home
              </button>

              <button
                onClick={() => {
                  alert("Summary sent!");
                  setShowSummary(false);
                  navigate("/");
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Send Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSection;
