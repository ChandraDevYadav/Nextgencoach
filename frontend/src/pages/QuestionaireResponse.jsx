import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const QuestionaireResponse = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const response = {
    name: "Sarah Johnson",
    date: "2025-06-24",
    answers: [
      {
        question: "What would you like to focus on in our upcoming session?",
        answer:
          "I want to discuss specific strategies for effectively delegating to my team while still maintaining quality standards.",
      },
      {
        question: "What progress have you made since our last session?",
        answer:
          "I've started using the communication framework we discussed with executive stakeholders and have received positive feedback.",
      },
      {
        question: "What challenges are you currently facing?",
        answer:
          "I find myself checking in too frequently and sometimes taking back tasks when I'm not satisfied with the progress.",
      },
      {
        question:
          "On a scale of 1-10, how would you rate your current stress level?",
        answer: "8",
      },
      {
        question: "What specific outcomes would you like from this session?",
        answer:
          "I want to develop concrete strategies for building trust with my team and letting go of control.",
      },
    ],
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);

    // Simulate AI report generation (3 seconds delay)
    setTimeout(() => {
      // Navigate to session page after generation
      navigate("/session"); // Update this to your actual session route
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-bottom pb-6"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-0" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 hover:underline py-6 text-[17px] font-medium flex justify-start items-center gap-2"
          >
            <FaArrowLeftLong /> Back to Responses
          </button>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto p-6 bg-white/70 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold pb-3">Pre-Session Check-in</h2>

          <div className="text-gray-600 flex justify-start items-center gap-4 pb-6">
            <p className="text-[16px] font-medium">{response.name}</p>
            <p className="text-sm font-medium">{response.date}</p>
          </div>

          <div className="space-y-6">
            {response.answers.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow p-4 rounded-lg hover:bg-[#33c9a7] hover:text-white transition-colors duration-200"
              >
                <p className="font-semibold text-lg">{item.question}</p>
                <p className="text-[17px] mt-2">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerateReport}
              disabled={isGenerating}
              className={`mt-6 flex justify-start items-center gap-2 font-medium px-6 py-3 bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white rounded-full hover:opacity-90 transition ${
                isGenerating ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isGenerating ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating...
                  <LuBrain />
                </>
              ) : (
                <>
                  Generate AI Report <LuBrain />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionaireResponse;
