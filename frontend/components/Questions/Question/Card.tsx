import React from "react";
import styles from "./card.module.css";
import thumbsUp from "../../../assets/thumbs-up-svgrepo-com.svg";
import thumbsDown from "../../../assets/thumbs-down-svgrepo-com.svg";
import { useRouter } from "next/router";
import Link from "next/link";


type questionProps = {
  question: string;
  liked: number;
  disliked: number;
  id: string
};

const Question = ({ liked, disliked, question, id }: questionProps) => {

  const router = useRouter()



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
