import React from 'react'
import styles from './button.module.css'

type ButtonProps = {
    title: string
    onClick: () => void
}

const Button = ({title, onClick}:ButtonProps) => {
  return (
    <button onClick={onClick} className={styles.btn}>{title}</button>
  )
}

export default Button