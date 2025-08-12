import React from "react";
import styles from "./card.module.css";
import Link from "next/link";


type questionProps = {
  question: string;
  liked: number;
  disliked: number;
  id: string
};

const Question = ({ liked, disliked, question, id }: questionProps) => {


  return (
    <Link href={`questions/${id}`}
     className={styles.main} >
      <h2 className={styles.title}>{question}</h2>
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
