import express from "express";
import {
  addTemplate,
  getTemplate,
  removeTemplate,
} from "../controllers/TemplateController.js";

const router = express.Router();

router.get("/", getTemplate);
router.post("/", addTemplate);
router.delete("/:id", removeTemplate);

export default router;
