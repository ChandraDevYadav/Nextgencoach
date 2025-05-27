import express from "express";
import multer from "multer";
import { handleAudioUpload } from "../controllers/audio.Controller.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

router.post("/upload", upload.single("audio"), handleAudioUpload);

export default router;
