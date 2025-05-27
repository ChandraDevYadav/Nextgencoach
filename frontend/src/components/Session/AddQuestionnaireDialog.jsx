import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RxCross2 } from "react-icons/rx";
import { IoAdd } from "react-icons/io5";
import toast from "react-hot-toast";

const AddQuestionnaireDialog = ({ isOpen, onClose, onSubmit }) => {
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("pre-session");
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");

  const handleSubmit = async () => {
    if (!title.trim() || !category.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const response = await fetch(
        "https://api.testir.xyz/server26/api/questionnaires",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            type: category,
            questions,
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
    }
  };

  const resetForm = () => {
    setTitle("");
    setCategory("pre-session");
    setQuestions([]);
    setNewQuestion("");
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions((prev) => [...prev, newQuestion.trim()]);
      setNewQuestion("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex bg-black/90 items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold mb-4">Add New Questionnaire</h2>
          <button onClick={onClose} className="text-gray-800">
            <RxCross2 />
          </button>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Questionnaire Title"
            className="w-full border border-gray-500 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="text-[16px] w-full p-2 text-gray-700 bg-white border rounded mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="intake">Initial Intake Form</option>
            <option value="pre-session">Pre-Session Check-in</option>
          </select>

          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter a question"
                className="w-full border border-gray-500 p-2 rounded"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <button
                onClick={addQuestion}
                className="bg-green-600 text-white px-3 rounded hover:bg-green-700"
              >
                <IoAdd />
              </button>
            </div>

            {questions.length > 0 && (
              <ul className="list-disc ml-5 text-sm text-gray-700">
                {questions.map((q, index) => (
                  <li key={index}>{q}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded flex gap-1 items-center bg-blue-600 hover:bg-[#16a181] text-white"
          >
            <IoAdd className="text-lg" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionnaireDialog;
