import React, { useEffect, useState } from 'react'
import Header from '@/components/Header/Header'
import Wrapper from '@/components/Questions/Wrapper'
import axios from 'axios'
import { QuestionType } from '@/types/question'

const Questions = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  const getQuestions = async () => {
    const response = await axios.get("http://localhost:3003/questions")

     setQuestions(response.data.allQuestions)
    console.log(questions)
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div>
        <Header />
        <Wrapper questions={questions}/>
    </div>
  )
}

export default Questions