import React, { useState, useRef } from "react";
import { FaMicrophone } from "react-icons/fa";
import { TbReload } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaMicrophoneSlash } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const PracticeBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [recording, setRecording] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setRecording(true);
    recognition.onend = () => setRecording(false);

    recognition.onresult = (event) => {
      const userText = event.results[0][0].transcript;
      setMessages((prev) => [...prev, { sender: "user", text: userText }]);
      botReply(userText);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const botReply = (userText) => {
    let response = "I'm not sure I understand.";

    if (userText.toLowerCase().includes("hello")) {
      response = "Hi there! How can I assist you today?";
    } else if (userText.toLowerCase().includes("help")) {
      response = "Sure, I'm here to help. What do you need assistance with?";
    }

    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: "bot", text: response }]);
    }, 1000);
  };

  const handleEndSession = () => {
    toast.info("Session ended. Returning to previous page...", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      onClose: () => {
        window.history.back();
      },
    });
  };

  return (
    <div
      className="w-full rounded-2xl shadow-2xl h-[600px] flex flex-col bg-cover bg-bottom"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <Helmet>
        <title>Practice Coaching - NextGenCoach</title>
        <meta name="description" content="Practice Coaching with your custom created avatar" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <ToastContainer />

      <div className="flex items-center gap-3 p-4 bg-white text-gray-800">
        <div className="w-8 h-8 rounded-full text-[#33C9A7] bg-[#1bfac685] flex items-center justify-center font-bold text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-bot w-4 h-4 text-primary"
          >
            <path d="M12 8V4H8"></path>
            <rect width="16" height="12" x="4" y="8" rx="2"></rect>
            <path d="M2 14h2"></path>
            <path d="M20 14h2"></path>
            <path d="M15 13v2"></path>
            <path d="M9 13v2"></path>
          </svg>
        </div>
        <div>
          <div className="font-semibold text-lg">Andrea Chen</div>
          <div className="text-[13px] opacity-90">
            Marketing Director • Stressed • Needs leadership coaching
          </div>
        </div>
      </div>

      <div
        className="relative flex-1 h-full overflow-y-auto px-4 py-3 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/60 z-0"></div>

        <div className="relative z-10 flex flex-col space-y-3">
          <div className="text-center text-[16px] font-medium text-gray-700 bg-white/90 px-4 py-2 rounded-xl shadow-md self-center">
            Practice session started with Andrea Chen. You can begin <br />{" "}
            coaching now.
          </div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[40%] px-4 py-2 text-sm rounded-xl ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-900 self-start mr-auto"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white flex flex-col items-center gap-4">
        <div className="flex justify-center gap-6 items-center">
          <button
            onClick={startListening}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow transition ${
              recording ? "bg-red-500 animate-pulse" : "bg-[#33C9A7]"
            }`}
          >
            {recording ? (
              <FaMicrophoneSlash size={28} className="m-auto" />
            ) : (
              <FaMicrophone size={28} className="m-auto" />
            )}
          </button>
          <button
            onClick={handleEndSession}
            className="h-12 px-4 text-lg font-medium bg-gray-200 hover:bg-gray-300 rounded-full text-gray-800 shadow flex items-center gap-2"
          >
            End Session
          </button>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-2 text-sm font-semibold flex justify-start items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <TbReload className="text-[#2bb297] text-sm" />
          Configure New Avatar
        </button>
      </div>
    </div>
  );
};

export default PracticeBot;
