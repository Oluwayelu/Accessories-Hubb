import axios from "axios";
import Cookies from "js-cookie";

const { token } = Cookies.get("userInfo")
  ? JSON.parse(Cookies.get("userInfo"))
  : null;

const axiosInstance = axios.create({
  baseURL: "/",
  headers: { Authorization: `Bearer ${token}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!token) {
    const { token } = Cookies.get("userInfo")
      ? JSON.parse(Cookies.get("userInfo"))
      : null;
    req.headers.Authorization = `Bearer ${token}`;
  }
});

axios.interceptors.request.use(
  (config) => {
    const { token } = JSON.parse(Cookies.get("userInfo"));

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => Promise.reject(error)
);
