import http from "../api/http.js";

const form = document.getElementById("changePasswordForm");

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

  try {
    // Llamada real al backend
    await http.post("/auth/change-password", { password: newPassword });

    alert("✅ Tu contraseña ha sido cambiada exitosamente.");
    form.reset();

    // Redirigir al login
    window.location.href = "login.html";
  } catch (error) {
    console.error("Error cambiando la contraseña:", error);
    alert("❌ No se pudo cambiar la contraseña. Intenta de nuevo.");
  }
});
