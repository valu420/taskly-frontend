const form = document.getElementById("changePasswordForm");

form.addEventListener("submit", (e) => {
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

  // Simulación
  alert("✅ Tu contraseña ha sido cambiada exitosamente.");
  form.reset();

  // Redirigir al login
  window.location.href = "login.html";
});
