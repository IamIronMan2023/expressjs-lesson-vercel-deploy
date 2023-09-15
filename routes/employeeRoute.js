import express from "express";
import {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getAllEmployees);

router.get("/:id", getEmployee);

router.post("/", createEmployee);

router.patch("/:id", updateEmployee);

router.delete("/:id", deleteEmployee);

export default router;
