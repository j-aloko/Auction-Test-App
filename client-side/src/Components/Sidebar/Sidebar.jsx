import React from "react";
import "./Sidebar.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <h3 className="filters">Filters</h3>
        <div className="sidebar-arrange">
          <span className="arrange">Arrange</span>
          <select className="filter-by-selection">
            <option value="Popular" className="filterValue">
              Popular
            </option>
          </select>
        </div>
        <div className="bid-amount">
          <span className="minimum-bid">Minimum bid</span>
          <div className="slider">
            <Box width={250}>
              <Slider
                defaultValue={8}
                aria-label="Default"
                valueLabelDisplay="on"
                color="primary"
              />
            </Box>
          </div>
        </div>
        <ul className="category">
          <span className="category-title">Category</span>
          <li className="category-list">
            <label className="container">
              Category 01
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </li>
          <li className="category-list">
            <label className="container">
              Category 02
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </li>
          <li className="category-list">
            <label className="container">
              Category 03
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </li>
          <li className="category-list">
            <label className="container">
              Category 04
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </li>
          <li className="category-list">
            <label className="container">
              Category 05
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
