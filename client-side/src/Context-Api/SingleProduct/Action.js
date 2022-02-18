//GET PRODUCTS
export const getProductStart = () => ({
  type: "GET_PRODUCT_START",
});

export const getProductSuccess = (product) => ({
  type: "GET_PRODUCT_SUCCESS",
  payload: product,
});

export const getProductFailure = () => ({
  type: "GET_PRODUCT_FAILURE",
});
