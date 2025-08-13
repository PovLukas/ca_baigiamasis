import React from "react";
import styles from "./card.module.css";
import Link from "next/link";


type questionProps = {
  question: string;
  liked: number;
  disliked: number;
  id: string
  answerLength: number
};

const Question = ({ liked, disliked, question, id, answerLength }: questionProps) => {


  return (
    <Link href={`questions/${id}`}
     className={styles.main} >
      <div className={styles.titleWrap}>
      <h2 className={styles.title}>{question}</h2>
      <h3>Replies: {answerLength}</h3>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.like}>
          <p>Liked: {liked}</p>

        </div>
        <div className={styles.like}>
        <p>Disliked: {disliked}</p>
        </div>
      </div>
    </Link>
  );
};

export default Question;
