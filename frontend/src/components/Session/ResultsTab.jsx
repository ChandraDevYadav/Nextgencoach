import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { RiUserLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { FaMagnifyingGlass, FaAngleRight } from "react-icons/fa6";

const resultsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    status: "completed",
    form: "Pre-Session Check-in",
    date: "2025-06-24",
    updated: "2 hours ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    status: "completed",
    form: "Leadership Assessment",
    date: "2025-06-23",
    updated: "1 day ago",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    status: "pending",
    form: "Initial Intake Form",
    date: "2025-06-22",
    updated: "3 days ago",
  },
];

const ResultsTab = ({
  selectedClient,
  setSelectedClient,
  selectedDate,
  setSelectedDate,
}) => {
  const [searchQueryResults, setSearchQueryResults] = useState("");

  const filterResults = (result) => {
    const matchesClient =
      selectedClient === "All Clients" || result.name === selectedClient;
    const matchesDate =
      selectedDate === "All Dates" || result.date === selectedDate;
    const matchesSearch =
      searchQueryResults === "" ||
      result.name.toLowerCase().includes(searchQueryResults.toLowerCase()) ||
      result.form.toLowerCase().includes(searchQueryResults.toLowerCase());

    return matchesClient && matchesDate && matchesSearch;
  };

  const filteredResults = resultsData.filter(filterResults);

  return (
    <div className="space-y-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Questionnaire Results</h2>

      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search results..."
            value={searchQueryResults}
            onChange={(e) => setSearchQueryResults(e.target.value)}
            className="w-full rounded-lg bg-white placeholder:font-medium shadow py-3 px-12 border-2 border-white focus:border-2 focus:border-cyan-400 outline-none transition"
          />
          <div className="absolute top-4 left-4">
            <FaMagnifyingGlass size={18} className="text-gray-400" />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            className="bg-white px-8 py-3 rounded-lg shadow border-2 border-white focus:border-2 focus:border-cyan-400 outline-none transition"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            <option>All Clients</option>
            <option>Sarah Johnson</option>
            <option>Michael Chen</option>
            <option>Elena Rodriguez</option>
          </select>
          <select
            className="bg-white px-8 py-3 rounded-lg shadow border-2 border-white focus:border-2 focus:border-cyan-400 outline-none transition"
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
        {filteredResults.length > 0 ? (
          filteredResults.map((entry) => (
            <Link
              to="question-response"
              key={entry.id}
              className="bg-white rounded-lg p-4 flex justify-between items-center hover:shadow-md transition group hover:bg-[#33c9a7] hover:text-white"
            >
              <div>
                <div className="flex items-center gap-3 pb-2">
                  <RiUserLine className="text-[#16a181] group-hover:text-white" />
                  <h1 className="text-xl font-semibold group-hover:text-white">
                    {entry.name}
                  </h1>
                  <p
                    className={`text-sm px-3 rounded-full  ${
                      entry.status === "completed"
                        ? "text-[#166534] bg-[#dcfce7]"
                        : "text-[#9a3412] bg-[#ffedd5]"
                    }`}
                  >
                    {entry.status}
                  </p>
                </div>
                <div className="flex items-center gap-4 ">
                  <h1 className="text-sm text-gray-500 flex items-center gap-2 group-hover:text-white">
                    <CgNotes />
                    {entry.form}
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-2 group-hover:text-white">
                    <RxCalendar />
                    {entry.date}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 flex items-center font-medium gap-4">
                Updated {entry.updated} <FaAngleRight />
              </p>
            </Link>
          ))
        ) : (
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-gray-500">
              No results found matching your criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsTab;
