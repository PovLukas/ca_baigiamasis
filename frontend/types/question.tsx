export type AnswerType = {
  id: string;
  text: string;
  answeredBy: string;
  liked: number;
  disliked: number;
  likedBy: string[];
  dislikedBy: string[];
  createdAt: Date;
};

export type QuestionType = {
  id: string;
  question: string;
  liked: number;
  disliked: number;
  answers: AnswerType[];  
  createdAt: Date;
};