import {
  getAutoBidStart,
  getAutoBidSuccess,
  getAutoBidFailure,
  createAutoBidStart,
  createAutoBidSuccess,
  createAutoBidFailure,
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
