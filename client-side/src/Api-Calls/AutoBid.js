import {
  getAutoBidStart,
  getAutoBidSuccess,
  getAutoBidFailure,
  createAutoBidStart,
  createAutoBidSuccess,
  createAutoBidFailure,
  updateAutoBidStart,
  updateAutoBidSuccess,
  updateAutoBidFailure,
} from "./../Context-Api/Autobids/Action";
import axiosInstance from "./../axios";

//get all listed products

export const getAutoBids = async (dispatch) => {
  dispatch(getAutoBidStart());
  try {
    const res = await axiosInstance.get("autobids");
    dispatch(getAutoBidSuccess(res.data));
  } catch (error) {
    dispatch(getAutoBidFailure());
  }
};

//Save autobids

export const saveAutoBids = async (dispatch, values) => {
  dispatch(createAutoBidStart());
  try {
    const res = await axiosInstance.post("autobids", values);
    dispatch(createAutoBidSuccess(res.data));
  } catch (error) {
    dispatch(createAutoBidFailure());
  }
};

//update Array of productIds in AutoBid Schema

export const updateAutoBid = async (dispatch, id, value) => {
  dispatch(updateAutoBidStart());
  try {
    const res = await axiosInstance.put("autobids/update/" + id, {
      productId: value,
    });
    dispatch(updateAutoBidSuccess(res.data));
  } catch (error) {
    dispatch(updateAutoBidFailure());
  }
};

// update Auto bid configuartion

export const updateAutoBidConfig = async (dispatch, id, value) => {
  dispatch(updateAutoBidStart());
  try {
    const res = await axiosInstance.put("autobids/" + id, value);
    dispatch(updateAutoBidSuccess(res.data));
  } catch (error) {
    dispatch(updateAutoBidFailure());
  }
};
