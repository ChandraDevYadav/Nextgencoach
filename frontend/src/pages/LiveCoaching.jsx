import React from "react";
import Sidebar from "../components/LiveCoaching/Sidebar";
import VideoSection from "../components/LiveCoaching/VideoSection";
import SuggestedQuestions from "../components/LiveCoaching/SuggestedQuestions";
import { Helmet } from "react-helmet";

const LiveCoaching = () => {
  return (
    <div className="flex h-screen">
      <Helmet>
        <title>Live Coaching</title>
        <meta name="description" content="Live coaching session with real-time video and suggested questions." />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
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
