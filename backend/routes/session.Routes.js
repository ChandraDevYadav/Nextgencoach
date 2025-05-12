import express from "express";
import {
  getSessions,
  getSessionById,
  createSession,
  updateSession,
  addAISuggestions,
  generateSessionSummary,
  sendSessionSummary,
  generateCoachFeedback,
} from "../controllers/sessionController.js";
import { protect, coach } from "../middleware/auth.Middleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, coach, getSessions)
  .post(protect, coach, createSession);

router
  .route("/:id")
  .get(protect, coach, getSessionById)
  .put(protect, coach, updateSession);

router.route("/:id/ai-suggestions").post(protect, coach, addAISuggestions);

router
  .route("/:id/generate-summary")
  .post(protect, coach, generateSessionSummary);

router.route("/:id/send-summary").post(protect, coach, sendSessionSummary);

router
  .route("/:id/generate-feedback")
  .post(protect, coach, generateCoachFeedback);

export default router;
