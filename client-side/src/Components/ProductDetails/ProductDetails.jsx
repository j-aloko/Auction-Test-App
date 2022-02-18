import React, { useState, useEffect, useContext } from "react";
import "./ProductDetails.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { productContext } from "./../../Context-Api/SingleProduct/Context";
import { getProduct } from "./../../Api-Calls/product";
import { updateProduct } from "../../Api-Calls/Products";
import { updateAutoBid } from "./../../Api-Calls/AutoBid";
import { productsContext } from "./../../Context-Api/Products/Context";
import CircularProgress from "@mui/material/CircularProgress";
import { autoBidContext } from "./../../Context-Api/Autobids/Context";
import { getAutoBids } from "./../../Api-Calls/AutoBid";

//Timer implementation

function ProductDetails() {
  const [currentbid, setCurrentBid] = useState({});
  const [endDate, setEndDate] = useState(100000);
  const [displayAmountInput, setDisplayAmountInput] = useState(false);
  const user = JSON.parse(localStorage.getItem("user")); //get user credentials from localStorage
  const [bidder, setBidder] = useState({ fullname: user?.fullname });
  const { product, dispatch } = useContext(productContext);
  const { dispatch: productsDispatch } = useContext(productsContext);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState(false);
  const { autoBids, dispatch: autobidDispatch } = useContext(autoBidContext);
  const [autobid, setAutoBid] = useState({});

  // persisting product data across this component
  //We start off by accessing the product id in the window url of this location

  const location = useLocation();
  const productId = location.pathname.split("/")[2];

  // now we find the specific product associated with the productId

  useEffect(() => {
    getProduct(dispatch, productId);
  }, [productId, dispatch]);

  //find the current bid

  useEffect(() => {
    if (product?.bidders?.length > 0) {
      setCurrentBid(product?.bidders.reverse()[0]); //reverse the array of bidders and grab the first index
    } else {
      setCurrentBid({ amount: 0 });
    }
  }, [product?.bidders]);

  //Timer Implementation

  useEffect(() => {
    setTimeout(() => {
      setEndDate(product?.endDate);
    }, 200);
  }, [product?.endDate]);

  const minuteSeconds = 60;
  const hourSeconds = 3600;
  const daySeconds = 86400;

  const timerProps = {
    isPlaying: true,
    size: 50,
    strokeWidth: 2,
  };

  const renderTime = (dimension, time) => {
    return (
      <div className="time-wrapper">
        <div className="time">{time}</div>
        <div>{dimension}</div>
      </div>
    );
  };

  const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
  const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
  const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
  const getTimeDays = (time) => (time / daySeconds) | 0;

  const startTime = Date.now() / 1000; // use UNIX timestamp in seconds
  const endTime = startTime + endDate; // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  //Implementing placing bid functionality

  const handleBid = (e) => {
    e.preventDefault();
    setDisplayAmountInput(true); //display input field for amount and budget
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setBidder({ ...bidder, [e.target.name]: value });
  };

  const submitBid = (e) => {
    e.preventDefault();
    setLoading(true);
    const bidders = bidder;
    if (
      bidders.amount > product?.minimumBid &&
      bidders.amount > currentbid?.amount
    ) {
      updateProduct(productsDispatch, productId, bidders);
      setLoading(false);
      setFailed(false);
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setFailed(true);
      setSuccess(false);
      setLoading(false);
    }
  };

  //fetch all autoBids immediately this component mounts
  useEffect(() => {
    getAutoBids(autobidDispatch);
  }, [autobidDispatch]);

  //get autobid
  useEffect(() => {
    setAutoBid(
      autoBids?.find((autobid) => autobid.fullname === user?.fullname)
    );
  }, [autoBids, user?.fullname]);

  //Navigate to auto bidding settings when checked
  const navigate = useNavigate();

  const handleAutoBidding = (e) => {
    const value = e.target.value;
    //verify that user has already configured before navigating to configuration page

    if (
      value &&
      !autoBids?.find((autobid) => autobid.fullname === user?.fullname)
    ) {
      navigate("/config-auto-bid", { state: product?._id });
    } else if (
      value &&
      autoBids?.find((autobid) => autobid.fullname === user?.fullname)
    ) {
      // enable autobid for this product and push it's Id into our productIds Array of our AutoBid Schema
      console.log(autobid);
      updateAutoBid(autobidDispatch, autobid?._id, product?._id);
    }
  };

  //5secs after this component is mounted we want to verify that the product has autobid enabled
  // if products auto bid is enabled, auto check box

  /*useEffect(() => {
    //find autoBid Json with the usersname
    setTimeout(() => {
      console.log(
        autoBids?.find((autobid) => autobid.fullname === user?.fullname)
      );
    }, 5000);
  }, [autoBids, user?.fullname]);*/

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
              <div className="exact-time">
                <CountdownCircleTimer
                  {...timerProps}
                  colors="black"
                  duration={daysDuration}
                  initialRemainingTime={remainingTime}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime(
                        daysDuration > 1 ? "days" : "day",
                        getTimeDays(daysDuration - elapsedTime)
                      )}
                    </span>
                  )}
                </CountdownCircleTimer>
                <CountdownCircleTimer
                  {...timerProps}
                  colors="black"
                  duration={daySeconds}
                  initialRemainingTime={remainingTime % daySeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat:
                      remainingTime - totalElapsedTime > hourSeconds,
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime(
                        daySeconds > 1 ? "hrs" : "hr",
                        getTimeHours(daySeconds - elapsedTime)
                      )}
                    </span>
                  )}
                </CountdownCircleTimer>
                <CountdownCircleTimer
                  {...timerProps}
                  colors="black"
                  duration={hourSeconds}
                  initialRemainingTime={remainingTime % hourSeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat:
                      remainingTime - totalElapsedTime > minuteSeconds,
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime(
                        hourSeconds > 1 ? "mins" : "min",
                        getTimeMinutes(hourSeconds - elapsedTime)
                      )}
                    </span>
                  )}
                </CountdownCircleTimer>
                <CountdownCircleTimer
                  {...timerProps}
                  colors="black"
                  duration={minuteSeconds}
                  initialRemainingTime={remainingTime % minuteSeconds}
                  onComplete={(totalElapsedTime) => ({
                    shouldRepeat: remainingTime - totalElapsedTime > 0,
                  })}
                >
                  {({ elapsedTime, color }) => (
                    <span style={{ color }}>
                      {renderTime(
                        minuteSeconds > 1 ? "secs" : "sec",
                        getTimeSeconds(elapsedTime)
                      )}
                    </span>
                  )}
                </CountdownCircleTimer>
              </div>
            </div>
          </div>
          <button className="place-bid" onClick={handleBid}>
            Place a bid
          </button>
          <div className="auto-bidding">
            <input
              type="checkbox"
              id="autoBid"
              name="autoBid"
              value={true}
              onChange={handleAutoBidding}
            />
            <label htmlFor="autoBid">
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
              <CloseIcon style={{ fontSize: 30 }} />
            </div>
            <div className="input-amount-wrapper">
              <h2 className="required-fields">*Required fields</h2>
              <form action="" className="required-form">
                <input
                  type="number"
                  className="required-input"
                  placeholder="Enter amount to bid"
                  required
                  name="amount"
                  id="amount"
                  onChange={handleChange}
                />
                <button
                  className="submitFields"
                  onClick={submitBid}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress
                      color="success"
                      style={{ backgroundColor: "transparent" }}
                    />
                  ) : (
                    "Submit Bid"
                  )}
                </button>
              </form>
              {failed && (
                <span className="errorbid">
                  Amount must exceed the minimum bid & Current bid
                </span>
              )}
              {success && (
                <span className="successbid">Bid placed successfully</span>
              )}
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default ProductDetails;
