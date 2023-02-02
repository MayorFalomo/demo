import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Posts from "../../posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Homepage.css";
import axios from "axios";
import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  // const Example = ({ type, color }) => (
  //   <ReactLoading type={type} color={color} height={667} width={375} />
  // );
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/posts" + search);
      setPosts(res.data);
      setCompleted(true);
    };
    fetchPosts();
  }, [search]);
  // console.log(posts);
  return (
    <div>
      <Topbar />
      <Header />
      <div className="home">
        {!completed ? (
          <div className="contain">
            {!loading ? (
              <div className="loaders">
                <div className="vector">
                  <span className="loader"></span>
                </div>
              </div>
            ) : (
              <h1> CINEMAFLIXLOGO </h1>
            )}
          </div>
        ) : (
          <Posts posts={posts} />
        )}
        <Sidebar />
      </div>
    </div>
  );
};

export default Homepage;
