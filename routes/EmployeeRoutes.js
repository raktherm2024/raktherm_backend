import express from "express";
import {
  addEmployee,
  getEmployee,
  getSpecificEmployee,
  removeEmployee,
  updateEmployee,
} from "../controllers/EmployeeController.js";

const router = express.Router();

router.get("/", getEmployee);
router.post("/", addEmployee);
router.post("/:id", getSpecificEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", removeEmployee);

export default router;
