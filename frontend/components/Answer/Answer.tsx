import React from "react";
import styles from "./answer.module.css";
import thumbsUp from "../../assets/thumbs-up-svgrepo-com.svg";
import thumbsDown from "../../assets/thumbs-down-svgrepo-com.svg";
import Button from "../Button/Button";
import axios from "axios";
import Cookies from "js-cookie";

type AnswerItem = {
  text: string;
  liked: number;
  disliked: number;
  id: string;
};

type AnswerProps = {
  answers: AnswerItem[];
  questionId: string;
};

const Answer = ({ answers, questionId }: AnswerProps) => {
  const jwt = Cookies.get("@user_jwt");

  const onClick = async (e: string) => {
    console.log(e);
    try {
      await axios.delete(
        `http://localhost:3003/questions/${questionId}/answer`,
        {
          data: { id: e },
          headers: { Authorization: jwt },
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      }
    }
  };

  return (
    <div className={styles.main}>
      {answers.map((e) => {
        return (
          <div className={styles.mainItems} key={e.id}>
            <div>
              <h2>{e.text}</h2>
              <Button title={"Delete answer"} onClick={() => onClick(e.id)} />
            </div>
            <div className={styles.btnWrap}>
              <button>
                <img src={thumbsUp.src} alt="" />
                {e.liked}
              </button>
              <button>
                <img src={thumbsDown.src} alt="" />
                {e.disliked}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Answer;
