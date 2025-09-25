import http from "../api/http.js";
import { showToast } from "./toast.js";

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
    showToast("⚠️ Debes llenar ambos campos.", "error");
    return;
  }

  if (newPassword !== confirmPassword) {
    showToast("❌ Las contraseñas no coinciden.", "error");
    return;
  }

  if (!token) {
    alert("❌ Token de recuperación no encontrado.");
    return;
  }
  console.log("Token:", token, "NewPassword:", newPassword);
  try {
    const response = await fetch("https://mini-proyecto1-backend.onrender.com/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });
    const data = await response.json();
    console.log(data);

    if (response.ok && data.message) {
      showToast("✅ " + data.message, "success");
      window.location.href = "login.html";
    } else {
      showToast("❌ " + (data.message || data.error || "No se pudo cambiar la contraseña."), "error");
    }
  } catch (error) {
    alert("❌ Error de red o servidor.");
  }
});