import React, { useContext, useState } from "react";
import "./Write.css";
import { AiOutlinePlus } from "react-icons/ai";
import Topbar from "../../components/topbar/Topbar";
import { Context } from "../../context/Context";
import axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  //Function to handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    //newpost is the object that is created when we create a new post, we already defined what username is which is user.username, So when we create a post the title and desc are added
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const fileName = file.name;
      console.log(file.name);
      // const fileName = Date.now() + file.name;
      //*The Date.now() + file.name adds a random date for ever new file you add, In case a user adds pictures with similar names
      //*But i did not use it because it wasn't allowing my images to show
      data.append("name", fileName); //We requested for name in the index.js
      data.append("file", file); //file is a keyword from the backend
      newPost.photo = fileName;
      try {
        //We defined the /upload route in our backend in index.js
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="Write">
      <Topbar />
      {file && (
        <img className="formImg" src={URL.createObjectURL(file)} alt="img" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <AiOutlinePlus className="writeIcon" />
          </label>
          <input
            type="file"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ display: "none" }}
          />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell Your Story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <button className="writeSubmit" type="submit">
            {" "}
            Publish{" "}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;
