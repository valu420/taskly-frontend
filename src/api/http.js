import axios from "axios";

/**
 * Gets the API base URL from environment variables or uses a fallback URL.
 * @type {string}
 */
const API_URL = import.meta.env.VITE_API_URL || "https://mini-proyecto1-backend.onrender.com";

/**
 * Configured Axios HTTP client for making API requests.
 * Automatically attaches JWT token from localStorage if available.
 * @type {import('axios').AxiosInstance}
 */
const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Axios request interceptor to add JWT token to Authorization header if it exists.
 */
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export default http;