import express from "express";
import {
  addCustomers,
  getCustomers,
  removeCustomer,
} from "../controllers/CustomerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", addCustomers);
router.delete("/:id", removeCustomer);

export default router;
