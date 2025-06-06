import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgNotes } from "react-icons/cg";
import { RiUserLine } from "react-icons/ri";
import { RxCalendar } from "react-icons/rx";
import { FaMagnifyingGlass, FaAngleRight } from "react-icons/fa6";
import { Helmet } from "react-helmet";

const ResultsTab = ({ token }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [selectedDate, setSelectedDate] = useState("All Dates");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/questionnaires/:id/results",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const completed = res.data.filter((q) => q.status === "completed");
        setResults(completed);
      } catch (error) {
        console.error("Failed to fetch questionnaire results", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [token]);

  const uniqueClients = [
    "All Clients",
    ...new Set(results.map((r) => r.client?.name).filter(Boolean)),
  ];
  const uniqueDates = [
    "All Dates",
    ...new Set(results.map((r) => r.completedDate?.split("T")[0])),
  ];

  const filteredResults = results.filter((result) => {
    const matchesClient =
      selectedClient === "All Clients" ||
      result.client?.name === selectedClient;
    const matchesDate =
      selectedDate === "All Dates" ||
      result.completedDate?.startsWith(selectedDate);
    const matchesSearch =
      searchQuery === "" ||
      result.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.client?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClient && matchesDate && matchesSearch;
  });

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Unknown time";

    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="space-y-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
      <Helmet>
        <title>Questionnaire Results - NextGenCoach</title>
        <meta
          name="description"
          content="Results obtained from the clients for the sent questionnaire"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <h2 className="text-xl font-semibold mb-4">Questionnaire Results</h2>

      <div className="flex justify-between items-center gap-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search results..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            {uniqueClients.map((client) => (
              <option key={client}>{client}</option>
            ))}
          </select>
          <select
            className="bg-white px-8 py-3 rounded-lg shadow border-2 border-white focus:border-2 focus:border-cyan-400 outline-none transition"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {uniqueDates.map((date) => (
              <option key={date}>{date}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-gray-500">Loading results...</p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="bg-white rounded-lg p-6 text-center">
            <p className="text-gray-500">
              No results found matching your criteria
            </p>
          </div>
        ) : (
          filteredResults.map((entry) => (
            <Link
              to={`/session/question-response/${entry._id}`}
              key={entry._id}
              className="bg-white rounded-lg p-4 flex justify-between items-center hover:shadow-md transition group hover:bg-[#33c9a7] hover:text-white"
            >
              <div>
                <div className="flex items-center gap-3 pb-2">
                  <RiUserLine className="text-[#16a181] group-hover:text-white" />
                  <h1 className="text-xl font-semibold group-hover:text-white">
                    {entry.client?.name || "Unknown Client"}
                  </h1>
                  <p className="text-sm px-3 rounded-full text-[#166534] bg-[#dcfce7]">
                    {entry.status}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <h1 className="text-sm text-gray-500 flex items-center gap-2 group-hover:text-white">
                    <CgNotes />
                    {entry.title}
                  </h1>
                  <p className="text-sm text-gray-500 flex items-center gap-2 group-hover:text-white">
                    <RxCalendar />
                    {entry.completedDate?.split("T")[0]}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 flex items-center font-medium gap-4 group-hover:text-white">
                Completed {formatTimeAgo(entry.completedDate)} <FaAngleRight />
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ResultsTab;
