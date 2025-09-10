import { register } from "../services/userService.js";

/**
 * Initializes the registration form event listener on DOMContentLoaded.
 * Handles user registration, validates passwords, and redirects to login on success.
 */
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      /** @type {string} */
      const nombre = document.getElementById("nombre").value.trim();
      /** @type {string} */
      const apellidos = document.getElementById("apellidos").value.trim();
      /** @type {number} */
      const edad = parseInt(document.getElementById("edad").value.trim());
      /** @type {string} */
      const email = document.getElementById("email").value.trim();
      /** @type {string} */
      const password = document.getElementById("password").value.trim();
      /** @type {string} */
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      // Validate password confirmation
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      try {
        // Calls backend to register user
        const response = await register({
          firstName: nombre,
          lastName: apellidos,
          age: edad,
          email,
          password,
          confirmPassword
        });

        alert("Registration successful 🎉 You can now log in.");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again.");
      }
    });
  }
});