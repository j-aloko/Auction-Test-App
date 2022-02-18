import axiosInstance from "./../axios";
import {
  getProductStart,
  getProductSuccess,
  getProductFailure,
} from "./../Context-Api/SingleProduct/Action";

//get single product

export const getProduct = async (dispatch, id) => {
  dispatch(getProductStart());
  try {
    const res = await axiosInstance.get("products/find/" + id);
    dispatch(getProductSuccess(res.data));
  } catch (error) {
    dispatch(getProductFailure());
  }
};
