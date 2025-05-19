import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RxCross2 } from "react-icons/rx";
import { IoAdd } from "react-icons/io5";
import toast from "react-hot-toast";

const AddQuestionnaireDialog = ({ isOpen, onClose, onSubmit }) => {
  const { token } = useAuth(); 

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Pre-session");
  const [isTemplate, setIsTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleSubmit = async () => {
  if (!title.trim() || !category.trim()) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/questionnaires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        type: category,
        title,
        questions,
        isTemplate,
        templateName: isTemplate ? templateName : undefined,
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "Failed to create questionnaire");
    
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
    setCategory("Pre-session");
    setIsTemplate(false);
    setTemplateName("");
    setQuestions([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex bg-black/90 items-center rounded-lg justify-center z-50">
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
            className="text-[16px] w-full p-2 text-gray-500 bg-white border rounded mt-1"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="intake">Initial Intake Form</option>
            <option value="pre-session">Pre-Session Check-in</option>
          </select>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded flex gap-1 justify-start items-center bg-blue-600 hover:bg-[#16a181] text-white"
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
