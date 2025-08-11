import React from "react";
import { QuestionType } from "@/types/question";
import Answer from "../Answer/Answer";
import thumbsDown from "../../assets/thumbs-down-svgrepo-com.svg";
import thumbsUp from "../../assets/thumbs-up-svgrepo-com.svg";
import styles from "./singleQuestion.module.css";
import Button from "../Button/Button";
import axios from "axios";
import { Router, useRouter } from "next/router";
import Cookies from "js-cookie";

type QuestionProps = {
  question: QuestionType;
};

const SingleQuestion = ({ question }: QuestionProps) => {
  const router = useRouter();

  const onClick = async () => {
    const jwt = Cookies.get("@user_jwt");

    try {
      await axios.delete(`http://localhost:3003/questions/${question.id}`, {
        headers: { Authorization: jwt },
      });

      router.push("/allQuestions");
    } catch (error) {
      console.error("Failed to delete question", error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h2>{question.question}</h2>
        <div className={styles.btnWrap}>
          <button>
            <span>{question.liked}</span>
            <img src={thumbsUp.src} alt="" />
          </button>
          <button>
            <span>{question.disliked}</span>
            <img src={thumbsDown.src} alt="" />
          </button>
        </div>
      </div>
      <Button title={"Delete question!"} onClick={onClick} />
      <Answer answer={question.answers} />
    </div>
  );
};

export default SingleQuestion;
