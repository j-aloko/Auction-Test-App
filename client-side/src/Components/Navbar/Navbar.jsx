import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";

function Navbar({ socket }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState();
  const [color, setColor] = useState(false);

  // navigate to the login page after logout

  const Logout = () => {
    localStorage.clear();
    window.location.replace("/login");
  };

  // when component mounts, receive notifications if any
  useEffect(() => {
    socket?.on("receiveNotification", (data) => {
      if (data?.fullname === user?.fullname) {
        setNotification(data?.message);
      }
    });
  }, [socket, user?.fullname]);

  // Clear notification

  const clearNotifications = (e) => {
    e.preventDefault();
    setNotification();
    setShowNotification(!notification);
  };

  //change navbar color when Y axis is >= 60px
  const changeColor = () => {
    if (window.scrollY >= 60) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  return (
    <div className={color ? "navbar color" : "navbar"}>
      <div className="navbar-Wrapper">
        <Link to="/" className="links">
          <div className="navbar-Wrapper-Left">
            <h1 className="navbar-Left-Logo">Bidify</h1>
          </div>
        </Link>
        <div className="navbar-Wrapper-Right">
          <div className="notification-panel">
            {showNotification && (
              <div className="notification-alert">
                <span className="notificaion">
                  {notification && notification}
                </span>
                {notification && (
                  <button
                    className="clear-notification"
                    onClick={clearNotifications}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            )}
            <Badge
              badgeContent={notification && 1}
              color="secondary"
              onClick={() => setShowNotification(!showNotification)}
            >
              <NotificationsIcon />
            </Badge>
          </div>
          <div className="navbar-Right-Avatar">
            <span className="username">{user?.fullname}</span>
            <img
              src={user?.img || "/assets/avatar.png"}
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
