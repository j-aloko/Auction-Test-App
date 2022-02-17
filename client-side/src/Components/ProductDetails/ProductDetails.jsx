import React from "react";
import "./ProductDetails.css";
import { Link } from "react-router-dom";

function ProductDetails() {
  return (
    <div className="productDetails-wrapper">
      <div className="left-side">
        <img src="/assets/car.jpg" alt="" className="left-product-img" />
      </div>
      <div className="right-side">
        <h1 className="product-title">Product No1</h1>
        <span className="minimum-bid-amount">Minimum bid $10</span>
        <p className="product-detail-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In molestie
          leo vel tempus laoreet. Aenean sed ultricies turpis, ac mollis urna.
          Sed malesuada, ex a sodales consectetur, mauris eros malesuada tellus,
          nec iaculis nulla magna ut nibh. Nam sed aliquam turpis, sit amet
          pretium ipsum. Praesent a urna odio. Proin dictum facilisis rhoncus.
          Sed malesuada, ex a sodales consectetur, mauris eros malesuada tellus,
          nec iaculis nulla magna ut nibh. Nam sed aliquam turpis, sit amet
          pretium ipsum. Praesent a urna odio. Proin dictum facilisis rhoncus.
        </p>
        <div className="count-down">
          <div className="last-bid">
            <h4 className="last-bid-made">Last bid made</h4>
            <span className="last-bid-amount">$15</span>
          </div>
          <div className="time-limit">
            <h4 className="available-until">Available until</h4>
            <span className="exact-time">2:30:15</span>
          </div>
        </div>
        <button className="place-bid">Place a bid</button>
        <div className="auto-bidding">
          <input type="checkbox" id="autobid" name="autobid" value="Yes" />
          <label for="autobid">
            {" "}
            Activate the{" "}
            <Link to="/config-auto-bid" className="links">
              <b className="auto-bidding-bold" syle={{ cursor: "pointer" }}>
                <u>auto bidding</u>
              </b>
            </Link>
          </label>
          <br />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
