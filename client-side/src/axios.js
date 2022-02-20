import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://bidify-server.herokuapp.com/api",
});

export default axiosInstance;
