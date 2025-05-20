import React from "react";
import { FiUser } from "react-icons/fi";
import { PiNotePencil } from "react-icons/pi";

const Sidebar = () => (
  <div className="w-80 bg-white p-6 border-r overflow-y-auto">
    <h2 className="text-xl font-bold mb-4 flex justify-start items-center gap-2">
      <FiUser /> Client Profile
    </h2>
    <div className="bg-gray-200 p-4 rounded-lg">
      <p className="font-bold">Sarah Johnson</p>
      <p className="text-sm font-medium text-gray-500 my-1">VP of Marketing</p>
      <p className="text-sm font-medium text-gray-500">
        Innovate Tech Solutions
      </p>
    </div>

    <h3 className="font-medium text-xs text-gray-500 mt-4">Session Focus</h3>
    <p className="text-[15px] pt-1 font-medium">Delegation & Trust Building</p>

    <h3 className="font-medium text-xs text-gray-500 mt-4">Key Challenges</h3>
    <ul className="list-disc ml-5 mb-4 text-sm text-gray-800 mt-1 font-medium">
      <li>Difficulty delegating effectively</li>
      <li>Micromanaging tendencies</li>
      <li>High stress levels (8/10)</li>
    </ul>

    <h3 className="font-bold mb-2 pt-2 flex text-xl justify-start items-center gap-2">
      <PiNotePencil className="text-2xl text-[#33C9A7]" />
      Session Notes
    </h3>
    <ul className="list-none text-[16px] text-gray-900 font-medium space-y-4 pt-4">
      <li className="bg-gray-200 rounded-lg p-4">
        Client expresses anxiety about team management
      </li>
      <li className="bg-gray-200 rounded-lg p-4">
        Difficulty delegating tasks - perfectionist tendencies
      </li>
      <li className="bg-gray-200 rounded-lg p-4">
        Mentions high workload and stress levels
      </li>
      <li className="bg-gray-200 rounded-lg p-4">
        Shows openness to changing management style
      </li>
      <li className="bg-gray-200 rounded-lg p-4">
        Key insight: Fear of losing control drives micromanagement
      </li>
      <li className="bg-gray-200 rounded-lg p-4">
        Action item: Create delegation framework
      </li>
      <li className="bg-gray-200 rounded-lg p-4">
        Progress: Acknowledging need for change
      </li>
    </ul>
  </div>
);

export default Sidebar;
