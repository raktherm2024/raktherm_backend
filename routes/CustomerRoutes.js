import express from "express";
import {
  addCustomers,
  getCustomers,
  getSpecificCustomer,
  removeCustomer,
  updateCustomer,
} from "../controllers/CustomerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.post("/", addCustomers);
router.post("/:id", getSpecificCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", removeCustomer);

export default router;
