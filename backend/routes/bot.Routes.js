import express from "express";
import {
  createMeetingBot,
  startMeetingProcessing,
  fetchMeetingData,
} from "../controllers/bot.Controller.js";

const router = express.Router();

router.post("/bots", createMeetingBot);
router.post("/process-meeting", startMeetingProcessing);
router.get("/meetings/:meetingId", fetchMeetingData);

export default router;
