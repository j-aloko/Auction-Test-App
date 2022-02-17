import React, { useState, useRef, useEffect } from "react";
import "./ProductDetails.css";
import { Link, useLocation } from "react-router-dom";
import { products } from "../../DummyData";
import CloseIcon from "@mui/icons-material/Close";
import Countdown from "react-countdown";

function ProductDetails() {
  const [product, setProduct] = useState({});
  const [currentbid, setCurrentBid] = useState({});
  const [displayAmountInput, setDisplayAmountInput] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [disable, setDisable] = useState(false);

  //on Completion of countdown
  const handleComplete = () => {
    setDisable(true);
  };

  // persisting product data across this component
  //We start off by accessing the product id in the window url of this location

  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  // now we find the specific product associated with the productId

  useEffect(() => {
    setProduct(products?.find((product) => product.id === parseInt(productId)));
  }, [productId]);

  //find the current bid

  useEffect(() => {
    if (product?.bidders) {
      setCurrentBid(product?.bidders.reverse()[0]); //reverse the array of bidders and grab the first index
    }
  }, [product?.bidders]);

  //Place a bid

  const user = JSON.parse(localStorage.getItem("user")); //get user credentials

  const handleBid = (e) => {
    e.preventDefault();
    setDisplayAmountInput(true); //display input field for amount and budget
  };

  return (
    <>
      <div
        className={
          displayAmountInput
            ? "productDetails-wrapper blur"
            : "productDetails-wrapper"
        }
      >
        <div className="left-side">
          <img src={product?.img} alt="" className="left-product-img" />
        </div>
        <div className="right-side">
          <h1 className="product-title">{product?.title}</h1>
          <span className="minimum-bid-amount">
            Minimum bid <b>${product?.minimumBid}</b>
          </span>
          <p className="product-detail-description">{product?.description}</p>
          <div className="count-down">
            <div className="last-bid">
              <h4 className="last-bid-made">Last bid made</h4>
              <span className="last-bid-amount">${currentbid?.amount}</span>
            </div>
            <div className="time-limit">
              <h4 className="available-until">Available until</h4>
              <span className="exact-time">
                {disable ? (
                  <span className="end">Auction has ended</span>
                ) : (
                  <Countdown
                    date={Date.now() + 256200 * 1000}
                    onComplete={handleComplete}
                  />
                )}
              </span>
            </div>
          </div>
          <button className="place-bid" onClick={handleBid} disabled={disable}>
            Place a bid
          </button>
          <div className="auto-bidding">
            <input type="checkbox" id="autobid" name="autobid" value="" />
            <label htmlFor="autobid">
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
      <>
        {displayAmountInput && (
          <div className="input-amount-field">
            <div
              className="close-amount-field"
              onClick={() => setDisplayAmountInput(false)}
            >
              <CloseIcon style={{ fontSize: 40 }} />
            </div>
            <div className="input-amount-wrapper">
              <h2 className="required-fields">*Required fields</h2>
              <form action="" className="required-form">
                <input
                  type="number"
                  className="required-input"
                  placeholder="Enter your budget"
                  required
                />
                <input
                  type="number"
                  className="required-input"
                  placeholder="Enter amount to bid"
                  required
                />
                <button className="submitFields">Submit Bid</button>
              </form>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default ProductDetails;
