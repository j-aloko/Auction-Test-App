import React, { useState, useRef, useEffect } from "react";
import "./ProductDetails.css";
import { Link, useLocation } from "react-router-dom";
import { products } from "../../DummyData";
import CloseIcon from "@mui/icons-material/Close";

function ProductDetails() {
  const [day, setDay] = useState("00");
  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [second, setSecond] = useState("00");
  const [product, setProduct] = useState({});
  const [currentbid, setCurrentBid] = useState({});
  const [displayAmountInput, setDisplayAmountInput] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

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

  // Implementing count down for each listed Item with hooks

  let interval = useRef();

  const initiateTimer = () => {
    const countDownDate = new Date("May 30, 2022 00:00:00").getTime(); //date auction stops

    interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const distance = countDownDate - currentTime; // number of days till the auction stops
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //stop timer
        clearInterval(interval.current);
      } else {
        //update timer
        setDay(days);
        setHour(hours);
        setMinute(minutes);
        setSecond(seconds);
      }
    }, 1000);
  };

  //initiate timer whenever this component mounts

  useEffect(() => {
    initiateTimer(); //call initiateTimer function
  }, []);

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
            Minimum bid ${product?.minimumBid}
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
                {day} : {hour} : {minute} : {second}
              </span>
            </div>
          </div>
          <button className="place-bid" onClick={handleBid}>
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
