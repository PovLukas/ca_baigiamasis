import QuestionModel from "../models/question.js";
import { v4 as uuidv4 } from "uuid";

export const INSERT_QUESTION = async (req, res) => {
  try {
    const newQuestion = {
      ...req.body,
      id: uuidv4(),
      liked: 0,
      disliked: 0,
      answers: [],
      createdAt: new Date(),
    };

    const response = new QuestionModel(newQuestion);
    const data = await response.save();

    return res
      .status(201)
      .json({ message: "Question was created", question: data });
  } catch (err) {
    if (err) {
      console.log(err);
    }
  }
};

export const GET_ALL_QUESTIONS = async (req, res) => {
  const allQuestions = await QuestionModel.find().sort({ createdAt: -1 });

  if (!allQuestions) {
    return res.status(404).json({ message: "no questions" });
  }

  res.status(200).json({ allQuestions });
};

export const GET_SINGLE_QUESTION = async (req, res) => {
  const id = req.params.id;

  const question = await QuestionModel.findOne({ id: id });

  if (question) {
    return res.status(200).json({ message: question });
  } else {
    return res.status(404).json({ message: "No question with this ID" });
  }
};

export const ANSWER_QUESTION = async (req, res) => {
  const id = req.params.id;
  const answer = req.body.answer;

  const question = await QuestionModel.findOne({ id: id });

  if (!question) {
    return res.status(404).json({ message: "No question with this ID" });
  } else {
    question.answers.push(answer);
    await question.save();
    return res.status(200).json({ message: "Answer added", question });
  }
};

export const DELETE_QUESTION = async (req, res) => {
  const id = req.params.id
  
  const question = await QuestionModel.findOneAndDelete({id: id})


  if (!question) {
    return res.status(404).json({message: "No question with this ID"})
  }

  return res.status(200).json({message: `${question} was deleted`})
}