import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { LOGIN } from "routes";

const service = axios.create({
  baseURL: "/",
  timeout: 60000,
});

// API request interceptor
service.interceptors.request.use(
  (config: any) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const notificationParam = {
      message: "",
      description: "",
    };

    // request happened and server responded

    if (error.response) {
      notificationParam.message = error.response.data.MESSAGE.toString();
      if (error.response.status === 401 || error.response.status === 403) {
        notificationParam.message = "Authentication Fail";
        notificationParam.description = "Please login again";
        localStorage.clear();
        window.location.href = LOGIN;
      }

      if (error.response.status === 404) {
        notificationParam.message = "Not Found";
      }

      if (error.response.status === 500) {
        notificationParam.message = "Internal Server Error";
      }

      if (error.response.status === 508) {
        notificationParam.message = "Time Out";
      }
      if (error.response.status === 422) {
        notificationParam.message = "Validation Error";
      }
      toast.dismiss();
      toast.error(notificationParam.message);
      return await Promise.reject(error.response.data);
    }
    return await Promise.reject(error);
  }
);

export default service;
