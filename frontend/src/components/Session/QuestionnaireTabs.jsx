import React, { useState } from "react";
import SendQuestionnaireTab from "./SendQuestionnaireTab";
import ResultsTab from "./ResultsTab";
import ReportsTab from "./ReportsTab";

const tabs = ["Send Questionnaire", "Results", "Reports"];

const QuestionnaireTabs = () => {
  const [activeTab, setActiveTab] = useState("Send Questionnaire");
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [selectedDate, setSelectedDate] = useState("All Dates");

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative overflow-hidden inline-flex items-center justify-center w-full rounded-full px-6 py-3 font-medium transition-all duration-200 group ${
              activeTab === tab ? "text-white" : "text-gray-600"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out z-10"></div>
            <span className="relative z-20 transition-colors duration-300 group-hover:text-white">
              {tab}
            </span>
          </button>
        ))}
      </div>

      {activeTab === "Send Questionnaire" && <SendQuestionnaireTab />}

      {activeTab === "Results" && (
        <ResultsTab
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}

      {activeTab === "Reports" && (
        <ReportsTab
          selectedClient={selectedClient}
          setSelectedClient={setSelectedClient}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </div>
  );
};

export default QuestionnaireTabs;
