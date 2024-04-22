import express from "express";
import {
  addEmployee,
  getEmployee,
  removeEmployee,
} from "../controllers/EmployeeController.js";

const router = express.Router();

router.get("/", getEmployee);
router.post("/", addEmployee);
router.delete("/:id", removeEmployee);

export default router;
