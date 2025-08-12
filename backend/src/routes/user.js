import express from "express";
import {
  INSERT_USER,
  LOGIN_USER,
} from "../controllers/user.js";
import validate from "../middlewares/validation.js";
import loginSchema from "../schemas/login.js";

const router = express.Router();

router.post("/", INSERT_USER);

router.post("/login", validate(loginSchema), LOGIN_USER);


export default router;
