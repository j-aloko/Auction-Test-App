import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-Wrapper">
        <div className="navbar-Wrapper-Left">
          <h1 className="navbar-Left-Logo">Logo</h1>
        </div>
        <div className="navbar-Wrapper-Right">
          <div className="navbar-Right-Avatar">
            <span className="username">Joseph</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt=""
              className="user-img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
