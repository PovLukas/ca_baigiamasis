import React from 'react'
import { QuestionType } from '@/types/question'

type QuestionProps = {
    question: QuestionType
}

const SingleQuestion = ({question}:QuestionProps) => {
  return (
    <div>{question.question}</div>
  )
}

export default SingleQuestion