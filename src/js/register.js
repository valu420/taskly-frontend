import { register } from "../services/userService.js";

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value.trim();
      const apellidos = document.getElementById("apellidos").value.trim();
      const edad = parseInt(document.getElementById("edad").value.trim());
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const confirmPassword = document.getElementById("confirmPassword").value.trim();

      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      try {
        const response = await register({
          firstName: nombre,
          lastName: apellidos,
          age: edad,
          email,
          password,
          confirmPassword
        });

        alert("Registro exitoso 🎉 Ahora puedes iniciar sesión.");
        window.location.href = "login.html";
      } catch (error) {
        console.error("Error en el registro:", error);
        alert("Error al registrarse. Intenta nuevamente.");
      }
    });
  }
});
