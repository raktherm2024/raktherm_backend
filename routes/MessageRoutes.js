import express from "express";
import {
  clearHistory,
  getMessage,
  saveMessage,
  sendMessage,
} from "../controllers/MessageController.js";

const router = express.Router();

router.get("/", getMessage);
router.post("/", saveMessage);
router.post("/send", sendMessage);
router.delete("/", clearHistory);

export default router;
