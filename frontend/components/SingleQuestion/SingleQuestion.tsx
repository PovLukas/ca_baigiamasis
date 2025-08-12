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
  const [error, setError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);

  const jwt = Cookies.get("@user_jwt");

  const onClick = async () => {
    if (!jwt) {
      return setDeleteError(true);
    }

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
      return;
    } else if (!jwt) {
      return setError(true);
    } else {
      await axios.put(
        `http://localhost:3003/questions/${question.id}`,
        { answer: {text: answer} },
        { headers: { Authorization: jwt } }
      );
      setAnswer("");
    }
  };

  const onClickLike = async () => {
    try {
      await axios.put(
        `http://localhost:3003/questions/like/${question.id}`,
        {},
        { headers: { Authorization: jwt } }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      }
    }
  };

    const onClickDislike = async () => {
    try {
      await axios.put(
        `http://localhost:3003/questions/dislike/${question.id}`,
        {},
        { headers: { Authorization: jwt } }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <h2>{question.question}</h2>
        <div className={styles.btnWrap}>
          <button onClick={onClickLike}>
            <span>{question.liked}</span>
            <img src={thumbsUp.src} alt="" />
          </button>
          <button onClick={onClickDislike}>
            <span>{question.disliked}</span>
            <img src={thumbsDown.src} alt="" />
          </button>
        </div>
      </div>
      <div className={styles.deleteBtn}>
        <Button title={"Delete question!"} onClick={onClick} />
        {deleteError && <p>Must login to delete question!</p>}
      </div>
      <Answer answers={question.answers} questionId={question.id} />
      <div className={styles.asnwerWrap}>
        <input
          type="text"
          placeholder="Submit your answer"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
          }}
        ></input>
        <Button title={"Submit question!"} onClick={onAnswer} />
      </div>
      {error && <p>Must login to answer questions!</p>}
      {deleted && <p className={styles.warning}>Question deleted!</p>}
    </div>
  );
};

export default SingleQuestion;
