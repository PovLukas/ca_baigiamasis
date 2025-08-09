import React, { useState } from "react";
import styles from "./wrapper.module.css";
import { QuestionType } from "@/types/question";
import Card from "./Question/Card";
import Button from "../Button/Button";
import xSymbol from "../../assets/x-symbol-svgrepo-com.svg";

type questionProps = {
  questions: QuestionType[];
};

const Wrapper = ({ questions }: questionProps) => {
  const [popUp, setPopUp] = useState(false);

  const onClickHidden = () => {
    setPopUp(true);
  };

  const onClickX = () => {
    setPopUp(false);
  };

  const onClickSubmit = () => {};

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
              <input type="text" />
              <div className={styles.submitWrapper}><Button onClick={onClickSubmit} title={"Submit question!"} /></div>
            </div>
          </div>
        )}
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
