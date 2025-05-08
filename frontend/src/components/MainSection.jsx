import React, { useState } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { RiVideoOnLine } from "react-icons/ri";
import { MdOutlineFeed } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import AlertDialog from "./LiveCoaching/AlertDialog";

const cards = [
  {
    icon: <LuCalendarDays className="w-8 h-8" />,
    title: "Session Preparation",
    description:
      "Create and manage questionnaires, view client responses, and get AI-powered session prep insights.",
    link: "/session",
  },
  {
    icon: <RiVideoOnLine className="w-8 h-8" />,
    title: "Live Coaching",
    description:
      "Capture and analyze sessions with video and audio tools for enhanced insights.",
    link: "/live",
  },
  {
    icon: <MdOutlineFeed className="w-8 h-8" />,
    title: "Coaching Feedback",
    description:
      "Generate feedback summaries and reports with smart AI recommendations.",
    link: "/feedback",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="lucide lucide-bot w-8 h-8 text-black"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path d="M12 8V4H8"></path>
        <rect width="16" height="12" x="4" y="8" rx="2"></rect>
        <path d="M2 14h2"></path>
        <path d="M20 14h2"></path>
        <path d="M15 13v2"></path>
        <path d="M9 13v2"></path>
      </svg>
    ),
    title: "Skill Builder",
    description:
      "Let AI help you plan, organize, and suggest improvements to sessions.",
    link: "/skill",
  },
];

const MainSection = () => {
  const [showDialog, setShowDialog] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (index) => {
    if (index === 1) {
      setShowDialog(true);
    } else {
      navigate(cards[index].link);
    }
  };

  const handleConfirm = () => {
    setShowDialog(false);
    navigate("/live");
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  return (
    <div
      className="relative min-h-screen flex justify-center items-center bg-cover bg-bottom"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-0" />

      <div className="relative z-10 flex justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-y-6 max-w-6xl px-4 my-8 w-full">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(index)}
              className="w-full"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-card transition duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer w-full">
                {card.icon}
                <h1 className="text-lg font-semibold pt-4 pb-2">
                  {card.title}
                </h1>
                <p className="text-gray-500">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDialog && (
        <AlertDialog
          title="Join Live Coaching?"
          message="Do you want to join the live coaching session now?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default MainSection;
