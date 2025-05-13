import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SessionPreparation from "./pages/SessionPreparation";
import CoachingFeedback from "./pages/CoachingFeedback";
import SkillBuilder from "./pages/SkillBuilder";
import QuestionaireResponse from "./pages/QuestionaireResponse";
import AiGeneratedReport from "./pages/AiGeneratedReport";
import LiveCoaching from "./pages/LiveCoaching";
import SessionInsights from "./pages/SessionInsights";
import PracticeBot from "./pages/PracticeBot";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<SessionPreparation />} />
        <Route path="/live" element={<LiveCoaching />} />
        <Route path="/feedback" element={<CoachingFeedback />} />
        <Route
          path="/feedback/session-insights"
          element={<SessionInsights />}
        />
        <Route path="/skill" element={<SkillBuilder />} />
        <Route path="/practice-bot" element={<PracticeBot />} />
        <Route
          path="/session/question-response"
          element={<QuestionaireResponse />}
        />
        <Route path="/session/ai-generated" element={<AiGeneratedReport />} />
      </Routes>
    </>
  );
}

export default App;
