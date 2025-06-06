import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CgNotes } from "react-icons/cg";
import { FaMagnifyingGlass, FaAngleRight } from "react-icons/fa6";
import { Helmet } from "react-helmet";
import axios from "axios";

const ReportsTab = ({ token }) => {
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [selectedDate, setSelectedDate] = useState("All Dates");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/questionnaires/:id/report",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReports(res.data);
      } catch (error) {
        console.error("Failed to fetch reports", error);
      }
    };

    fetchReports();
  }, [token]);

  const uniqueClients = [
    "All Clients",
    ...new Set(reports.map((r) => r.client?.name).filter(Boolean)),
  ];
  const uniqueDates = [
    "All Dates",
    ...new Set(reports.map((r) => r.date?.split("T")[0])),
  ];

  const filteredReports = reports.filter((report) => {
    const matchesClient =
      selectedClient === "All Clients" || report.client?.name === selectedClient;
    const matchesDate =
      selectedDate === "All Dates" || report.date?.startsWith(selectedDate);
    const matchesSearch =
      searchQuery === "" ||
      report.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.client?.name?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesClient && matchesDate && matchesSearch;
  });

  return (
    <div className="space-y-6 bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-6">
      <Helmet>
        <title>AI-Generated Reports - NextGenCoach</title>
        <meta
          name="description"
          content="Analysed reports of the questionnaire and its answers"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <h2 className="text-xl font-semibold mb-2">AI-Generated Reports</h2>

      <div className="flex justify-between items-center gap-4 py-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search reports..."
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
            className="py-3 px-8 rounded-lg bg-white shadow border-2 border-white focus:border-2 focus:border-cyan-400 outline-none transition"
            value={selectedClient}
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            {uniqueClients.map((client) => (
              <option key={client}>{client}</option>
            ))}
          </select>
          <select
            className="py-3 px-8 rounded-lg bg-white shadow border-2 border-white focus:border-2 focus:border-cyan-400 outline-none transition"
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
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <div
              key={report._id}
              className="bg-white rounded-lg shadow p-4 hover:shadow-md group transition hover:bg-[#33c9a7] hover:text-white"
            >
              <Link to={`/reports/${report._id}`} className="block">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-xl flex items-center gap-2 group-hover:text-white">
                      <CgNotes className="text-[#166534] text-lg group-hover:text-red-500" />
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1.5 font-medium group-hover:text-white">
                      {report.client?.name}
                    </p>
                    <p className="text-sm text-gray-500 mt-1 font-medium group-hover:text-white">
                      {report.date?.split("T")[0]}
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
            <p className="text-gray-500">No reports found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsTab;
