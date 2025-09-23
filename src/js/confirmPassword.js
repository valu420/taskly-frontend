import http from "../api/http.js";

/**
 * Handles the password change form submission.
 * Validates the new password and confirmation, then sends the request to the backend.
 */
const form = document.getElementById("changePasswordForm");

// Obtiene el token de la URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newPassword = document.getElementById("new-password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (!newPassword || !confirmPassword) {
    alert("⚠️ Debes llenar ambos campos.");
    return;
  }

  if (newPassword !== confirmPassword) {
    alert("❌ Las contraseñas no coinciden.");
    return;
  }

  if (!token) {
    alert("❌ Token de recuperación no encontrado.");
    return;
  }

  try {
    // Envía el token y la nueva contraseña al backend
    await http.post("/auth/reset-password", { token, password: newPassword });

    alert("✅ Tu contraseña ha sido cambiada exitosamente.");
    form.reset();

    // Redirige al login
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error changing password:", error);
    alert("❌ No se pudo cambiar la contraseña. Intenta de nuevo.");
  }
});