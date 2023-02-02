import React, { useContext } from "react";
import "./topbar.css";
import { BsFacebook } from "react-icons/bs";
import { BsPinterest } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const Topbar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogOut = () => {
    dispatch({ type: "LOG_OUT" });
  };

  const PF = "http://localhost:7001/images/";

  console.log(user.profilepic);
  return (
    <nav className="top">
      <div className="socials">
        <BsFacebook />
        <BsTwitter />
        <BsPinterest />
        <BsInstagram />
      </div>
      <ul className="navigation">
        <Link to="/">
          <li>HOME </li>
        </Link>
        <Link to="">
          <li>ABOUT </li>
        </Link>
        <Link>
          <li>CONTACT </li>
        </Link>
        <Link to="/write">
          {" "}
          <li>WRITE </li>
        </Link>
        <Link to="/login" onClick={handleLogOut}>
          <li>LOGOUT </li>
        </Link>
      </ul>
      {user ? (
        <div className="search">
          <Link to="/settings">
            <img src={PF + user.profilepic} alt="img" />
          </Link>
          <BiSearch />
        </div>
      ) : (
        <div className="userShow">
          <Link to="/register">
            <p>REGISTER </p>
          </Link>
          <Link to="/login">
            <p>LOGIN </p>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Topbar;
