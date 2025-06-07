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
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Create new session
  useEffect(() => {
    const createBotSession = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.post("/api/practicebot", {
          name: "Andrea Chen",
          role: "Marketing Director",
          mood: "Stressed",
          need: "Leadership coaching",
          messages: [
            {
              sender: "bot",
              text: "Hi, I'm Andrea Chen. I'm feeling really stressed about an upcoming product launch and could use some leadership coaching.",
            },
          ],
        });
        setBotId(data._id);
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Error creating bot:", error);
        toast.error("Failed to create bot session.");
      } finally {
        setIsLoading(false);
      }
    };

    createBotSession();

    // Cleanup speech recognition
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Speech recognition setup
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      toast.warn("Speech recognition is not supported in your browser.");
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

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      toast.error("Error occurred in speech recognition");
      setRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  // Send message
  const sendMessage = async (text) => {
    if (!text.trim() || !botId) return;

    const userMsg = { sender: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const { data } = await axios.post(`/api/practicebot/${botId}/message`, {
        sender: "user",
        text,
      });

      const botReply = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Bot failed to respond.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypedMessageSend = async () => {
    if (!typedMessage.trim()) return;
    await sendMessage(typedMessage);
    setTypedMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleTypedMessageSend();
    }
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

  const handleNewAvatar = () => {
    toast.info("Creating new avatar...", {
      position: "top-right",
      autoClose: 1500,
      onClose: () => {
        window.location.reload();
      },
    });
  };

  return (
    <div
      className="w-full shadow-2xl h-[600px] flex flex-col bg-cover bg-bottom relative overflow-hidden"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-lg z-0 rounded-lg" />
      <Helmet>
        <title>Practice Coaching - NextGenCoach</title>
        <meta
          name="description"
          content="Practice Coaching with your custom created avatar"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <ToastContainer />

      {/* Header */}
      <div className="flex justify-between items-center gap-3 p-4 bg-white/60 text-gray-800 z-10">
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
          className="px-4 py-2 text-[16px] font-medium bg-red-600 hover:bg-red-800 rounded-full text-white shadow flex items-center gap-2 transition-colors"
        >
          End Session
        </button>
      </div>

      {/* Messages Area */}
      <div className="relative flex-1 h-full overflow-y-auto px-4 py-3 bg-cover bg-center">
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white/60 z-0"></div>

        <div className="relative z-10 flex flex-col space-y-3 h-full pb-24 overflow-y-auto">
          {isLoading && !messages.length ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-pulse">Starting session...</div>
            </div>
          ) : (
            <>
              {/* <div className="text-center text-[16px] font-medium text-gray-700 bg-white/30 px-4 py-2 rounded-xl shadow-md self-center">
                Practice session started with Andrea Chen. You can begin <br />
                coaching now.
              </div> */}

              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] px-4 py-2 text-sm rounded-xl ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white self-end ml-auto"
                      : "bg-gray-100 text-gray-900 self-start mr-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
              {isLoading && (
                <div className="self-start px-4 py-2 bg-gray-200 text-gray-900 rounded-xl max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/30 backdrop-blur-sm z-10">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-4">
          <div className="w-full flex justify-center gap-2 items-center relative">
            <textarea
              rows={2}
              value={typedMessage}
              onChange={(e) => setTypedMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 pl-4 pr-20 py-3 border bg-white/50 border-gray-300 rounded-xl shadow text-sm focus:outline-none focus:ring-2 focus:ring-[#33C9A7] resize-none hide-scrollbar"
              disabled={isLoading}
            />

            <div className="flex justify-center items-center gap-2 absolute right-2 bottom-2">
              <button
                onClick={startListening}
                disabled={isLoading}
                className={`p-2 rounded-full flex items-center text-lg justify-center transition ${
                  recording
                    ? "text-red-500 animate-pulse"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {recording ? <HiMicrophone /> : <HiOutlineMicrophone />}
              </button>
              <button
                onClick={handleTypedMessageSend}
                disabled={!typedMessage.trim() || isLoading}
                className={`p-2 rounded-full shadow text-lg ${
                  typedMessage.trim() && !isLoading
                    ? "bg-[#33C9A7] text-white hover:bg-[#2bb297]"
                    : "bg-gray-700 text-white cursor-not-allowed"
                }`}
              >
                <FaArrowUp />
              </button>
            </div>
          </div>

          <button
            onClick={handleNewAvatar}
            className="text-sm font-semibold flex justify-start items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <TbReload className="text-[#2bb297] text-sm" />
            Configure New Avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeBot;
