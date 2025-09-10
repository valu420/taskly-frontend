import axios from "axios";

// Usa la URL de .env o Render como fallback
const API_URL = import.meta.env.VITE_API_URL || "https://mini-proyecto1-backend.onrender.com";

// Cliente axios configurado
const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para añadir el token JWT si existe
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export default http;