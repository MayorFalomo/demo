import "./App.css";
import Homepage from "./pages/homepage/Homepage";
import Topbar from "./components/topbar/Topbar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { Settings } from "./pages/settings/Settings";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import { Route, Routes } from "react-router-dom";
import Singlepost from "./components/singlepost/Singlepost";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      <Routes>
        {/* <Topbar /> */}
        <Route path="/" element={user ? <Homepage /> : <Register />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/register" element={user ? <Homepage /> : <Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Singlepost />} />
      </Routes>
    </div>
  );
}

export default App;
