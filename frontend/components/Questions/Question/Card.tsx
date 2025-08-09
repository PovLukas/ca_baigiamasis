import React from "react";
import styles from "./card.module.css";
import thumbsUp from "../../../assets/thumbs-up-svgrepo-com.svg";
import thumbsDown from "../../../assets/thumbs-down-svgrepo-com.svg";

type questionProps = {
  question: string;
  answer: [];
  liked: number;
  disliked: number;
};

const Question = ({ liked, disliked, question }: questionProps) => {
  return (
    <div className={styles.main}>
      <h2>{question}</h2>
      <div className={styles.wrapper}>
        <div className={styles.like}>
          {liked}
          <img src={thumbsUp.src} alt="" />
        </div>
        <div className={styles.like}>
          {disliked}
          <img src={thumbsDown.src} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Question;
