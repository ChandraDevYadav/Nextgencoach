import React, { useState } from "react";
import AddQuestionnaireDialog from "./AddQuestionnaireDialog";
import { FaMagnifyingGlass } from "react-icons/fa6";
import SendDialog from "./SendDialog";
import { Toaster } from "react-hot-toast";

const SendQuestionnaireTab = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuerySend, setSearchQuerySend] = useState("");
  const [expandedQuestionnaires, setExpandedQuestionnaires] = useState([]);

  const questionnairesData = [
    {
      id: 1,
      title: "Initial Intake Form",
      type: "Intake",
      questions: [
        "What brings you to coaching at this time?",
        "What are your top 3 goals for our coaching relationship?",
        "How would you describe your leadership style?",
        "What are your biggest professional challenges?",
        "How do you handle conflict situations?",
      ],
    },
    {
      id: 2,
      title: "Pre-Session Check-in",
      type: "Pre-session",
      questions: [
        "What would you like to focus on in our upcoming session?",
        "What progress have you made since our last session?",
        "What challenges are you currently facing?",
        "What insights have you gained?",
        "What support do you need from me?",
      ],
    },
  ];

  const handleAddQuestionnaire = (data) => {
    console.log("New Questionnaire:", data);
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
      questionnaire.questions.some((q) =>
        q.toLowerCase().includes(searchQuerySend.toLowerCase())
      );
    return matchesSearch;
  };

  const toggleExpand = (id) => {
    setExpandedQuestionnaires((prev) =>
      prev.includes(id) ? prev.filter((qid) => qid !== id) : [...prev, id]
    );
  };

  const filteredQuestionnaires =
    questionnairesData.filter(filterQuestionnaires);

  return (
    <div className="space-y-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
      <Toaster position="top-right" />

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
        {filteredQuestionnaires.length > 0 ? (
          filteredQuestionnaires.map((questionnaire) => {
            const isExpanded = expandedQuestionnaires.includes(
              questionnaire.id
            );
            const visibleQuestions = isExpanded
              ? questionnaire.questions
              : questionnaire.questions.slice(0, 3);

            return (
              <div key={questionnaire.id} className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl">{questionnaire.title}</h3>
                    <span className="text-gray-500">{questionnaire.type}</span>
                  </div>
                  <button className="bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white px-4 py-2 rounded-full flex gap-1">
                    <SendDialog />
                  </button>
                </div>
                <ul className="list-disc ml-6 mt-2 text-gray-700">
                  {visibleQuestions.map((question, i) => (
                    <li key={i}>{question}</li>
                  ))}
                </ul>
                {questionnaire.questions.length > 3 && (
                  <button
                    onClick={() => toggleExpand(questionnaire.id)}
                    className="text-[#33c9a7] pl-2 underline text-sm mt-2"
                  >
                    {isExpanded
                      ? "Show less"
                      : `+${questionnaire.questions.length - 3} more questions`}
                  </button>
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
