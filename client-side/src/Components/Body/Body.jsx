import React from "react";
import "./Body.css";
import Product from "./../Product/Product";
import { products } from "../../DummyData";

function Body() {
  return (
    <div className="body">
      <div className="body-wrapper">
        {products?.map((product) => (
          <Product id={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Body;
