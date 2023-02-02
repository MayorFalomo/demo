import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(true);
    try {
      const res = await axios.post("/auth/register", {
        username,
        email,
        password,
      });
      res.data && window.location.replace("/login");
      console.log(res);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="loginTitle">Register</span>
      <form onSubmit={handleSubmit} className="loginForm">
        <label> Username </label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter Your Username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label> Email </label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter Your Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label> Password </label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter Your Password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton"> Register </button>
        <Link to="/login">
          <button type="submit" className="registerLoginButton">
            Login
          </button>
        </Link>
      </form>
      {error ? (
        <span style={{ color: "red", marginTop: 20 }}>
          Oops!, Something went wrong!
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Register;
