import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SessionPreparation from "./pages/SessionPreparation";
import CoachingFeedback from "./pages/CoachingFeedback";
import SkillBuilder from "./pages/SkillBuilder";
import QuestionaireResponse from "./pages/QuestionaireResponse";
import AiGeneratedReport from "./pages/AiGeneratedReport";
import LiveCoaching from "./pages/LiveCoaching";
import SessionInsights from "./pages/SessionInsights";
import PracticeBot from "./pages/PracticeBot";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import ZoomMeetingCreator from "./components/LiveCoaching/ZoomMeetingCreator";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/session"
          element={
            <ProtectedRoute>
              <SessionPreparation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/live"
          element={
            <ProtectedRoute>
              <ZoomMeetingCreator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback"
          element={
            <ProtectedRoute>
              <CoachingFeedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feedback/session-insights"
          element={
            <ProtectedRoute>
              <SessionInsights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/skill"
          element={
            <ProtectedRoute>
              <SkillBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/practice-bot"
          element={
            <ProtectedRoute>
              <PracticeBot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/session/question-response"
          element={
            <ProtectedRoute>
              <QuestionaireResponse />
            </ProtectedRoute>
          }
        />
        <Route
          path="/session/ai-generated"
          element={
            <ProtectedRoute>
              <AiGeneratedReport />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
