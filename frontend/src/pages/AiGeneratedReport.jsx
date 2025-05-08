import React from "react";
import { FiDownload } from "react-icons/fi";

const AiGeneratedReport = () => {
  const report = {
    name: "Sarah Johnson",
    date: "2025-06-24",
    summary:
      "Based on the pre-session questionnaire responses, Sarah is experiencing significant challenges with delegation and team trust. While she has made progress with executive communication, her work-life balance remains a concern with a high stress level (8/10).",
    keyThemes: [
      {
        title: "Delegation Challenges",
        detail:
          "Difficulty letting go of control and tendency to micromanage tasks.",
      },
      {
        title: "Trust Building",
        detail:
          "Need to develop stronger trust relationships with team members.",
      },
      {
        title: "Work-Life Balance",
        detail: "High stress levels indicating potential burnout risk.",
      },
    ],
    coachingApproach: [
      "Focus on practical delegation frameworks",
      "Address underlying trust issues",
      "Develop stress management strategies",
    ],
    suggestedQuestions: [
      "What exactly are you afraid might happen if you fully delegate a project?",
      "Can you share an example of when delegation worked well for you?",
      "How might your perfectionism be limiting your team's growth?",
      "What signals might you be sending that suggest you don't trust your team?",
      "How could you acknowledge the tension while reaffirming your confidence in them?",
    ],
  };

  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-bottom"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-0" />

        <div className="relative z-10 max-w-4xl mx-auto pt-6 pb-3">
          <button
            onClick={() => window.history.back()}
            className="text-gray-500 hover:text-red-600 hover:underline text-lg font-medium"
          >
            ← Back to Reports
          </button>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-6 bg-white/70 rounded-lg shadow-md mt-2">
          <div className="flex justify-between items-center flex-wrap gap-x-4 mt-2">
            <div>
              <h2 className="text-2xl font-bold">
                Leadership Development Focus Areas
              </h2>
              <div className="text-gray-600 flex justify-start items-center gap-x-6 mt-2">
                <p className="text-sm font-medium">{report.name}</p>
                <p className="text-sm font-medium">{report.date}</p>
                <button className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[13px] font-medium">
                  Pre-Session Analysis
                </button>
              </div>
            </div>

            <div>
              <button className="text-[17px] bg-white text-gray-600 px-6 py-3 shadow rounded-full hover:underline hover:text-white hover:bg-cyan-400 flex justify-start items-center gap-3 font-medium">
                <FiDownload className="text-lg" />
                Download PDF
              </button>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <div className="bg-white/70 p-4 shadow rounded-lg">
              <h4 className="font-semibold text-lg">Executive Summary</h4>
              <p>{report.summary}</p>
            </div>

            <div className="">
              <h4 className="font-semibold text-xl py-3">Key Themes</h4>
              <div className="grid grid-cols-3 gap-4">
                {report.keyThemes.map((theme, index) => (
                  <div
                    key={index}
                    className="bg-white/70 rounded-md p-4 shadow-sm"
                  >
                    <p className="text-[#33C9A7] text-[17px] font-medium">
                      {theme.title}
                    </p>
                    <p className="text-[16px] mt-1">{theme.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 rounded-md p-4 shadow-sm">
              <h4 className="font-semibold text-xl">
                Recommended Coaching Approach
              </h4>
              <ul className="space-y-1 mt-3">
                {report.coachingApproach.map((item, index) => (
                  <li key={index} className="text-[17px] relative pl-5">
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-[#33C9A7]"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/70 rounded-md p-4 shadow-sm">
              <h4 className="font-semibold text-xl">Suggested Questions</h4>
              <ol className="list-decimal pl-5 space-y-1 mt-3 marker:text-[#33C9A7]">
                {report.suggestedQuestions.map((q, index) => (
                  <li key={index} className="text-[17px]">
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AiGeneratedReport;
