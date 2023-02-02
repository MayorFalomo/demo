import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Singlepost from "../../components/singlepost/Singlepost";
import "./Single.css";
const Single = () => {
  return (
    <div className="Single">
      <Singlepost />
      <Sidebar />
    </div>
  );
};

export default Single;
