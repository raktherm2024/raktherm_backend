import express from "express";
import {
  addCustomers,
  getCustomers,
} from "../controllers/CustomerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", addCustomers);

export default router;
