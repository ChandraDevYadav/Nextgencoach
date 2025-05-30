import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import React, { useRef, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";

const AiGeneratedReport = () => {
  const reportRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

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

  const downloadPDF = async () => {
    setIsGenerating(true);
    try {
      const node = reportRef.current;
      const dataUrl = await toPng(node, { cacheBust: true, quality: 1 });
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("ai_report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
    setIsGenerating(false);
  };

  return (
    <>
      <div
        className="relative min-h-screen bg-cover bg-bottom pb-8"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-0" />

        <div className="relative z-10 max-w-4xl mx-auto py-6">
          <button
            onClick={() => window.history.back()}
            className="text-blue-500 hover:text-red-600 hover:underline text-[17px] font-medium flex justify-start items-center gap-2"
          >
            <FaArrowLeftLong /> Back to Reports
          </button>
        </div>

        <div
          ref={reportRef}
          className="relative z-10 max-w-4xl mx-auto p-6 bg-white/70 rounded-lg shadow-md"
        >
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
              <button
                onClick={downloadPDF}
                disabled={isGenerating}
                className={`flex items-center gap-2 font-medium px-6 py-3 bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white rounded-full hover:opacity-90 transition ${
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
                  </>
                ) : (
                  <>
                    Download Report <FiDownload />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <div className="bg-white/70 p-4 shadow rounded-lg hover:bg-[#33c9a7] hover:text-white">
              <h4 className="font-semibold text-lg">Executive Summary</h4>
              <p>{report.summary}</p>
            </div>

            <div className="">
              <h4 className="font-semibold text-xl py-3">Key Themes</h4>
              <div className="grid grid-cols-3 gap-4">
                {report.keyThemes.map((theme, index) => (
                  <div
                    key={index}
                    className="bg-white/70 rounded-md p-4 shadow-sm hover:bg-[#33c9a7] hover:text-white group"
                  >
                    <p className="text-[#33C9A7] text-[17px] font-medium group-hover:text-white">
                      {theme.title}
                    </p>
                    <p className="text-[16px] mt-1">{theme.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/70 rounded-md p-4 shadow-sm hover:bg-[#33c9a7] hover:text-white group">
              <h4 className="font-semibold text-xl">
                Recommended Coaching Approach
              </h4>
              <ul className="space-y-1 mt-3">
                {report.coachingApproach.map((item, index) => (
                  <li key={index} className="text-[17px] relative pl-5">
                    <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-[#33C9A7] group-hover:bg-white"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/70 rounded-md p-4 shadow-sm hover:bg-[#33c9a7] hover:text-white group">
              <h4 className="font-semibold text-xl">Suggested Questions</h4>
              <ol className="list-decimal pl-5 space-y-1 mt-3 marker:text-[#33C9A7] group-hover:marker:text-white">
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
