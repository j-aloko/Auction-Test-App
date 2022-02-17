import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";

function Product({ product }) {
  return (
    <div className="product-wrapper">
      <img src={product.img} alt="" className="product-img" />
      <div className="product-info-callToAction">
        <div className="product-info">
          <h3 className="product-name">{product.title}</h3>
          <span className="product-description">
            Lorem ipsum dolor sit amet
          </span>
        </div>
        <Link className="links" to={`product-details/${product.id}`}>
          <button className="callToAction">Bid Now</button>
        </Link>
      </div>
    </div>
  );
}

export default Product;
