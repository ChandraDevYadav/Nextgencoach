import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import React, { useRef, useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

const AiGeneratedReport = ({ token }) => {
  const reportRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(
          `https://api.testir.xyz/server26/api/questionnaires/${id}/report`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReport(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch report");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id, token]);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-lg">No report data available</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>AI-Generated Report - NextGenCoach</title>
        <meta
          name="description"
          content="Detailed AI-generated coaching report"
        />
      </Helmet>
      
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
                {report.title || "Leadership Development Focus Areas"}
              </h2>
              <div className="text-gray-600 flex justify-start items-center gap-x-6 mt-2">
                <p className="text-sm font-medium">
                  {report.client?.name || "No client name"}
                </p>
                <p className="text-sm font-medium">
                  {report.date?.split("T")[0] || new Date().toISOString().split("T")[0]}
                </p>
                <button className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-[13px] font-medium">
                  {report.type || "Pre-Session Analysis"}
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
              <p>{report.summary || "No summary available"}</p>
            </div>

            {report.keyThemes && report.keyThemes.length > 0 && (
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
            )}

            {report.coachingApproach && report.coachingApproach.length > 0 && (
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
            )}

            {report.suggestedQuestions && report.suggestedQuestions.length > 0 && (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AiGeneratedReport;