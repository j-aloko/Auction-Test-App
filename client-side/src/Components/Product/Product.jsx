import React from "react";
import "./Product.css";

function Product() {
  return (
    <div className="product-wrapper">
      <img src="/assets/car.jpg" alt="" className="product-img" />
      <div className="product-info-callToAction">
        <div className="product-info">
          <h3 className="product-name">Product No1</h3>
          <span className="product-description">
            Lorem ipsum dolor sit amet
          </span>
        </div>
        <button className="callToAction">Bid Now</button>
      </div>
    </div>
  );
}

export default Product;
