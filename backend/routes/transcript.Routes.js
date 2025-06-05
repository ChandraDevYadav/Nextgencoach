import { Router } from "express";
import {
  receiveTranscript,
  getTranscripts,
} from "../controllers/transcript.Controller.js";

const router = Router();

router.post("/webhook", receiveTranscript);
router.get("/transcripts", getTranscripts);

export default router;
