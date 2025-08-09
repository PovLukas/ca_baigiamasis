import React from "react";
import styles from "./header.module.css";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.main}>
      <h2>Forumasz</h2>
      <nav>
        <ul>
          <ul>
            <li>
              <Link href="/register">Registration</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/questions">Questions</Link>
            </li>
          </ul>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
