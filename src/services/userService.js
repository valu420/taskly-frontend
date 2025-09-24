import http from "../api/http.js";

/**
 * Logs in a user with the provided credentials.
 * @param {Object} credentials - User credentials.
 * @param {string} credentials.email - User email.
 * @param {string} credentials.password - User password.
 * @returns {Promise<Object>} Promise resolving to the authentication response.
 */
export const login = (credentials) =>
  http.post("/auth/login", credentials);

/**
 * Registers a new user.
 * @param {Object} data - User registration data.
 * @param {string} data.firstName - User first name.
 * @param {string} data.lastName - User last name.
 * @param {number} data.age - User age.
 * @param {string} data.email - User email.
 * @param {string} data.password - User password.
 * @returns {Promise<Object>} Promise resolving to the registration response.
 */
export const register = (data) =>
  http.post("/auth/register", data);

/**
 * Sends a password recovery email.
 * @param {string} email - User email.
 * @returns {Promise<Object>} Promise resolving to the password recovery response.
 */
export const forgotPassword = (email) =>
  http.post("/auth/forgot-password", { email });

/**
 * Resets the user's password using a token.
 * @param {string} token - Password reset token.
 * @param {string} newPassword - New password.
 * @returns {Promise<Object>} Promise resolving to the password reset response.
 */
export const resetPassword = (token, newPassword) =>
  http.post("/auth/reset-password", { token, newPassword });

/**
 * Updates a user's profile.
 */
export const updateUser = (userId, data) =>
  http.put(`/users/${userId}`, data);

/**
 * Gets a user's profile by ID.
 */
export const getUserById = (userId) =>
  http.get(`/users/${userId}`);