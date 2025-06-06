import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";
import { toPng, toJpeg } from "html-to-image";
import jsPDF from "jspdf";
import { Helmet } from "react-helmet";

const QuestionnaireResponse = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const responseRef = useRef(null);

  const API_BASE_URL = "https://api.testir.xyz/server26/api";

  const fetchResponse = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/questionnaires/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.status !== "completed") {
        throw new Error("Questionnaire is not completed yet.");
      }

      setResponse(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Error fetching questionnaire.");
    }
  }, [id, token]);

  useEffect(() => {
    fetchResponse();
  }, [fetchResponse]);

  const downloadImage = useCallback(
    async (format) => {
      if (!responseRef.current) return;

      setIsGenerating(true);
      try {
        const node = responseRef.current;
        const fileName = `${response?.title || "Session"}_Response.${format}`;
        
        if (format === "pdf") {
          const dataUrl = await toPng(node);
          const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
          });
          const imgProps = pdf.getImageProperties(dataUrl);
          const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // 10mm margins
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(dataUrl, "PNG", 10, 10, pdfWidth, pdfHeight);
          pdf.save(fileName);
        } else {
          const dataUrl = format === "png" ? await toPng(node) : await toJpeg(node);
          const link = document.createElement("a");
          link.download = fileName;
          link.href = dataUrl;
          link.click();
        }
      } catch (err) {
        console.error("Download error:", err);
        setError("Failed to generate download.");
      } finally {
        setIsGenerating(false);
        setShowDialog(false);
      }
    },
    [response?.title]
  );

  if (error) {
    return (
      <div
        className="relative min-h-screen bg-cover bg-bottom pb-6"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-0" />
        <div className="relative z-10 max-w-4xl mx-auto py-6 px-6">
          <div className="bg-white rounded-lg p-6 text-center text-red-600">
            {error}
            <button
              onClick={fetchResponse}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div
        className="relative min-h-screen bg-cover bg-bottom pb-6"
        style={{ backgroundImage: "url('/bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-0" />
        <div className="relative z-10 max-w-4xl mx-auto py-6 px-6">
          <div className="bg-white rounded-lg p-6 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4">Loading questionnaire...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-bottom pb-6"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <Helmet>
        <title>Client Answers - NextGenCoach</title>
        <meta
          name="description"
          content="Answers from the client for your questionnaires"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-lg z-0" />

      <div className="relative z-10 max-w-4xl mx-auto py-6">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 hover:text-red-600 hover:underline text-[17px] font-medium flex justify-start items-center gap-2"
          aria-label="Back to Results"
        >
          <FaArrowLeftLong /> Back to Results
        </button>
      </div>

      <div
        ref={responseRef}
        className="relative z-10 max-w-4xl mx-auto p-6 bg-white/70 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold pb-3">{response.title}</h2>

        <div className="text-gray-600 flex justify-start items-center gap-4 pb-6">
          <p className="text-[16px] font-medium">
            {response.client?.name || "Unknown Client"}
          </p>
          <p className="text-sm font-medium">
            {response.completedDate?.split("T")[0]}
          </p>
        </div>

        <div className="space-y-6">
          {response.questions?.length > 0 ? (
            response.questions.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow p-4 rounded-lg hover:bg-[#33c9a7] hover:text-white transition-colors duration-200"
              >
                <p className="font-semibold text-lg">{item.question}</p>
                <p className="text-[17px] mt-2">
                  {item.answer || "No answer provided."}
                </p>
              </div>
            ))
          ) : (
            <div className="bg-white shadow p-4 rounded-lg text-center">
              No questions available in this questionnaire.
            </div>
          )}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 flex justify-end">
          <div className="mt-6 relative">
            <button
              onClick={() => setShowDialog(true)}
              disabled={isGenerating}
              aria-label="Generate AI Report"
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
                  Generate AI Report <LuBrain />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {showDialog && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" 
          role="dialog" 
          aria-modal="true" 
          aria-labelledby="download-dialog-title"
          onClick={() => setShowDialog(false)}
        >
          <div 
            className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 id="download-dialog-title" className="text-lg font-semibold mb-4">
              Download AI Report As
            </h3>
            <div className="space-y-2">
              {["png", "jpeg", "pdf"].map((format) => (
                <button
                  key={format}
                  onClick={() => downloadImage(format)}
                  className="w-full px-4 py-2 rounded bg-[#33c9a7] text-white hover:bg-[#2dbd99] transition"
                >
                  {format.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowDialog(false)}
              className="mt-4 text-sm text-gray-500 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireResponse;