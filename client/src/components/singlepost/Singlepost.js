import React, { useContext, useEffect, useState } from "react";
import "./Singlepost.css";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Topbar from "../topbar/Topbar";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Context } from "../../context/Context";

const Singlepost = () => {
  const [post, setPost] = useState({});
  //logging location returns an object containing hash, key, pathname, state and search, Most importantly right now though we need the pathname
  const location = useLocation();
  //the Pathname is /post/54678989786756453 but when we split("/")[2] what we have left is just the string of numbers which is what we assigned to path
  const path = location.pathname.split("/")[2];

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  const { user } = useContext(Context);

  //N.B When you see /posts/ that's the route to get our posts, So in the API call we are basically calling /posts/56878675644565 which gives us data for that particular post
  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  //Function to handle Deleting of posts
  const handleDelete = async () => {
    try {
      await axios.delete("/posts/" + path, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      // window.location.reload();
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };
  const PF = "http://localhost:7001/images/";

  return (
    <div className="singlePost">
      <Topbar />
      <div className="singlePostWrapper">
        {post.photo && (
          <img className="singlePostImg" src={PF + post.photo} alt="img" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="singlePostTitleInput"
            autoFocus
          />
        ) : (
          <h1 className="singlePostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <AiOutlineEdit
                  onClick={() => setUpdateMode(true)}
                  style={{
                    cursor: "pointer",
                    fontSize: 25,
                    margin: 10,
                    color: "teal",
                  }}
                />
                <MdDelete
                  onClick={handleDelete}
                  style={{
                    cursor: "pointer",
                    fontSize: 25,
                    margin: 10,
                    color: "tomato",
                  }}
                />
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:{" "}
            <Link to={`/?user=${post.username}`}>
              <b>{post.username} </b>,
            </Link>
          </span>
          <span className="singlePostDate">
            {/* We use .toDateString to convert MongoDb date to string */}
            {new Date(post.createdAt).toDateString()}{" "}
          </span>
        </div>
        {updateMode ? (
          <textarea
            value={desc}
            className="singlePostDescInput"
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDescription">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Singlepost;
