import React, { useState } from "react";
import AddQuestionnaireDialog from "./AddQuestionnaireDialog";
import { Link } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { RiUserLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { FaAngleRight } from "react-icons/fa";
import SendDialog from "./SendDialog";

const tabs = ["Send Questionnaire", "Results", "Reports"];

const QuestionnaireTabs = () => {
  const [activeTab, setActiveTab] = useState("Send Questionnaire");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddQuestionnaire = (data) => {
    console.log("New Questionnaire:", data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 p-4">
      {/* Tab Buttons */}
      <div className="flex justify-between items-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`inline-flex items-center justify-center w-full rounded-full px-6 py-3 font-medium transition-all duration-200 bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white ${
              activeTab === tab
                ? "bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Send Questionnaire" && (
        <div className="space-y-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-2">Questionnaires</h2>
              <div>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="mb-4 px-4 py-2 rounded bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white"
                >
                  + Add Questionnaire
                </button>

                <AddQuestionnaireDialog
                  isOpen={isDialogOpen}
                  onClose={() => setIsDialogOpen(false)}
                  onSubmit={handleAddQuestionnaire}
                />
              </div>
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search questionnaires..."
                className="w-full rounded-lg bg-white p-2"
              />
            </div>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl">Initial Intake Form</h3>
                    <span className="text-[16px] text-gray-500">Intake</span>
                  </div>
                  <button className="bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white px-4 py-2 rounded-full flex justify-center items-center gap-1">
                  <SendDialog />
                  </button>
                </div>
                <div className="mt-2">
                  <ul className="list-disc ml-6 mt-2 text-[16px] leading-relaxed text-gray-700">
                    <li>What brings you to coaching at this time?</li>
                    <li>
                      What are your top 3 goals for our coaching relationship?
                    </li>
                    <li>How would you describe your leadership style?</li>
                  </ul>
                  <Link to="" className="text-[#33c9a7] pl-2">
                    +2 more questions
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl">Pre-Session Check-in</h3>
                    <span className="text-[16px] text-gray-500">
                      Pre-session
                    </span>
                  </div>
                  <button className="bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] text-white px-4 py-2 rounded-full flex justify-center items-center gap-1">
                  <SendDialog />
                  </button>
                </div>
                <div className="mt-2">
                  <ul className="list-disc ml-6 mt-2 text-[16px] leading-relaxed text-gray-700">
                    <li>
                      What would you like to focus on in our upcoming session?
                    </li>
                    <li>What progress have you made since our last session?</li>
                    <li>What challenges are you currently facing?</li>
                  </ul>
                  <Link to="" className="text-[#33c9a7] pl-2">
                    +2 more questions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Results" && (
        <div className="space-y-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Questionnaire Results</h2>
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search results..."
              className="w-full rounded-lg bg-white p-2 mb-4"
            />
            <div className="flex gap-4 mb-4">
              <select className="bg-white px-8 py-2 rounded-lg">
                <option>All Clients</option>
              </select>
              <select className="bg-white px-8 py-2 rounded-lg">
                <option>All Dates</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            {[
              {
                name: "Sarah Johnson",
                status: "completed",
                form: "Pre-Session Check-in",
                date: "2025-06-24",
                updated: "2 hours ago",
              },
              {
                name: "Michael Chen",
                status: "completed",
                form: "Leadership Assessment",
                date: "2025-06-23",
                updated: "1 day ago",
              },
              {
                name: "Elena Rodriguez",
                status: "pending",
                form: "Initial Intake Form",
                date: "2025-06-22",
                updated: "3 days ago",
              },
            ].map((entry, index) => (
              <Link
                to="question-response"
                key={index}
                className="bg-white rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <div className="flex justify-start items-center gap-3">
                    <RiUserLine />
                    <h1 className="text-xl font-semibold">{entry.name}</h1>
                    <p className="text-sm px-3 rounded-full text-[#166534] bg-[#dcfce7]">
                      {entry.status}
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-2 mt-2">
                    <CgNotes />
                    <h1>{entry.form}</h1>
                    <p className="text-sm text-gray-500 flex justify-start items-center gap-2">
                      <RxCalendar />
                      {entry.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[16px] text-gray-400">
                    Updated {entry.updated}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Reports" && (
        <div className="space-y-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-2">AI-Generated Reports</h2>
          <div className="flex justify-between items-center gap-4">
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full rounded-lg bg-white shadow p-2 mb-4"
            />
            <div className="flex gap-4 mb-4">
              <select className="py-2 px-8 rounded-lg shadow bg-white">
                <option>All Clients</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                title: "Leadership Development Focus Areas",
                client: "Sarah Johnson",
                date: "2025-06-24",
                summary:
                  "Analysis of delegation challenges and team trust building opportunities.",
              },
              {
                title: "Pre-Session Analysis",
                client: "Michael Chen",
                date: "2025-06-23",
                summary:
                  "Comprehensive evaluation of career goals and transition readiness.",
              },
              {
                title: "Initial Assessment",
                client: "Elena Rodriguez",
                date: "2025-06-22",
                summary:
                  "Quarterly progress review on key leadership competencies.",
              },
            ].map((report, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <Link to="ai-generated">
                  <div className="flex justify-between items-center gap-4">
                    <h3 className="font-bold text-xl flex justify-start items-center gap-2">
                      <CgNotes className="text-[#166534] text-lg" />
                      {report.title}
                    </h3>
                    <div className="flex justify-start items-center gap-4">
                      <p className="bg-[#dcfce7] text-[#166534] px-4 py-[2px] rounded-full">
                        Pre-Session Analysis
                      </p>
                      <FaAngleRight />
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    <p className="mt-2">{report.client}</p>
                    <p className="mt-2">{report.date}</p>
                  </div>
                  <p className="mt-2 text-gray-700">{report.summary}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionnaireTabs;
