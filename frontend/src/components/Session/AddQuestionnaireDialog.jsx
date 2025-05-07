import React, { useState } from "react";

const AddQuestionnaireDialog = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !category.trim()) return;
    onSubmit({ title, category });
    setTitle("");
    setCategory("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        <h2 className="text-lg font-semibold mb-4">Add New Questionnaire</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Questionnaire Title"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full border p-2 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionnaireDialog;
