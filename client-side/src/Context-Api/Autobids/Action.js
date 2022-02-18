//GET AUTOBID
export const getAutoBidStart = () => ({
  type: "GET_AUTOBID_START",
});

export const getAutoBidSuccess = (products) => ({
  type: "GET_AUTOBID_SUCCESS",
  payload: products,
});

export const getAutoBidFailure = () => ({
  type: "GET_AUTOBID_FAILURE",
});

//CREATE PRODUCT

export const createAutoBidStart = () => ({
  type: "CREATE_AUTOBID_START",
});

export const createAutoBidSuccess = (product) => ({
  type: "CREATE_AUTOBID_SUCCESS",
  payload: product,
});

export const createAutoBidFailure = () => ({
  type: "CREATE_AUTOBID_FAILURE",
});
