import React from "react";
import Sidebar from "../components/LiveCoaching/Sidebar";
import VideoSection from "../components/LiveCoaching/VideoSection";
import SuggestedQuestions from "../components/LiveCoaching/SuggestedQuestions";
import { Helmet } from "react-helmet";
import ZoomMeetingCreator from "../components/LiveCoaching/ZoomMeetingCreator";

const LiveCoaching = () => {
  return (
    <div className="flex h-screen">
      <Helmet>
        <title>Live Coaching</title>
        <meta
          name="description"
          content="Live coaching session with real-time video and suggested questions."
        />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <ZoomMeetingCreator />
    </div>
  );
};

export default LiveCoaching;
