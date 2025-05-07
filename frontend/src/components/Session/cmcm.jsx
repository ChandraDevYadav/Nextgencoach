import React, { useState } from "react";

const defaultQuestionnaires = [
  {
    title: "Initial Intake Form",
    tag: "intake",
    questions: [
      "What brings you to coaching at this time?",
      "What are your top 3 goals for our coaching relationship?",
      "How would you describe your leadership style?",
      "How do you prefer to receive feedback?",
      "What support do you need to be successful?",
    ],
  },
  {
    title: "Pre-Session Check-in",
    tag: "pre-session",
    questions: [
      "What would you like to focus on in our upcoming session?",
      "What progress have you made since our last session?",
      "What challenges are you currently facing?",
      "What support would help you overcome these challenges?",
      "How are you feeling about your progress overall?",
    ],
  },
];

export default function QuestionnaireManager() {
  const [questionnaires, setQuestionnaires] = useState(defaultQuestionnaires);
  const [search, setSearch] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newQuestions, setNewQuestions] = useState([""]);
  const [selected, setSelected] = useState(null);

  const handleAddQuestionnaire = () => {
    const trimmedQuestions = newQuestions.filter((q) => q.trim() !== "");
    if (!newTitle || !newTag || trimmedQuestions.length === 0) return;
    setQuestionnaires([
      ...questionnaires,
      { title: newTitle, tag: newTag, questions: trimmedQuestions },
    ]);
    setNewTitle("");
    setNewTag("");
    setNewQuestions([""]);
  };

  const filtered = questionnaires.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📝 Questionnaires</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search questionnaires..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {filtered.map((q, i) => (
          <div
            key={i}
            className={`border rounded p-4 cursor-pointer ${
              selected?.title === q.title ? "bg-blue-100" : ""
            }`}
            onClick={() => setSelected(q)}
          >
            <h2 className="text-lg font-semibold">{q.title}</h2>
            <p className="text-sm text-gray-500">{q.tag}</p>
          </div>
        ))}
      </div>

      {/* Selected Questionnaire */}
      {selected && (
        <div className="mb-6 border rounded p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">{selected.title}</h3>
          <ul className="list-disc list-inside space-y-1 mb-4">
            {selected.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
          <button
            onClick={() => alert("Sent:\n\n" + selected.questions.join("\n"))}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      )}

      {/* New Questionnaire Form */}
      <div className="border rounded p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold mb-2">➕ New Questionnaire</h2>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Tag"
          className="w-full p-2 border rounded mb-2"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
        {newQuestions.map((q, i) => (
          <input
            key={i}
            type="text"
            placeholder={`Question ${i + 1}`}
            className="w-full p-2 border rounded mb-2"
            value={q}
            onChange={(e) => {
              const copy = [...newQuestions];
              copy[i] = e.target.value;
              setNewQuestions(copy);
            }}
          />
        ))}
        <button
          className="text-sm text-blue-600 mb-2"
          onClick={() => setNewQuestions([...newQuestions, ""])}
        >
          + Add another question
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleAddQuestionnaire}
        >
          Save Questionnaire
        </button>
      </div>
    </div>
  );
}
