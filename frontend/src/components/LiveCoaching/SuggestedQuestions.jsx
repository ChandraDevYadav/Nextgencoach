import React from "react";

const SuggestedQuestions = () => (
  <div className="backdrop-blur-sm p-4 bg-black/40 rounded-lg w-96 text-white">
    <h3 className="font-bold mb-4 text-sm ">AI-SUGGESTED QUESTIONS</h3>
    <ul className="list-none text-[16px] space-y-3">
      <li className="bg-black/40 px-4 py-2 rounded-lg">
        What would change if you focused solely on outcomes rather than methods?
      </li>
      <li className="bg-black/40 px-4 py-2 rounded-lg">
        How has your relationship with control evolved throughout your career?
      </li>
      <li className="bg-black/40 px-4 py-2 rounded-lg">
        How might your team interpret your frequent check-ins?
      </li>
    </ul>
  </div>
);

export default SuggestedQuestions;
