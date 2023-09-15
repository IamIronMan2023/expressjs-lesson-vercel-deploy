import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, createUser);

router.post("/login", loginUser);
router.post("/logout", auth, logoutUser);

export default router;
