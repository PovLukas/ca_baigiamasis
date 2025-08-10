import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import SingleQuestion from "@/components/SingleQuestion/SingleQuestion";


const QuestionDetailPage = () => {
  const router = useRouter();
  const [question, setQuestion] = useState(null)
 
  const jwt = Cookies.get('@user_jwt')



const fetchQuestion = async (id: string) => {
  const response = await axios.get(`http://localhost:3003/questions/${id}`, {headers: {
    Authorization: jwt
  },})
  setQuestion(response.data.message)  
}

useEffect(()=>{
 router.query.id && fetchQuestion(router.query.id as string)
, router.query.id})

  return (
    <>
      <Header />
      {question && <SingleQuestion question={question} />}
    </>
  );
};

export default QuestionDetailPage;
