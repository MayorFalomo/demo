import React from "react";
import { Link } from "react-router-dom";
import "./Post.css";

const Post = ({ post }) => {
  const PF = "http://localhost:7001/images/";

  return (
    <div className="Post">
      {post.photo && (
        <img src={PF + post.photo} className="postImg" alt="img" />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <p className="postCat">{c.name}</p>
          ))}
        </div>
        <Link to={`/post/${post._id}`}>
          {" "}
          <span className="title">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
};

export default Post;
