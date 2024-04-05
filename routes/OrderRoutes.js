import express from "express";
import {
  addOrder,
  deleteExistingOrder,
  getExistingOrder,
  getOrderDetails,
  removeSpecificOrder,
  submitOrder,
} from "../controllers/OrderController.js";

const router = express.Router();

router.get("/:id", getExistingOrder);
router.delete("/:id", deleteExistingOrder);
router.put("/:id", addOrder);
router.put("/remove/:id", removeSpecificOrder);
router.post("/", getOrderDetails);
router.post("/submit-order", submitOrder);

export default router;
