import React, { useState } from "react";
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

  const [deleted, setDeleted] = useState(false);
  const [answer, setAnswer] = useState("");

  const onClick = async () => {
    const jwt = Cookies.get("@user_jwt");

    try {
      await axios.delete(`http://localhost:3003/questions/${question.id}`, {
        headers: { Authorization: jwt },
      });
      setDeleted(true);
      setTimeout(() => {
        router.push("/allQuestions");
      }, 2000);
    } catch (error) {
      console.error("Failed to delete question", error);
    }
  };

  const onAnswer = async () => {
    
    if (!answer) {
      return
    } else {
      await axios.put(`http://localhost:3003/questions/${question.id}`, {answer})
      setAnswer("")
    }
   
  }

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
      <div className={styles.deleteBtn}>
        <Button title={"Delete question!"} onClick={onClick} />
      </div>
      <Answer answer={question.answers} />
      <div className={styles.asnwerWrap}>
      <input
        type="text"
        placeholder="Submit your answer"
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value);
        }}
      ></input>
      <Button title={"Submit question!"} onClick={onAnswer}/>
      </div> 
      {deleted && <p className={styles.warning}>Question deleted!</p>}
    </div>
  );
};

export default SingleQuestion;
