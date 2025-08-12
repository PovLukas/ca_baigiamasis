import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  answeredBy: { type: String },
  liked: { type: Number, default: 0 },
  disliked: { type: Number, default: 0 },
  likedBy: [{ type: String }],
  dislikedBy: [{ type: String }],
  createdAt: { type: Date, required: true },
});

const QuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  liked: { type: Number, default: 0 },
  disliked: { type: Number, default: 0 },
  likedBy: [String],
  dislikedBy: [String],
  answers: {
    type: [AnswerSchema],
    default: [],
  },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Question", QuestionSchema);