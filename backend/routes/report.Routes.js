import express from "express";
import multer from "multer";
import { uploadAudioAndGenerateReport } from "../controllers/report.Controller.js";
import { protectCoach } from "../middleware/auth.Middleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post(
  "/upload",
  protectCoach,
  upload.single("audio"),
  uploadAudioAndGenerateReport
);

export default router;
