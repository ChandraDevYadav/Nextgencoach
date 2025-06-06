import express from "express";
import {
  createPracticeBot,
  addMessage,
  getConversation,
} from "../controllers/practiceBot.Controller.js";

const router = express.Router();

router.post("/", createPracticeBot);
router.post("/:id/message", addMessage);
router.get("/:id", getConversation);

export default router;
