import React from 'react'
import styles from './answer.module.css'

type answerProps = {
    answer: string[]
}

const Answer = ({answer}: answerProps) => {
  return (
    <div className={styles.main} >
    {answer.map((e) => {
        return <div className={styles.mainItems} key={e}>{e}</div>
    })}
    </div>
  )
}

export default Answer