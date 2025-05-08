import React from "react";
import Sidebar from "../components/LiveCoaching/Sidebar";
import VideoSection from "../components/LiveCoaching/VideoSection";
import SuggestedQuestions from "../components/LiveCoaching/SuggestedQuestions";

const LiveCoaching = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 relative">
        <VideoSection />
        <div className="absolute top-4 right-4">
          <SuggestedQuestions />
        </div>
      </div>
    </div>
  );
};

export default LiveCoaching;