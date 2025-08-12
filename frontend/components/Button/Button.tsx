import React from 'react'
import styles from './button.module.css'

type ButtonProps = {
    title: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({title, onClick}:ButtonProps) => {

  
  return (
    <button onClick={onClick} className={styles.button8}>{title}</button>
  )
}

export default Button