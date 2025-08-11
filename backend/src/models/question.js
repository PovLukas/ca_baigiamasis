import mongoose from "mongoose";

const QuestionModel = mongoose.Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  liked: { type: Number, default: 0 },
  disliked: { type: Number, default: 0  },
  likedBy: [String],
  dislikedBy: [String],
  answers: {
    type: [String],
    default: [],
  },
  createdAt: { type: Date, required: true },
});

export default mongoose.model("Question", QuestionModel);
