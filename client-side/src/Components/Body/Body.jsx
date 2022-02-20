import React, { useEffect, useContext } from "react";
import "./Body.css";
import Product from "./../Product/Product";
import { productsContext } from "./../../Context-Api/Products/Context";
import { getProducts } from "./../../Api-Calls/Products";

function Body() {
  //fetch all listed items from context when this component is mounted

  const { dispatch, products } = useContext(productsContext);

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  return (
    <div className="body">
      <div className="body-wrapper">
        {products?.map((product) => (
          <Product key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Body;
