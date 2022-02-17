import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  // navigate to the login page after logout

  const Logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-Wrapper">
        <Link to="/" className="links">
          <div className="navbar-Wrapper-Left">
            <h1 className="navbar-Left-Logo">Logo</h1>
          </div>
        </Link>
        <div className="navbar-Wrapper-Right">
          <div className="navbar-Right-Avatar">
            <span className="username">{user?.fullname}</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt=""
              className="user-img"
            />
            <span className="logout" onClick={Logout}>
              Logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
