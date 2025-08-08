import Header from "@/components/Header/Header";
import React, { useState } from "react";
import styles from "./register.module.css";
import axios from "axios";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async (e) => {
    e.preventDefault();

    const user = {
        email: email,
        password: password
    }

    try {
      const response = await axios.post('http://localhost:3003/users', user);
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };;


  return (
    <>
      <Header />
      <div className={styles.main}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={onRegister}>Register</button>
        <p>Error</p>
      </div>
    </>
  );
};

export default Index;
