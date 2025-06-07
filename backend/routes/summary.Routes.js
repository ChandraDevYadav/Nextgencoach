import express from "express";
import { protect, protectCoach } from "../middleware/auth.Middleware.js";
import { generateDebrief } from "../controllers/summary.Controller.js";

const router = express.Router();

router.post("/debrief", protect, protectCoach, generateDebrief);

export default router;
