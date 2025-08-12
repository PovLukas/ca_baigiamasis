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
  const newAnswer = {
    id: uuidv4(),
    liked: 0,
    disliked: 0,
    text: answer.text,
    createdAt: new Date(),
    likedBy: [],
    dislikedBy: [],
  };

  const question = await QuestionModel.findOne({ id: id });

  if (!question) {
    return res.status(404).json({ message: "No question with this ID" });
  } else {
    question.answers.push(newAnswer);
    await question.save();
    return res.status(200).json({ message: "Answer added", question });
  }
};

export const DELETE_QUESTION = async (req, res) => {
  const id = req.params.id;

  const question = await QuestionModel.findOneAndDelete({ id: id });

  if (!question) {
    return res.status(404).json({ message: "No question with this ID" });
  }

  return res.status(200).json({ message: `${question} was deleted` });
};

export const DELETE_ANSWER = async (req, res) => {
  const questionId = req.params.id;
  const answerId = req.body.id;

  const question = await QuestionModel.findOne({ id: questionId });

  const initialLength = question.answers.length;
  question.answers = question.answers.filter((ans) => ans.id !== answerId);

  if (question.answers.length === initialLength) {
    return res.status(404).json({ message: "No answer with this ID" });
  } else {
    await question.save();
    return res.status(200).json({ message: "Answer was deleted" });
  }
};

export const LIKE_QUESTION = async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;

  const question = await QuestionModel.findOne({ id: id });

  const alreadyLiked = question.likedBy.includes(userId);

  if (alreadyLiked) {
    question.liked -= 1;
    question.likedBy = question.likedBy.filter((id) => id !== userId);
    await question.save();
    return res.status(200).json({ message: "already liekd" });
  } else {
    question.likedBy.push(userId);
    question.liked += 1;
    await question.save();
    return res.status(200).json({ message: "Liked", userId });
  }
};

export const DISLIKE_QUESTION = async (req, res) => {
  const id = req.params.id;
  const userId = req.body.userId;

  const question = await QuestionModel.findOne({ id: id });

  const alreadyDisliked = question.dislikedBy.includes(userId);

  if (alreadyDisliked) {
    question.disliked += 1;
    question.dislikedBy = question.dislikedBy.filter((id) => id !== userId);
    await question.save();
    return res.status(200).json({ message: "already disliked" });
  } else {
    question.dislikedBy.push(userId);
    question.disliked -= 1;
    await question.save();
    return res.status(200).json({ message: "Disliked", userId });
  }
};

export const LIKE_ANSWER = async (req, res) => {
  const id = req.params.id;
  const answerId = req.body.answerId;
  const userId = req.body.userId;

  const question = await QuestionModel.findOne({ id: id });

  const answer = question.answers.find((ans) => ans.id === answerId);

  const alreadyLiked = answer.likedBy.includes(userId);

  if (alreadyLiked) {
    answer.liked -= 1;
    answer.likedBy = answer.likedBy.filter((id) => id !== userId);
    await question.save();
    return res.status(200).json({ message: "already liekd" });
  } else {
    answer.likedBy.push(userId);
    answer.liked += 1;
    await question.save();
    return res.status(200).json({ message: "Liked", userId });
  }
};

export const DISLIKE_ANSWER = async (req, res) => {
  const id = req.params.id;
  const answerId = req.body.answerId;
  const userId = req.body.userId;

  const question = await QuestionModel.findOne({ id: id });

  const answer = question.answers.find((ans) => ans.id === answerId);

  const alreadyDisliked = answer.dislikedBy.includes(userId);

  if (alreadyDisliked) {
    answer.disliked += 1;
    answer.dislikedBy = answer.dislikedBy.filter((id) => id !== userId);
    await question.save();
    return res.status(200).json({ message: "Already disliked" });
  } else {
    answer.dislikedBy.push(userId);
    answer.disliked -= 1;
    await question.save();
    return res.status(200).json({ message: "Disliked", userId });
  }
};
