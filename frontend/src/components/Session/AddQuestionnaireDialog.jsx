import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RxCross2 } from "react-icons/rx";
import { IoAdd } from "react-icons/io5";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const AddQuestionnaireDialog = ({ isOpen, onClose, onSubmit }) => {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("pre-session");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setTitle("");
    setCategory("pre-session");
    setQuestions([]);
    setNewQuestion("");
  };

  const addQuestion = () => {
    if (newQuestion.trim()) {
      setQuestions([...questions, newQuestion.trim()]);
      setNewQuestion("");
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!title.trim() || !category.trim()) {
      toast.error("Please fill in the title and category.");
      return;
    }

    if (questions.length === 0) {
      toast.error("Please add at least one question.");
      return;
    }

    const formattedQuestions = questions.map((q) => ({
      questionText: q,
    }));

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/questionnaires",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            type: category,
            isTemplate: false,
            questions: formattedQuestions,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create questionnaire");

      toast.success("Questionnaire created successfully!");
      onSubmit(data);
      resetForm();
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to create questionnaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center bg-black/90 z-50 px-4">
      <Helmet>
        <title>Add Questionnaire - NextGenCoach</title>
        <meta
          name="description"
          content="Add and create a template of questions to send to clients"
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>

      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative mt-12">
        {/* Close button */}
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          aria-label="Close dialog"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <RxCross2 size={24} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Questionnaire
        </h2>

        {/* Title input */}
        <label className="block mb-3">
          <span className="text-gray-700 font-medium mb-1 block">Title</span>
          <input
            type="text"
            placeholder="Questionnaire Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
          />
        </label>

        {/* Category select */}
        <label className="block mb-6">
          <span className="text-gray-700 font-medium mb-1 block">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-3 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
          >
            <option value="intake">Initial Intake Form</option>
            <option value="pre-session">Pre-Session Check-in</option>
          </select>
        </label>

        {/* Questions input and add button */}
        <div className="mb-4">
  <label className="block text-gray-700 font-medium mb-2">Questions</label>
  <div className="relative">
    <input
      type="text"
      placeholder="Enter a question"
      value={newQuestion}
      onChange={(e) => setNewQuestion(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          addQuestion();
        }
      }}
      className="w-full border border-gray-300 rounded-md p-3 pr-12 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition"
    />
    <button
      onClick={addQuestion}
      type="button"
      aria-label="Add question"
      className="absolute top-1/2 right-2 -translate-y-1/2 bg-gradient-to-r from-[#33c9a7] to-[#3ba7f5] hover:from-[#28b89a] hover:to-[#3399f0] text-white rounded-full p-2 flex items-center justify-center transition"
    >
      <IoAdd size={20} />
    </button>
  </div>
</div>


        {/* Questions list */}
        {questions.length > 0 && (
          <ul className="mb-6 max-h-48 overflow-auto border border-gray-200 rounded-md p-3 space-y-2 bg-gray-50">
            {questions.map((q, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-white rounded-md p-2 shadow-sm"
              >
                <span className="text-gray-800">{q}</span>
                <button
                  onClick={() =>
                    setQuestions(questions.filter((_, i) => i !== index))
                  }
                  aria-label={`Remove question ${index + 1}`}
                  className="text-red-500 hover:text-red-700 transition"
                >
                  <RxCross2 size={18} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`relative overflow-hidden inline-flex items-center justify-center w-full rounded-full px-6 py-3 font-medium text-white transition-all duration-200 ${
            isSubmitting
              ? "bg-gradient-to-r from-cyan-300 to-cyan-400 cursor-not-allowed"
              : "bg-gradient-to-r from-red-500 to-orange-400 hover:from-red-600 hover:to-orange-500"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Questionnaire"}
        </button>
      </div>
    </div>
  );
};

export default AddQuestionnaireDialog;
