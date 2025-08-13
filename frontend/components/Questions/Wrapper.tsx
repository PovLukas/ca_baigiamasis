import React, { useState } from "react";
import styles from "./wrapper.module.css";
import { QuestionType } from "@/types/question";
import Card from "./Question/Card";
import Button from "../Button/Button";
import xSymbol from "../../assets/x-symbol-svgrepo-com.svg";
import axios from "axios";
import Cookies from "js-cookie";

type questionProps = {
  questions: QuestionType[];
  refreshQuestions: () => void;
};

const Wrapper = ({ questions, refreshQuestions }: questionProps) => {
  const [popUp, setPopUp] = useState(false);
  const [question, setQuestion] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [noFilter, setNofilter] = useState(true);
  const [filterAnswered, setFilterAnswered] = useState(false);
  const [filteredUnanswered, setFilteredUnanswered] = useState(false);

  const onClickPopUp = () => {
    setPopUp(true);
  };

  const onClickX = () => {
    setPopUp(false);
  };

  const jwt = Cookies.get("@user_jwt");

  const onClickSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!jwt) {
      return setError(true);
    }

    try {
      e.preventDefault();

      const newQuestion = {
        question: question,
      };

      const response = await axios.post(
        "http://localhost:3003/questions",
        newQuestion,
        { headers: { Authorization: jwt } }
      );

      if (response.status === 201) {
        console.log("Question submitted");
        setQuestion("");
        setSuccess(true);
        setTimeout(() => {
          setPopUp(false);
        }, 2000);
        refreshQuestions();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const answeredQuestions = questions.filter((q) => q.answers.length > 0);
  const unAnsweredQuestions = questions.filter((q) => q.answers.length === 0);

  const onClickFilterAnswered = () => {
    if (filterAnswered === true) {
      setNofilter(true);
      return setFilterAnswered(false);
    } else {
      setNofilter(false);
      setFilteredUnanswered(false);
      setFilterAnswered(true);
    }
  };

  const onClickFilterUnanswered = () => {
    if (filteredUnanswered === true) {
      setNofilter(true);
      return setFilteredUnanswered(false);
    }
    setNofilter(false);
    setFilterAnswered(false);
    setFilteredUnanswered(true);
  };

  return (
    <>
      <div className={styles.buttonWrapper}>
        <div className={styles.questionBtnWrap}>
          <Button onClick={onClickPopUp} title={"Ask your question"} />
          <Button
            title={"Answered questions"}
            onClick={onClickFilterAnswered}
          />
          <Button
            title={"Unanswered questions"}
            onClick={onClickFilterUnanswered}
          />
        </div>
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
              {error && (
                <p className={styles.failure}>Must login to post question!</p>
              )}
              {success && <p className={styles.success}>Question posted!</p>}
            </div>
          </div>
        )}
      </div>
      {noFilter && (
        <div className={styles.main}>
          {questions.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                question={e.question}
                answerLength={e.answers.length}
                liked={e.liked}
                disliked={e.disliked}
              />
            );
          })}
        </div>
      )}
      {filterAnswered && (
        <div className={styles.main}>
          {answeredQuestions.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                question={e.question}
                answerLength={e.answers.length}
                liked={e.liked}
                disliked={e.disliked}
              />
            );
          })}
        </div>
      )}
      {filteredUnanswered && (
        <div className={styles.main}>
          {unAnsweredQuestions.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                question={e.question}
                answerLength={e.answers.length}
                liked={e.liked}
                disliked={e.disliked}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Wrapper;
