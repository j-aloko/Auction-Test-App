import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

function Navbar({ socket }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showNotification, setShowNotification] = useState(false);

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
          <div className="notification-panel">
            {showNotification && <div className="notification-alert">hi</div>}
            <Badge
              badgeContent={4}
              color="secondary"
              onClick={() => setShowNotification(!showNotification)}
            >
              <NotificationsIcon />
            </Badge>
          </div>
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
