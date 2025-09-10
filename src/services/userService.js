import http from "../api/http.js";

export const login = (credentials) => http.post("/auth/login", credentials);
export const register = (data) => http.post("/auth/register", data);
export const recoverPassword = (email) => http.post("/auth/recover", { email });
export const confirmPassword = (token, newPassword) =>
  http.post(`/auth/confirm/${token}`, { password: newPassword });