import express from "express";
import {
  createSession,
  getSessionById,
  updateSuggestions,
  updateSessionSummary,
  addCoachFeedback,
} from "../controllers/liveCoaching.Controller.js";

import { sendSessionSummary as sendEmailSummary } from "../controllers/summary.Controller.js";

const router = express.Router();

router.post("/", createSession);
router.get("/:id", getSessionById);
router.put("/:id/suggestions", updateSuggestions);
router.put("/:id/summary", updateSessionSummary);
router.put("/:id/feedback", addCoachFeedback);
router.post("/send-summary", sendEmailSummary);

export default router;
