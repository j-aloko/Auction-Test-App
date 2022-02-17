import React from "react";
import "./Home.css";
import Sidebar from "./../Components/Sidebar/Sidebar";
import Body from "./../Components/Body/Body";

function Home() {
  return (
    <div className="home">
      <div className="home-Sidebar">
        <Sidebar />
      </div>
      <div className="home-Body">
        <Body />
      </div>
    </div>
  );
}

export default Home;
