import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiCalendar } from "react-icons/fi";
import { GrNotes } from "react-icons/gr";
import { FaAngleRight, FaArrowLeftLong } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";

const sessions = [
  {
    client: "Sarah Johnson",
    status: "analyzed",
    type: "Leadership Development",
    date: "2025-06-24",
    summary: "Focus on delegation challenges and team trust building",
    duration: "60 min",
    updated: "2 hours ago",
    analysis: "AI Analysis Available",
    insights: {
      overview: `60-minute coaching session focused on delegation challenges and team trust building. The client demonstrated significant progress in recognizing patterns and showed openness to implementing new leadership strategies.`,
      strengths: [
        "Strong self-awareness and reflection abilities",
        "Open to feedback and new perspectives",
        "Clear articulation of challenges",
        "Proactive in seeking solutions",
      ],
      development: [
        "Tendency to micromanage",
        "Difficulty delegating important tasks",
        "Perfectionist mindset limiting team growth",
        "Stress management in high-pressure situations",
      ],
      analysis: {
        questions:
          "Strong use of open-ended questions that promoted deeper reflection",
        listening:
          "Excellent reflection and summarization of client's statements",
        goalFocus:
          "Good alignment with client's objectives, could be more specific in action planning",
      },
      recommendations: [
        "Focus on practical delegation frameworks and trust-building exercises",
        "Explore underlying beliefs about control and perfectionism",
        "Develop specific metrics for measuring successful delegation",
        "Practice stress management techniques during decision-making",
      ],
      nextQuestions: [
        "How have you experimented with delegation since our last session?",
        "What specific fears come up when you think about letting go of control?",
        "How might your team's performance surprise you if given more autonomy?",
        "What would success look like in terms of work-life balance?",
        "How can we measure progress in building trust with your team?",
      ],
    },
  },
  {
    client: "Michael Chen",
    status: "analyzed",
    type: "Career Transition",
    date: "2025-06-20",
    summary: "Exploration of values and career direction during role change",
    duration: "75 min",
    updated: "1 day ago",
    analysis: "AI Analysis Available",
    insights: {
      overview: `75-minute coaching session centered around navigating a career transition. The client explored personal values, strengths, and long-term aspirations to clarify direction.`,
      strengths: [
        "High level of introspection and self-awareness",
        "Willingness to challenge assumptions",
        "Clear articulation of desired career outcomes",
        "Strong motivation to take ownership of next steps",
      ],
      development: [
        "Fear of failure when considering new opportunities",
        "Limited professional network in target industry",
        "Uncertainty in communicating personal brand",
        "Tendency to overanalyze and delay action",
      ],
      analysis: {
        questions: "Questions encouraged value exploration and self-discovery",
        listening: "Good use of silence and space to allow deeper processing",
        goalFocus: "Session effectively clarified career objectives",
      },
      recommendations: [
        "Map key transferable skills to desired roles",
        "Identify top 5 companies of interest and begin outreach",
        "Practice elevator pitch for networking settings",
        "Set SMART goals for next 30 days",
      ],
      nextQuestions: [
        "What small step can you take this week toward your new direction?",
        "Which of your strengths are most aligned with your target role?",
        "How do your core values show up in your ideal job?",
        "What’s one belief about change you’re ready to challenge?",
        "What support systems can you tap into during this transition?",
      ],
    },
  },
  {
    client: "Aisha Patel",
    status: "analyzed",
    type: "Emotional Intelligence",
    date: "2025-06-18",
    summary: "Developing empathy and self-regulation in leadership scenarios",
    duration: "60 min",
    updated: "3 days ago",
    analysis: "AI Analysis Available",
    insights: {
      overview: `60-minute coaching session aimed at enhancing emotional intelligence, particularly empathy and self-regulation in conflict situations. The client engaged deeply and reflected on past interactions.`,
      strengths: [
        "Strong ability to identify emotional triggers",
        "Active effort to apply empathy in team dynamics",
        "Openness to learning new emotional regulation techniques",
        "Positive response to feedback",
      ],
      development: [
        "Reacting defensively under stress",
        "Difficulty staying neutral in emotionally charged conversations",
        "Limited vocabulary for emotional expression",
        "Challenges in balancing empathy with accountability",
      ],
      analysis: {
        questions:
          "Effective probing around emotional responses and behavior patterns",
        listening: "Empathic responses and validation supported client growth",
        goalFocus:
          "Session aligned with emotional intelligence development goals",
      },
      recommendations: [
        "Implement daily self-reflection exercises for emotional triggers",
        "Use emotion wheel to expand emotional vocabulary",
        "Role-play difficult conversations with a focus on empathy",
        "Introduce mindfulness techniques before team meetings",
      ],
      nextQuestions: [
        "What situation this week tested your emotional regulation?",
        "How did you demonstrate empathy in a recent conversation?",
        "What emotion do you struggle to express most clearly?",
        "What role does empathy play in your leadership identity?",
        "How can mindfulness help in managing team dynamics?",
      ],
    },
  },
];

const CoachingFeedback = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [selectedClient, setSelectedClient] = useState("All Clients");
  const [selectedDate, setSelectedDate] = useState("All Dates");

  const handleClick = (session) => {
    navigate("/feedback/session-insights", { state: session });
  };

  const filteredSessions = sessions.filter((session) => {
    const matchesSearch = session.client
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const matchesClient =
      selectedClient === "All Clients" || session.client === selectedClient;
    const matchesDate =
      selectedDate === "All Dates" || session.date === selectedDate;
    return matchesSearch && matchesClient && matchesDate;
  });

  const uniqueClients = [...new Set(sessions.map((s) => s.client))];
  const uniqueDates = [...new Set(sessions.map((s) => s.date))];

  return (
    <div
      className="relative min-h-screen bg-cover bg-bottom"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-lg z-0 rounded-lg" />

      <div className="relative z-10 max-w-4xl mx-auto py-10 rounded-lg">
        <div className="px-4 pb-6">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-red-600 hover:underline text-[17px] font-medium flex justify-start items-center gap-2"
          >
            <FaArrowLeftLong /> Back to Home
          </button>
        </div>

        <div className="bg-white/70 px-6 py-8 rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-black">
            Coaching Sessions
          </h1>

          <div className="flex flex-wrap gap-4 items-center mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <FiSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search sessions..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full border-2 border-white shadow bg-white rounded pl-10 pr-4 py-2 focus:border-2 focus:border-cyan-400 outline-none transition"
              />
            </div>

            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="border-2 border-white shadow bg-white rounded px-4 py-2 focus:border-2 focus:border-cyan-400 outline-none transition"
            >
              <option>All Clients</option>
              {uniqueClients.map((client, idx) => (
                <option key={idx}>{client}</option>
              ))}
            </select>

            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-2 border-white shadow bg-white rounded px-4 py-2 focus:border-2 focus:border-cyan-400 outline-none transition"
            >
              <option>All Dates</option>
              {uniqueDates.map((date, idx) => (
                <option key={idx}>{date}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            {filteredSessions.length > 0 ? (
              filteredSessions.map((session, idx) => (
                <div
                  key={idx}
                  onClick={() => handleClick(session)}
                  className="cursor-pointer bg-white/70 shadow-sm rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between transition group hover:bg-[#33c9a7] hover:text-white"
                >
                  <div>
                    <div className="flex justify-start items-center gap-2">
                      <FiUser className="text-[#33C9A7] mt-1 text-lg group-hover:text-white" />
                      <p className="font-semibold text-xl">{session.client}</p>
                      <p className="px-4 py-[3px] rounded-full text-xs text-[#33C9A7] bg-[#35f8ca42] group-hover:bg-cyan-400 group-hover:text-white">
                        {session.status}
                      </p>
                    </div>
                    <div className="flex justify-start items-center gap-4 mt-3">
                      <p className="text-sm font-medium text-gray-600 flex justify-start items-center gap-2 group-hover:text-white">
                        <GrNotes className="text-lg" />
                        {session.type}
                      </p>
                      <p className="text-sm flex justify-start text-gray-600 font-medium items-center gap-2 group-hover:text-white">
                        <FiCalendar className="text-lg" />
                        {session.date}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-[15px] text-gray-700 group-hover:text-white">
                        {session.summary}
                      </p>
                      <p className="font-medium text-sm mt-2 text-[#33C9A7] flex justify-start items-center gap-2 group-hover:text-white">
                        <LuBrain />
                        {session.analysis}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end items-center gap-3 sm:mt-0">
                    <div>
                      <p className="text-sm text-gray-500 text-end group-hover:text-white">
                        {session.duration}
                      </p>
                      <p className="text-sm text-gray-500 group-hover:text-white">
                        Updated {session.updated}
                      </p>
                    </div>
                    <div>
                      <FaAngleRight className="text-gray-500 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No sessions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachingFeedback;
