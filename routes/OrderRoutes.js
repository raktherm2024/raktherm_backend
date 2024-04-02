import express from "express";
import {
  addOrder,
  deleteExistingOrder,
  getExistingOrder,
  getOrderDetails,
  removeSpecificOrder,
} from "../controllers/OrderController.js";

const router = express.Router();

router.get("/:id", getExistingOrder);
router.delete("/:id", deleteExistingOrder);
router.put("/:id", addOrder);
router.put("/remove/:id", removeSpecificOrder);
router.post("/", getOrderDetails);

export default router;
