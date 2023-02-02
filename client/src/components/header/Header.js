import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="Header">
      <div className="titles">
        <div className="text">
          <span>React & Node </span>
          <h1>Blog </h1>
        </div>
        <div className="heroContainer">
          <img className="headerImg" src="./iguazu.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
