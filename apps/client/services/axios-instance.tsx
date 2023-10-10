"use client";
import axios from "axios";
import storage from "react-secure-storage";

const baseApi = axios.create({
  baseURL: process.env.BASE_API_URL || "http://localhost:4000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

baseApi.interceptors.request.use(
  (config) => {
    const accessToken = storage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (response) => response
);

baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (storage.getItem("accessToken") === null) {
        return Promise.reject(error);
      }
      const response = await baseApi.get("/auth/refresh-token");
      if (response.status === 200) {
        storage.setItem("accessToken", response.data.accessToken);
        storage.setItem("refreshToken", response.data.refreshToken);
        window.dispatchEvent(new Event("storage"));
        return baseApi(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export { baseApi };
