import React, { useState, useEffect } from "react";
import AddQuestionnaireDialog from "./AddQuestionnaireDialog";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SendDialog from "./SendDialog";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const SendQuestionnaireTab = () => {
  const { token } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuerySend, setSearchQuerySend] = useState("");
  const [expandedQuestionnaires, setExpandedQuestionnaires] = useState([]);
  const [questionnaires, setQuestionnaires] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch questionnaires from backend
  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const response = await axios.get(
          "https://api.testir.xyz/server26/api/questionnaires",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setQuestionnaires(response.data);
      } catch (error) {
        console.error("Error fetching questionnaires:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionnaires();
  }, [token]);

  const handleAddQuestionnaire = (newQuestionnaire) => {
    setQuestionnaires((prev) => [...prev, newQuestionnaire]);
  };

  const filterQuestionnaires = (questionnaire) => {
    const matchesSearch =
      searchQuerySend === "" ||
      questionnaire.title
        .toLowerCase()
        .includes(searchQuerySend.toLowerCase()) ||
      questionnaire.type
        .toLowerCase()
        .includes(searchQuerySend.toLowerCase()) ||
      (questionnaire.questions &&
        questionnaire.questions.some((q) =>
          q.toLowerCase().includes(searchQuerySend.toLowerCase())
        ));
    return matchesSearch;
  };

  const toggleExpand = (id) => {
    setExpandedQuestionnaires((prev) =>
      prev.includes(id) ? prev.filter((qid) => qid !== id) : [...prev, id]
    );
  };

  const filteredQuestionnaires = questionnaires.filter(filterQuestionnaires);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold mb-2">Questionnaires</h2>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="relative overflow-hidden mb-4 px-4 py-2 rounded font-medium text-white group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-400 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-[700ms] ease-in-out z-10"></div>
          <span className="relative z-20 transition-colors duration-300 group-hover:text-white">
            + Add Questionnaire
          </span>
        </button>
        <AddQuestionnaireDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSubmit={handleAddQuestionnaire}
        />
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search questionnaires..."
          value={searchQuerySend}
          onChange={(e) => setSearchQuerySend(e.target.value)}
          className="w-full rounded-lg bg-white placeholder:font-medium border-2 border-white shadow py-3 px-12 mb-4 focus:border-2 focus:border-cyan-400 outline-none transition"
        />
        <div className="absolute top-4 left-4">
          <FaMagnifyingGlass size={18} className="text-gray-400" />
        </div>
      </div>

      <div className="space-y-4">
        {questionnaires.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              No questionnaires yet
            </h3>
            <p className="text-gray-500 mb-4">
              Get started by creating your first questionnaire
            </p>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Questionnaire
            </button>
          </div>
        ) : filteredQuestionnaires.length > 0 ? (
          filteredQuestionnaires.map((questionnaire) => {
            const isExpanded = expandedQuestionnaires.includes(
              questionnaire._id
            );
            const visibleQuestions = isExpanded
              ? questionnaire.questions || []
              : (questionnaire.questions || []).slice(0, 3);

            return (
              <div key={questionnaire._id} className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl">{questionnaire.title}</h3>
                    <span className="text-gray-500">{questionnaire.type}</span>
                  </div>
                  <p className="bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white px-4 py-2 rounded-full flex gap-1">
                    <SendDialog questionnaireId={questionnaire._id} />
                  </p>
                </div>
                {visibleQuestions.length > 0 ? (
                  <>
                    <ul className="list-disc ml-6 mt-2 text-gray-700">
                      {visibleQuestions.map((question, i) => (
                        <li key={i}>{question.questionText}</li>
                      ))}
                    </ul>
                    {(questionnaire.questions?.length || 0) > 3 && (
                      <button
                        onClick={() => toggleExpand(questionnaire._id)}
                        className="text-[#33c9a7] pl-2 underline text-sm mt-2"
                      >
                        {isExpanded
                          ? "Show less"
                          : `+${
                              (questionnaire.questions?.length || 0) - 3
                            } more questions`}
                      </button>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 mt-2">
                    No questions in this questionnaire
                  </p>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-gray-500">
              No questionnaires found matching your search
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SendQuestionnaireTab;
