import mongoose from "mongoose";

const QuestionModel = mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  liked: { type: Number, required: true },
  disliked: { type: Number, required: true },
  answers: {
    type: [String],
    default: [],
  },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Question", QuestionModel);
