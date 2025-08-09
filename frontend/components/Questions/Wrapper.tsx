import React from "react";
import styles from "./wrapper.module.css";
import { QuestionType } from "@/types/question";
import Card from "./Question/Card";

type questionProps = {
  questions: QuestionType[];
};

const Wrapper = ({ questions }: questionProps) => {
  return (
    <>
      <div>
        <button>Post your question</button>
      </div>
      <div className={styles.main}>
        {questions.map((e) => {
          return (
            <Card
              key={e.id}
              question={e.question}
              liked={e.liked}
              disliked={e.disliked}
            />
          );
        })}
      </div>
    </>
  );
};

export default Wrapper;
