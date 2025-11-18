import axios from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const message = (error.response.data && error.response.data.message) || "";
      const url = error.config?.url || "";

      if (status === 401) {
        // 只在「真正的认证失败」时跳登录
        const msgLower = message.toLowerCase();

        const isAuthProblem =
          msgLower.includes("token") ||
          msgLower.includes("jwt") ||
          msgLower.includes("unauthorized");

        const isAuthEndpoint =
          url.includes("/api/auth/login") || url.includes("/api/auth/profile");

        // 修改密码等业务错误，不跳转，仅把错误抛回去
        if (isAuthProblem || isAuthEndpoint) {
          localStorage.clear();
          window.location.href = "/login";
        }
        // 否则，这是业务 401（比如后端没改），让调用方自己处理
      } else if (status === 500) {
        console.error("Server error. Please try again later.");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
