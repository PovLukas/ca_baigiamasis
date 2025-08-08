import Header from "@/components/Header/Header";
import React, { useState, MouseEvent } from "react";
import styles from "./register.module.css";
import axios from "axios";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onRegister = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("No email");
      setError(true);
      return;
    }
    if (!password) {
      setErrorMessage("No password");
      setError(true);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    const numberRegex = /\d/;
    if (!numberRegex.test(password)) {
      setErrorMessage("Password must include at least one number");
      return;
    }

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:3003/users", user);
      console.log("Registration successful:", response.data);
      setError(false);
      setSuccess(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError(true);
          setErrorMessage("Email already in use");
        } else {
          setError(true);
          setErrorMessage("Registration failed");
        }
      }
    }
  };

  return (
    <>
      <Header />

      <div className={styles.main}>
        <h2>Registration</h2>
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
        {error && <p className={styles.error}>{errorMessage}</p>}
        {success && <p className={styles.success}>Account created</p>}
      </div>
    </>
  );
};

export default Registration;
