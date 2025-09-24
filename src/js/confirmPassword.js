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

  const response = await fetch("https://mini-proyecto1-backend.onrender.com/auth/reset-password", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ token, password: newPassword }),
  });
  const data = await response.json();
  console.log(data); // <-- Muestra la respuesta real

  if (response.ok && data.success) {
  alert("✅ Tu contraseña ha sido cambiada exitosamente.");
  window.location.href = "login.html";
  } else {
  alert("❌ " + (data.message || data.error || "No se pudo cambiar la contraseña."));
  }
});