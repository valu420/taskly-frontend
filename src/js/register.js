import { register } from "../services/userService.js";
import { showToast } from "./toast.js";
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
        showToast("Las Contraseñas no coinciden", "error");
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

        showToast("Registro Exitoso 🎉", "success");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Registration error:", error);
        showToast("Error en el registro. Intenta de nuevo.", "error");
      }
    });
  }
});