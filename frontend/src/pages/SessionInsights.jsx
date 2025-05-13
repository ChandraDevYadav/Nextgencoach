import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";

const SessionInsights = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state)
    return <div className="text-center mt-20">No session data found.</div>;

  const {
    client,
    date,
    type,
    insights: {
      overview,
      strengths,
      development,
      analysis,
      recommendations,
      nextQuestions,
    },
  } = state;

  const getProgressWidth = (score) => {
    return Math.min(Math.max(score, 0), 100);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-bottom"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-lg z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-red-600 font-medium hover:underline text-[17px] flex justify-start items-center gap-2"
        >
          <FaArrowLeftLong />
          Back to Sessions
        </button>

        <div className="mt-6 space-y-6 bg-white/70 p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">Session Insights</h1>
          <div className="flex justify-start items-center gap-4">
            <p className="text-[15px] text-gray-500 font-medium">{client}</p>
            <p className="text-sm text-gray-500">{date}</p>
            <p className="text-xs bg-[#1bf9c583] px-4 py-[2px] rounded-full text-[#33C9A7]">
              {type}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-xl">Session Overview</h2>
            <p className="text-gray-700 mt-1">{overview}</p>
          </div>

          <div>
            <h2 className="font-semibold text-xl mb-4">Key Observations</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium">Strengths Demonstrated</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {strengths.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium">Areas for Development</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {development.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-xl">
              Coaching Effectiveness Analysis
            </h2>
            <div>
              <div className="pt-3">
                <h1 className="text-[#33C9A7] font-medium">Question Quality</h1>
                <div
                  className="h-2 w-full my-1 bg-gray-300 rounded-full overflow-hidden"
                  style={{ width: "100%" }}
                >
                  <div
                    className="h-full bg-[#33C9A7]"
                    style={{
                      width: `${getProgressWidth(85)}%`,
                    }}
                  />
                </div>
                <p>{analysis.questions}</p>
              </div>
              <div className="py-3">
                <h1 className="text-[#33C9A7] font-medium">Active Listening</h1>
                <div
                  className="h-2 w-full my-1 bg-gray-300 rounded-full overflow-hidden"
                  style={{ width: "100%" }}
                >
                  <div
                    className="h-full bg-[#33C9A7]"
                    style={{
                      width: `${getProgressWidth(90)}%`,
                    }}
                  />
                </div>
                <p>{analysis.listening}</p>
              </div>
              <div>
                <h1 className="text-[#33C9A7] font-medium">Goal Focus</h1>
                <div
                  className="h-2 w-full my-1 bg-gray-300 rounded-full overflow-hidden"
                  style={{ width: "100%" }}
                >
                  <div
                    className="h-full bg-[#33C9A7]"
                    style={{
                      width: `${getProgressWidth(75)}%`,
                    }}
                  />
                </div>
                <p>{analysis.goalFocus}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-xl">
              Recommendations for Next Session
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4 text-[17px]">
              {recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="font-semibold text-xl">
              Suggested Questions for Next Session
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4 text-[17px]">
              {nextQuestions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionInsights;
