import { login } from "../services/userService.js";

/**
 * Initializes the login form event listener on DOMContentLoaded.
 * Handles user login, stores JWT token and user email in localStorage, and redirects to dashboard.
 */
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      /** @type {string} */
      const email = document.getElementById("email").value.trim();
      /** @type {string} */
      const password = document.getElementById("password").value.trim();

      try {
        // Calls backend to authenticate user
        const response = await login({ email, password });

        // Stores JWT token and user email in localStorage
        localStorage.setItem("userName", response.data.user.firstName);
        localStorage.setItem("userLastName", response.data.user.lastName);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userId", response.data.user._id);

        // Redirects to kanban
        window.location.href = "kanban.html";
      } catch (error) {
        console.error("Login error:", error);
        alert("Invalid credentials. Please try again.");
      }
    });
  }
});