import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BsFacebook,
  BsInstagram,
  BsPinterest,
  BsTwitter,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = () => {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };
    getCats();
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="./heroImg.jpg" alt="img" />
        <p>
          Kaladin shook his head, hefting his spear and walking over onto the
          walkway around the sands. Here, he peeked into a storage room.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link key={c._id} to={`/?cat=${c.name}`}>
              <li className="sideBarListItem">{c.name} </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span> FOLLOW US</span>
        <div className="sidebarSocial">
          <BsFacebook />
          <BsTwitter />
          <BsPinterest />
          <BsInstagram />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
