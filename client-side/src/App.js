import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import AutoBid from "./Components/AutoBid/AutoBid";
import Login from "./Components/Login/Login";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <BrowserRouter>
        {!user ? null : <Navbar />}
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/product-details/:id"
            element={user ? <ProductDetails /> : <Navigate to="/login" />}
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
