import axios from "axios";
import React, { useContext, useState } from "react";
import { MdGroup } from "react-icons/md";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import "./Settings.css";

export const Settings = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const { user, dispatch } = useContext(Context);
  const PF = "http://localhost:7001/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    if (file) {
      const data = new FormData();
      // const fileName = file.name;
      console.log("I am a Fine boy");
      console.log(file.name);
      const fileName = file.name;
      //*The Date.now() + file.name adds a random date for ever new file you add, In case a user adds pictures with similar names
      //*But i did not use it because it wasn't allowing my images to show
      data.append("name", fileName); //We requested for name in the index.js
      data.append("file", file); //file is a keyword from the backend
      updatedUser.profilepic = fileName;
      console.log(file);
      console.log(updatedUser);
      try {
        //We defined the /upload route in our backend in index.js
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.put("/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <div>
            <span className="settingsUpdate">Update Your Account / </span>
            <Link to="/">
              <span className="settingsUpdate">Home </span>
            </Link>
          </div>
          <span className="settingsDelete">Delete Your Account </span>
        </div>
        <form onSubmit={handleSubmit} className="settingsForm">
          <label>Profile Picture </label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilepic}
              alt="img"
            />
            <label htmlFor="fileInput" className="settingsPPIcon">
              <MdGroup className="settingsPPIcon" />
            </label>
            <input type="file" id="fileInput" style={{ display: "none" }} />
          </div>
          <label>UserName </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder={user.username}
          />
          <label>Email </label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder={user.email}
          />
          <label>Password </label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button type="submit" className="settingsSubmit">
            Update{" "}
            {/* </button>
          {success && (
            <p
              style={{
                color: "green",
                font: 18,
                textAlign: "center",
                marginTop: 20,
              }}
            >
              Profile has been successfully updated...{" "}
            </p>
          )} */}
          </button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
};
