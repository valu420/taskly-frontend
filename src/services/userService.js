import http from "../api/http.js";

/**
 * Auth service for user management
 */
export const login = (credentials) =>
  http.post("/auth/login", credentials);

export const register = (data) =>
  http.post("/auth/register", data);

export const forgotPassword = (email) =>
  http.post("/auth/forgot-password", { email });

export const resetPassword = (token, newPassword) =>
  http.post("/auth/reset-password", { token, newPassword });