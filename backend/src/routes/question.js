import express from "express";
import { INSERT_QUESTION, GET_ALL_QUESTIONS, GET_SINGLE_QUESTION, ANSWER_QUESTION } from "../controllers/question.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/", INSERT_QUESTION);

router.get("/", GET_ALL_QUESTIONS)

router.get('/:id', auth ,GET_SINGLE_QUESTION)

router.put("/:id", ANSWER_QUESTION)

export default router