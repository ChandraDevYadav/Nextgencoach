import express from "express";
import {
  createZoomMeeting,
  generateZoomSignature,
} from "../controllers/zoom.Controller.js";

const router = express.Router();

router.post("/create-meeting", createZoomMeeting);
router.post("/signature", generateZoomSignature);

export default router;
