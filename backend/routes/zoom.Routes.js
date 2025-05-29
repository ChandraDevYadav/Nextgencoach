import express from "express";
import { createZoomMeeting } from "../controllers/zoom.Controller.js";

const router = express.Router();

router.post("/create-meeting", createZoomMeeting);

export default router;
