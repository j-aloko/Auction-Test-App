import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import AutoBid from "./Components/AutoBid/AutoBid";
import Login from "./Components/Login/Login";
import { io } from "socket.io-client";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [socket, setSocket] = useState(null);

  //on app render, initilize socket connection
  useEffect(() => {
    setSocket(
      io("https://bidify-socket.herokuapp.com/", { transports: ["websocket"] })
    );
  }, []);

  return (
    <>
      <BrowserRouter>
        {!user ? null : <Navbar socket={socket} />}
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/product-details/:id"
            element={
              user ? (
                <ProductDetails socket={socket} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/config-auto-bid"
            element={user ? <AutoBid /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
