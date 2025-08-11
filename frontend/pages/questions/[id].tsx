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
  const [noToken, setNoToken] = useState(false)
 
  const jwt = Cookies.get('@user_jwt')



const fetchQuestion = async (id: string) => {
  try {
  const response = await axios.get(`http://localhost:3003/questions/${id}`, {headers: {
    Authorization: jwt
  },})
  setQuestion(response.data.message)  
} catch(error) {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
      setNoToken(true)
}
}}

useEffect(()=>{
 router.query.id && fetchQuestion(router.query.id as string)
, router.query.id})

  return (
    <>
      <Header />
      {noToken && <p className={styles.warning}>You need to login!</p>}
      {question && <SingleQuestion question={question} />}
    </>
  );
};

export default QuestionDetailPage;
