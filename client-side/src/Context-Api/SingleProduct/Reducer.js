export const productReducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCT_START":
      return {
        product: {},
        isFetching: true,
        error: false,
      };
    case "GET_PRODUCT_SUCCESS":
      return {
        product: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_PRODUCT_FAILURE":
      return {
        product: {},
        isFetching: false,
        error: true,
      };
    default:
      return { ...state };
  }
};
