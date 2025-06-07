import React, { useState, useEffect, useRef } from "react";
import { HiOutlineMicrophone } from "react-icons/hi";
import { HiMicrophone } from "react-icons/hi";
import { FaArrowUp } from "react-icons/fa6";
import { TbReload } from "react-icons/tb";
import { toast, ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const PracticeBot = () => {
  const [botId, setBotId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [recording, setRecording] = useState(false);
  const [typedMessage, setTypedMessage] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    const createBotSession = async () => {
      try {
        const { data } = await axios.post("/api/practicebot", {
          name: "Andrea Chen",
          role: "Marketing Director",
          mood: "Stressed",
          need: "Leadership coaching",
        });
        setBotId(data._id);
        setMessages(data.messages || []);
      } catch {
        toast.error("Failed to create bot session.");
      }
    };

    createBotSession();
  }, []);

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

    recognition.onresult = async (event) => {
      const userText = event.results[0][0].transcript;
      await sendMessage(userText);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const { data } = await axios.post(`/api/practicebot/${botId}/message`, {
        sender: "user",
        text,
      });
      const botReply = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch {
      toast.error("Bot failed to respond.");
    }
  };

  const handleTypedMessageSend = async () => {
    await sendMessage(typedMessage);
    setTypedMessage("");
  };

  const handleEndSession = () => {
    toast.info("Session ended. Returning to previous page...", {
      position: "top-right",
      autoClose: 2000,
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
        <meta
          name="description"
          content="Practice Coaching with your custom created avatar"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <ToastContainer />

      <div className="flex justify-between items-center gap-3 p-4 bg-white text-gray-800">
        <div className="flex justify-center gap-4 items-center">
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
        <button
          onClick={handleEndSession}
          className="px-4 py-2 text-[16px] font-medium bg-red-600 hover:bg-red-800 rounded-full text-white shadow flex items-center gap-2"
        >
          End Session
        </button>
      </div>

      <div
        className="relative flex-1 h-full overflow-y-auto px-4 py-3 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/60 z-0"></div>

        <div
          className="relative z-10 flex flex-col space-y-3 h-[310px] overflow-y-scroll"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="text-center text-[16px] font-medium text-gray-700 bg-white/30 px-4 py-2 rounded-xl shadow-md self-center">
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

      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-center gap-4">
        <div className="w-1/2 flex justify-center gap-2 items-center relative">
          <textarea
            rows={4}
            type="text"
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTypedMessageSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl shadow text-sm focus:outline-none focus:ring-2 focus:ring-[#33C9A7]"
          />
          <div className="flex justify-center items-center gap-2 absolute right-[3px] bottom-[3px]">
            <button
              onClick={startListening}
              className={`rounded-full flex items-center justify-center text-black shadow transition text-xl ${
                recording ? "animate-pulse" : "text-black"
              }`}
            >
              {recording ? <HiMicrophone /> : <HiOutlineMicrophone />}
            </button>
            <button
              onClick={handleTypedMessageSend}
              className="p-2 bg-black text-white rounded-full shadow hover:bg-black/80 text-sm"
            >
              <FaArrowUp />
            </button>
          </div>
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
