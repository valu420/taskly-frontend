import { login } from "../services/userService.js";

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      try {
        // Llamada al backend
        const response = await login({ email, password });

        // Guardar token JWT en localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("userEmail", email);

        // Redirigir al dashboard
        window.location.href = "dashboard.html";
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Credenciales inválidas. Intenta nuevamente.");
      }
    });
  }
});
