// routes/meetingRoutes.js
import express from "express";
import { protect, protectCoach } from "../middleware/auth.Middleware.js";
import {
  uploadMeetingAudio,
  getCoachingReport,
} from "../controllers/meeting.Controller.js";
import { upload } from "../middlewares/upload.Middleware.js";

const router = express.Router();

// Upload audio and generate transcription
router.post(
  "/upload",
  protect,
  protectCoach,
  upload.single("audio"),
  uploadMeetingAudio
);

// Get report
router.get("/report/:meetingId", protect, protectCoach, getCoachingReport);

export default router;
