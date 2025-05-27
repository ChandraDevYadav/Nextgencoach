import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/livecoaching",
});

export const createSession = (data) => API.post("/", data);
export const getSessionById = (id) => API.get(`/${id}`);
export const updateSuggestions = (id, suggestions) =>
  API.put(`/${id}/suggestions`, { suggestedQuestions: suggestions });
export const sendSessionSummary = (id, summary) =>
  API.put(`/${id}/summary`, { sessionSummary: summary });
export const addCoachFeedback = (id, feedback) =>
  API.put(`/${id}/feedback`, { coachingFeedback: feedback });
export const sendSummaryEmail = (data) => API.post(`/send-summary`, data);
