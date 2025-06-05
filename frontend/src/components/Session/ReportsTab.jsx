import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { FaMagnifyingGlass, FaAngleRight } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const reportsData = [
  {
    id: 1,
    title: "Leadership Development Focus Areas",
    client: "Sarah Johnson",
    type: "Pre-Session Analysis",
    date: "2025-06-24",
    summary:
      "Analysis of delegation challenges and team trust building opportunities.",
  },
  {
    id: 2,
    title: "Career Transition Strategy Pre-Session Analysis",
    client: "Michael Chen",
    type: "Initial Assessment",
    date: "2025-06-23",
    summary:
      "Comprehensive evaluation of career goals and transition readiness.",
  },
  {
    id: 3,
    title: "Q2 Leadership Development Initial Assessment",
    client: "Elena Rodriguez",
    type: "Pre-Session Analysis",
    date: "2025-06-22",
    summary: "Quarterly progress review on key leadership competencies.",
  },
];

const ReportsTab = ({
  selectedClient,
  setSelectedClient,
  selectedDate,
  setSelectedDate,
}) => {
  const [searchQueryReports, setSearchQueryReports] = useState("");

  const filterReports = (report) => {
    const matchesClient =
      selectedClient === "All Clients" || report.client === selectedClient;
    const matchesDate =
      selectedDate === "All Dates" || report.date === selectedDate;
    const matchesSearch =
      searchQueryReports === "" ||
      report.title.toLowerCase().includes(searchQueryReports.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchQueryReports.toLowerCase()) ||
      report.client.toLowerCase().includes(searchQueryReports.toLowerCase());

    return matchesClient && matchesDate && matchesSearch;
  };

  const filteredReports = reportsData.filter(filterReports);

  return (
    <div className="space-y-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
      <Helmet>
        <title>Questionnaire Analysis Reports - NextGenCoach</title>
        <meta name="description" content="Analysed reports of the the questionnaire and its answers" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <h2 className="text-xl font-semibold mb-2">AI-Generated Reports</h2>

      <div className="flex justify-between items-center gap-4 py-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQueryReports}
            onChange={(e) => setSearchQueryReports(e.target.value)}
            className="w-full rounded-lg bg-white placeholder:font-medium shadow py-3 px-12 border-2 border-white focus:border-2 focus:border-cyan-400 outline-none transition"
          />
          <div className="absolute top-4 left-4">
            <FaMagnifyingGlass size={18} className="text-gray-400" />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            className="py-3 px-8 rounded-lg bg-white shadow border-2 border-white focus:border-2 focus:border-cyan-400 outline-none transition"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option>All Clients</option>
            <option>Sarah Johnson</option>
            <option>Michael Chen</option>
            <option>Elena Rodriguez</option>
          </select>
          <select
            className="py-3 px-8 rounded-lg bg-white shadow border-2 border-white focus:border-2 focus:border-cyan-400 outline-none transition"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option>All Dates</option>
            <option>2025-06-24</option>
            <option>2025-06-23</option>
            <option>2025-06-22</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md group transition hover:bg-[#33c9a7] hover:text-white"
            >
              <Link to="ai-generated" className="block">
                <div className="flex justify-between items-start ">
                  <div>
                    <h3 className="font-bold text-xl flex items-center gap-2 group-hover:text-white">
                      <CgNotes className="text-[#166534] text-lg group-hover:text-red-500" />
                      {report.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1.5 font-medium group-hover:text-white">
                      {report.client}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 font-medium group-hover:text-white">
                      {report.date}
                    </p>
                    <p className="text-gray-600 mt-1 group-hover:text-white">
                      {report.summary}
                    </p>
                  </div>
                  <div className="flex justify-start items-center gap-6 group-hover:text-white">
                    <p className="text-[#16a181] bg-[#6efbda67] px-4 py-1 font-medium rounded-full text-[13px]">
                      {report.type}
                    </p>
                    <FaAngleRight className="text-gray-500 group-hover:text-white" />
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-gray-500">
              No reports found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsTab;
