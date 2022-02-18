import axiosInstance from "./../axios";
import {
  getProductsStart,
  getProductsSuccess,
  getProductsFailure,
  updateProductStart,
  updateProductSuccess,
  updateProductFailure,
} from "./../Context-Api/Products/Action";

//get all listed products

export const getProducts = async (dispatch) => {
  dispatch(getProductsStart());
  try {
    const res = await axiosInstance.get("products");
    dispatch(getProductsSuccess(res.data));
  } catch (error) {
    dispatch(getProductsFailure());
  }
};

//update User

export const updateProduct = async (dispatch, id, values) => {
  dispatch(updateProductStart());
  try {
    const res = await axiosInstance.put("products/bid/" + id, values);
    dispatch(updateProductSuccess(res.data));
  } catch (error) {
    dispatch(updateProductFailure());
  }
};
