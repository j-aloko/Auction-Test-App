import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import AutoBid from "./Components/AutoBid/AutoBid";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";

function App() {
  const user = true;
  return (
    <>
      <BrowserRouter>
        {!user ? null : <Navbar />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/config-auto-bid" element={<AutoBid />} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
