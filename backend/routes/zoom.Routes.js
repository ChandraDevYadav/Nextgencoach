import express from "express";
const router = express.Router();
import zoomController from "../controllers/zoom.Controller";

router.post("/create-meeting", zoomController.createMeeting);

module.exports = router;
