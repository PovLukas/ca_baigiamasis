import Header from "@/components/Header/Header";
import React, { useState, MouseEvent } from "react";
import styles from "./login.module.css";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const user = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:3003/users/login",
        user
      );
      if (response.status === 200) {
        Cookies.set("@user_jwt", response.data.jwt);
        console.log("Login successfull:", response.data);
        setError(false);
        setSuccess(true);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        setSuccess(false);

        if (status === 404) {
          setError(true);
          setErrorMessage("User with that email does not exist");
        } else if (status === 401) {
          setError(true);
          setErrorMessage("Incorrect password");
        }
      } else {
        setError(true);
        setErrorMessage("Unexpected error occurred");
      }
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <h2>Login</h2>
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
        <button onClick={onLogin}>Login</button>
        {error && <p className={styles.error}>{errorMessage}</p>}
        {success && <p className={styles.success}>Logged in successfully!</p>}
      </div>
    </div>
  );
};

export default Login;
