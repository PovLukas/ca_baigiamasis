import express from "express";
import { INSERT_QUESTION, GET_ALL_QUESTIONS } from "../controllers/question.js";

const router = express.Router();

router.post("/", INSERT_QUESTION);

router.get("/", GET_ALL_QUESTIONS)

export default router