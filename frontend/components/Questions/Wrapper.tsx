import React, { useState } from "react";
import styles from "./wrapper.module.css";
import { QuestionType } from "@/types/question";
import Card from "./Question/Card";
import Button from "../Button/Button";
import xSymbol from "../../assets/x-symbol-svgrepo-com.svg";
import axios from "axios";

type questionProps = {
  questions: QuestionType[];
  refreshQuestions: () => void
};

const Wrapper = ({ questions, refreshQuestions  }: questionProps) => {
  const [popUp, setPopUp] = useState(false);
  const [question, setQuestion] = useState("");
  const [success, setSuccess] = useState(false)

  const onClickHidden = () => {
    setPopUp(true);
  };

  const onClickX = () => {
    setPopUp(false);
  };

  const onClickSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      const newQuestion = {
        question: question,
      };

      const response = await axios.post(
        "http://localhost:3003/questions",
        newQuestion
      );

      if (response.status === 201) {
        console.log("Question submitted");
        setQuestion("")
        setSuccess(true)
          setTimeout(() => {
    setPopUp(false);
  }, 2000);
        refreshQuestions()
      }
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <>
      <div className={styles.buttonWrapper}>
        <Button onClick={onClickHidden} title={"Ask your question"} />
        {popUp && (
          <div className={styles.hidden}>
            <div className={styles.hiddenMain}>
              <div className={styles.hiddenMainWrapper}>
                <h2>What is your question?</h2>
                <button className={styles.xbtn} onClick={onClickX}>
                  <img src={xSymbol.src} alt="" />
                </button>
              </div>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
              <div className={styles.submitWrapper}>
                <Button onClick={onClickSubmit} title={"Submit question!"} />
              </div>
               {success && <p className={styles.success}>Question posted!</p>}
            </div>
           
          </div>
        )}
      </div>
      <div className={styles.main}>
        {questions.map((e) => {
          return (
            <Card
              key={e.id}
              id={e.id}
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
