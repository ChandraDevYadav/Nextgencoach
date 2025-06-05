import express from "express";
import { startRecallBot } from "../controllers/recallBot.Controller.js";

const router = express.Router();
router.post("/start-bot", startRecallBot);

export default router;
