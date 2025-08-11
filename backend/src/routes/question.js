import express from "express";
import { INSERT_QUESTION, GET_ALL_QUESTIONS, GET_SINGLE_QUESTION, ANSWER_QUESTION, DELETE_QUESTION, LIKE_QUESTION, DISLIKE_QUESTION } from "../controllers/question.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/",auth, INSERT_QUESTION);

router.get("/", GET_ALL_QUESTIONS)

router.get('/:id', auth ,GET_SINGLE_QUESTION)

router.put("/:id",auth, ANSWER_QUESTION)

router.delete("/:id", auth, DELETE_QUESTION)

router.put('/like/:id', auth, LIKE_QUESTION);

router.put('/dislike/:id',auth, DISLIKE_QUESTION);

export default router