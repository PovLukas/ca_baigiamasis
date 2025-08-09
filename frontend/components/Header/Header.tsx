import React from 'react'
import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.main}>
        <h2>Forumasz</h2>
        <nav>
            <ul>
                <li>
                    <a href="/register">Registration</a>
                </li>
                 <li>
                    <a href="/login">Login</a>
                </li>
                 <li>
                    <a href="/questions">Questions</a>
                </li>
            </ul>
        </nav>
    </div>
  )
}

export default Header