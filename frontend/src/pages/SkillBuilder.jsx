import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const SkillBuilder = () => {
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState({
    age: "36",
    gender: "Female",
    profession: "Mid-level Manager",
    communicationStyle: "Reserved and Thoughtful",
    openness: "Neutral",
    emotionalState: "Stressed and Anxious",
    challenge: "Leadership Development",
    goals: "Better Team Management",
    difficulty: "Moderate",
  });

  const handleChange = (e) => {
    setAvatar({ ...avatar, [e.target.name]: e.target.value });
  };

  const handleStartVoiceSession = () => {
    navigate("/practice-bot");
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-bottom"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-lg z-0" />

      <div className="relative z-10 max-w-4xl mx-auto pb-12">
        <div className="py-6 px-4">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-red-600 hover:underline text-[17px] font-medium flex justify-start items-center gap-2"
          >
            <FaArrowLeftLong /> Back to Home
          </button>
        </div>

        <div className="px-4 py-8 space-y-4 bg-white/60 rounded-lg">
          <h1 className="text-2xl font-semibold">Configure Practice Avatar</h1>
          <p className="text-gray-700 text-[17px]">
            Create a custom client avatar to practice your coaching skills
            through voice conversation.
          </p>

          <div className="flex jusstify-start items-center gap-8 pt-4">
            <div className="w-full">
              <h2 className="text-xl font-bold">Demographics</h2>
              <div className="rounded-lg space-y-4 mt-2">
                <div>
                  <label className="block font-medium pb-2">Age</label>
                  <select
                    name="age"
                    value={avatar.age}
                    onChange={handleChange}
                    className="w-full p-3 bg-white shadow rounded-md"
                  >
                    <option>18-25</option>
                    <option>26-35</option>
                    <option>36-45</option>
                    <option>46-60</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium pb-2">Gender</label>
                  <select
                    name="gender"
                    value={avatar.gender}
                    onChange={handleChange}
                    className="w-full p-3 bg-white shadow rounded-md"
                  >
                    <option>Female</option>
                    <option>Male</option>
                    <option>Non-binary</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium pb-2">Profession</label>
                  <select
                    name="profession"
                    value={avatar.profession}
                    onChange={handleChange}
                    className="w-full p-3 bg-white shadow rounded-md"
                  >
                    <option>Entry-level Employee</option>
                    <option>Mid-level Manager</option>
                    <option>Senior Executive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-bold">Personality</h2>
              <div className="rounded-lg space-y-4 mt-2">
                <div>
                  <label className="block font-medium pb-2">
                    Communication Style
                  </label>
                  <select
                    name="communicationStyle"
                    value={avatar.communicationStyle}
                    onChange={handleChange}
                    className="w-full p-3 bg-white shadow rounded-md"
                  >
                    <option>Reserved and Thoughtful</option>
                    <option>Direct and Assertive</option>
                    <option>Open and Expressive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium pb-2">
                    Openness to Coaching
                  </label>
                  <select
                    name="openness"
                    value={avatar.openness}
                    onChange={handleChange}
                    className="w-full p-3 bg-white shadow rounded-md"
                  >
                    <option>Open</option>
                    <option>Neutral</option>
                    <option>Resistant</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium pb-2">
                    Emotional State
                  </label>
                  <select
                    name="emotionalState"
                    value={avatar.emotionalState}
                    onChange={handleChange}
                    className="w-full bg-white shadow p-3 rounded-md"
                  >
                    <option>Calm and Focused</option>
                    <option>Stressed and Anxious</option>
                    <option>Frustrated and Defensive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="w-full">
              <h2 className="text-xl font-bold">Coaching Focus</h2>
              <div className="rounded-lg space-y-4 mt-2">
                <div>
                  <label className="block font-medium pb-2">
                    Primary Challenge
                  </label>
                  <select
                    name="challenge"
                    value={avatar.challenge}
                    onChange={handleChange}
                    className="w-full p-3 bg-white shadow rounded-md"
                  >
                    <option>Leadership Development</option>
                    <option>Time Management</option>
                    <option>Conflict Resolution</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium pb-2">Goals</label>
                  <select
                    name="goals"
                    value={avatar.goals}
                    onChange={handleChange}
                    className="w-full p-3 bg-white shadow rounded-md"
                  >
                    <option>Better Team Management</option>
                    <option>Improved Communication</option>
                    <option>Work-Life Balance</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium pb-2">
                    Conversation Difficulty
                  </label>
                  <select
                    name="difficulty"
                    value={avatar.difficulty}
                    onChange={handleChange}
                    className="w-full p-3 bg-white shadow rounded-md"
                  >
                    <option>Easy</option>
                    <option>Moderate</option>
                    <option>Difficult</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-xl font-medium">Avatar Preview</h2>
            <div className=" mt-2 flex justify-start items-center gap-6">
              <div className="text-[#33C9A7] bg-[#35d4af4f] p-3 rounded-full">
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
                  className="lucide lucide-bot w-6 h-6 text-primary"
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
                <h3 className="text-xl font-semibold">Andrea Chen</h3>
                <p className="text-gray-500 text-[16px] py-1">
                  {avatar.age}, {avatar.gender}, {avatar.profession}
                </p>
                <p className="text-[16px] text-gray-700">
                  {avatar.communicationStyle.toLowerCase()}{" "}
                  {avatar.profession.toLowerCase()} who is{" "}
                  {avatar.emotionalState.toLowerCase()} about{" "}
                  {avatar.challenge.toLowerCase()} and{" "}
                  {avatar.goals.toLowerCase()}.{" "}
                  {avatar.openness === "Neutral"
                    ? "She's neutral about coaching but willing to engage."
                    : `She is ${avatar.openness.toLowerCase()} to coaching.`}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white"
              onClick={() => alert("Canceled")}
            >
              Cancel
            </button>
            <button
              onClick={handleStartVoiceSession}
              className="relative overflow-hidden bg-blue-600 text-white px-4 py-2 rounded-md group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-0"></span>

              <span className="relative z-10">Start Voice Session</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillBuilder;
