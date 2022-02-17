import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import AutoBid from "./Components/AutoBid/AutoBid";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product-details/:id" element={<ProductDetails />} />
          <Route path="/config-auto-bid" element={<AutoBid />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
