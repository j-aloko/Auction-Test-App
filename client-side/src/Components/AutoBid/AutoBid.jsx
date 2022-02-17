import React from "react";
import "./AutoBid.css";

function AutoBid() {
  return (
    <div className="auto-bid-container">
      <div className="auto-bid-wrapper">
        <div className="auto-bid-config-titles">
          <span className="auto-bid-settings">SETTINGS</span>
          <h1 className="configure-auto-bid">Configure the Auto-bidding</h1>
        </div>
        <div className="bid-amount-wrapper">
          <h4 className="maximum-bid-subtitle">Maximum bid amount</h4>
          <p className="maximum-bid-warning">
            The maximum amount will be split between all activated items
          </p>
          <div className="auto-bid-input">
            <span className="currency">$</span>
            <input type="number" className="auto-bid-input-amt" />
          </div>
        </div>
        <div className="bid-alert-wrapper">
          <h4 className="bid-alert-notification">Bid Alert Notification</h4>
          <span className="get-notification">
            Get the notification about your reserved bids
          </span>
          <div className="notification-input">
            <span className="percentage">%</span>
            <input type="number" className="notification-reserved-bids" />
          </div>
        </div>
        <button className="save-configuration">Save</button>
      </div>
    </div>
  );
}

export default AutoBid;
