import axios from "axios";
import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./Login.css";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  //Function for submitting users data then logging in
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" }); //We specified here the kind of dispatch we want carried out

    console.log(userRef);
    try {
      const res = await axios.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      res.data && window.location.replace("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label> Username </label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter Your Username..."
          ref={userRef}
        />
        <label> Password </label>
        <input
          type="password"
          className="loginInput"
          placeholder="Enter Your Password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login{" "}
        </button>
        <Link to="/register">
          <button className="loginRegisterButton">Register</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
