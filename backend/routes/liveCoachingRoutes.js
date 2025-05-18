import express from "express";
import {
  createSession,
  getSessionById,
  updateSuggestions,
  sendSessionSummary as controllerSummary,
  addCoachFeedback,
} from "../controllers/liveCoachingController.js";

import { sendSessionSummary as emailSummary } from "../controllers/summaryController.js";

const router = express.Router();

router.post("/", createSession);
router.get("/:id", getSessionById);
router.put("/:id/suggestions", updateSuggestions);
router.put("/:id/summary", controllerSummary);
router.put("/:id/feedback", addCoachFeedback);
router.post("/send-summary", emailSummary);

export default router;
