import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SendQuestionnaireTab from "./SendQuestionnaireTab";
import ResultsTab from "./ResultsTab";
import ReportsTab from "./ReportsTab";

const tabs = ["Send Questionnaire", "Results", "Reports"];

const QuestionnaireTabs = () => {
  const [activeTab, setActiveTab] = useState("Send Questionnaire");
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [selectedDate, setSelectedDate] = useState("All Dates");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab") || "Send Questionnaire";
    if (tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
      setSelectedClient("All Clients");
      setSelectedDate("All Dates");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedClient("All Clients");
    setSelectedDate("All Dates");
    setSearchParams({ tab });
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center space-x-4 mb-6">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`relative overflow-hidden inline-flex items-center justify-center w-full rounded-full px-6 py-3 font-medium transition-all duration-200 text-[14px] text-white ${
                isActive
                  ? "bg-gradient-to-r from-red-500 to-orange-400"
                  : "bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5]"
              }`}
            >
              <span className="relative z-10">{tab}</span>
            </button>
          );
        })}
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